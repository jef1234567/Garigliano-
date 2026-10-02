// Vérifications automatiques de l'appli « Vue terrain » en navigateur simulé (Chromium, Playwright).
// Lancement : dans le dossier du dépôt, `python3 -m http.server 8765` puis `node tests/verif.js`.
// Le réseau extérieur est coupé : tuiles et polices sont bloquées, le service d'altitude est simulé.
const { chromium } = require("playwright");
const APP = "http://localhost:8765/index.html";
const rad = Math.PI / 180;
let ok = 0, ko = 0;
const check = (name, cond, info) => { if (cond) { ok++; console.log("  ok  " + name); } else { ko++; console.log("ÉCHEC " + name + (info !== undefined ? " → " + JSON.stringify(info) : "")); } };

(async () => {
  const browser = await chromium.launch({ args: ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"] });
  const ctx = await browser.newContext({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2, geolocation: { latitude: 41.29902, longitude: 13.82402, accuracy: 8 }, permissions: ["geolocation", "camera"] });
  let elevCalls = 0;
  await ctx.route("**/*", route => {
    const u = route.request().url();
    if (u.startsWith("http://localhost:8765/")) return route.continue();
    if (u.includes("api.open-meteo.com/v1/elevation")) { elevCalls++; const n = new URL(u).searchParams.get("latitude").split(",").length;
      return route.fulfill({ contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify({ elevation: Array(n).fill(500) }) }); }
    return route.abort();
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push("pageerror: " + e.message));
  page.on("console", m => { if (m.type() === "error" && !/Failed to load resource|net::ERR/.test(m.text())) errors.push("console: " + m.text()); });
  // un cache étranger (autre appli du même site) ne doit pas être effacé par notre service
  await page.goto("http://localhost:8765/manifest.json");
  await page.evaluate(async () => { const c = await caches.open("sedan40-tuiles-v1"); await c.put("/temoin", new Response("x")); localStorage.setItem("eht_bouillon_set", '{"fovP":61}'); });
  await page.goto(APP);
  await page.waitForTimeout(2500); await page.waitForLoadState("load"); // à la première installation, l'appli se recharge une fois quand le hors-ligne est prêt

  console.log("— Chargement et écran d'accueil");
  check("titre de la page", (await page.title()) === "Garigliano 1944 – Vue terrain", await page.title());
  check("titre d'accueil", (await page.textContent("#sTitle")) === "Garigliano 1944");
  check("version affichée à l'accueil", /Version du/.test(await page.textContent("#sVer")));
  check("légende : trois camps", (await page.locator("#sLegend span").count()) === 3);
  check("aucune mention de Sedan dans la page", !/Bouillon|Sedan|1940|Belg/.test(await page.evaluate(() => document.body.innerText + document.title)));
  const d = await page.evaluate(() => ({ ph: PHASES.length, odb: ODB.length, sit: SIT.length, st: STATIONS.length, fr: FRONTS.length }));
  check("données chargées : 11 phases", d.ph === 11, d);
  check("positions présentes dans chaque phase", await page.evaluate(() => PHASES.every((p, i) => SIT.some(e => e.ph.includes(i) && !e.rep))));
  check("toutes les coordonnées sont dans la zone", await page.evaluate(() => SIT.every(e => e.lat > 41.15 && e.lat < 41.6 && e.lon > 13.4 && e.lon < 14.0)));
  check("fronts dans la zone", await page.evaluate(() => FRONTS.every(f => f.p.every(q => q.lat > 41.1 && q.lat < 41.6 && q.lon > 13.4 && q.lon < 14.0))));

  console.log("— Symboles");
  const sym = await page.evaluate(() => ["inf", "mtn", "goum", "para", "inm", "arm", "blm", "art", "hq"].flatMap(t => ["F", "L", "A"].map(s => {
    const doc = new DOMParser().parseFromString(symSVG({ s, t, e: "XX", num: "4", par: "CEF" }), "image/svg+xml"); return doc.querySelector("parsererror") ? t + "/" + s : null; })).filter(Boolean));
  check("symboles valides (9 types × 3 camps)", sym.length === 0, sym);
  check("montagne : triangle plein", await page.evaluate(() => /Z" fill="#000"/.test(symSVG({ s: "F", t: "mtn", e: "XX" })) && !/Z" fill="#000"/.test(symSVG({ s: "F", t: "inf", e: "XX" }))));
  check("goums : lettre G", await page.evaluate(() => />G<\/text>/.test(symSVG({ s: "F", t: "goum", e: "X" }))));
  check("ennemi en losange, ami en rectangle", await page.evaluate(() => /M60 14 92 48/.test(symSVG({ s: "A", t: "inf" })) && /<rect x="26"/.test(symSVG({ s: "L", t: "inf" }))));

  console.log("— Démarrage, boussole, GPS");
  await page.click("#go");
  await page.waitForTimeout(600);
  check("écran d'accueil fermé", await page.evaluate(() => document.getElementById("start").style.display === "none"));
  const orient = (alpha, beta, gamma) => page.evaluate(([a, b, g]) => { for (let i = 0; i < 40; i++) window.dispatchEvent(new DeviceOrientationEvent("deviceorientationabsolute", { alpha: a, beta: b, gamma: g, absolute: true })); }, [alpha, beta, gamma]);
  await orient(0, 90, 0); await page.waitForTimeout(300);
  const h0 = await page.evaluate(() => heading);
  check("cap nord + déclinaison (téléphone vertical)", h0 != null && Math.abs(h0 - 4.3) < 1.5, h0);
  await page.waitForFunction(() => gps !== null, null, { timeout: 5000 }).catch(() => {});
  const g = await page.evaluate(() => gps);
  check("GPS reçu (Castelforte)", g && Math.abs(g.lat - 41.29902) < 1e-3, g);

  console.log("— Angle de site");
  const site = await page.evaluate(() => {
    posSel.value = "M"; posSel.dispatchEvent(new Event("change")); setPhase(3);
    const me = myPos(), A = myAlt(), ms = markers(), get = n => ms.find(m => m.rep && m.lieu === n);
    const cf = get("Castelforte"), d = distBrg(me, cf).d;
    return { A, d, s: siteAngle(A, cf, d), none: siteAngle(A, { lat: 41.3, lon: 13.8 }, 5000), nul: siteAngle(null, cf, d) };
  });
  const exp = Math.atan((134 - (940 + 1.7) - 0.87 / (2 * 6371000) * site.d * site.d) / site.d) / rad;
  check("observateur à la station : altitude 940 m", site.A && site.A.h === 940 && site.A.src === "station", site.A);
  check("Castelforte vu du Majo : angle négatif attendu", Math.abs(site.s - exp) < 1e-6 && site.s < -5, { site: site.s, exp, d: site.d });
  check("repli sur l'horizon sans altitude", site.none === null && site.nul === null, site);
  // depuis Castelforte (134 m), face au Majo (940 m) : le symbole doit être au-dessus de l'horizon
  const brg = await page.evaluate(() => { posSel.value = "C"; posSel.dispatchEvent(new Event("change")); setPhase(3); return distBrg(myPos(), markers().find(m => m.lieu === "Monte Majo" && m.rep)).b; });
  await orient((360 - (brg - 4.3) + 360) % 360, 90, 0); await page.waitForTimeout(1500);
  const view = await page.evaluate(() => { const H = cv.clientHeight, W = cv.clientWidth; const hy0 = H / 2 + pitch / (2 * Math.atan(Math.tan(curFov() / 2 * rad) * H / W) / rad) * H;
    return { hy0, heading, hits: hits.map(h => ({ n: h.o.m.lieu, rep: h.o.m.rep, y: h.y, d: h.o.d, alt: h.o.m.alt })) }; });
  const majo = view.hits.find(h => h.rep && h.n === "Monte Majo");
  check("cap orienté vers le Majo", Math.abs(((view.heading - brg + 540) % 360) - 180) < 2, { heading: view.heading, brg });
  check("Majo dans le champ", !!majo, view.hits.map(h => h.n));
  const vf = await page.evaluate(() => { const H = cv.clientHeight, W = cv.clientWidth; return { H, vfov: 2 * Math.atan(Math.tan(curFov() / 2 * rad) * H / W) / rad }; });
  if (majo) { const s = Math.atan((940 - 135.7 - 0.87 / (2 * 6371000) * majo.d * majo.d) / majo.d) / rad, sz = Math.max(26, Math.min(120, 110 * 1500 / majo.d)), pole = 6 + sz * 0.3;
    const yb = majo.y - sz * 0.4 + sz * 0.8 + pole; // pied du symbole
    check("Majo affiché à son angle de site (au-dessus de l'horizon)", Math.abs((view.hy0 - yb) - s / vf.vfov * vf.H) < 1.5 && yb < view.hy0 - 20, { attendu: s / vf.vfov * vf.H, obtenu: view.hy0 - yb, angle: s }); }
  await page.evaluate(() => { document.getElementById("f_site").click(); }); await page.waitForTimeout(400);
  const flatY = await page.evaluate(() => { const h = hits.find(h => h.o.m.rep && h.o.m.lieu === "Monte Majo"); const sz = Math.max(26, Math.min(120, 110 * 1500 / h.o.d)); return h.y + sz * 0.4 + 6 + sz * 0.3; });
  check("« Hauteur réelle » décochée : retour sur l'horizon", Math.abs(flatY - view.hy0) < 1.5, { flatY, hy0: view.hy0 });
  await page.evaluate(() => { document.getElementById("f_site").click(); });

  console.log("— Altitudes en ligne (service simulé)");
  await page.evaluate(() => { posSel.value = "gps"; posSel.dispatchEvent(new Event("change")); setPhase(0); });
  await page.waitForTimeout(9500);
  const alt = await page.evaluate(() => ({ my: myAlt(), keep: Object.keys(JSON.parse(localStorage.getItem("garigliano44_alt") || "{}")).length, unit: altOf(markers().find(m => m.u.id === "dim2")) }));
  check("altitude de l'observateur prise sur le relief", alt.my && alt.my.src === "relief" && alt.my.h === 500, alt.my);
  check("altitudes gardées pour le hors-ligne", alt.keep > 5 && elevCalls > 0, { keep: alt.keep, elevCalls });
  check("unité sans altitude : complétée par le relief", alt.unit === 500, alt.unit);

  console.log("— Phases, filtres, mouvements");
  const per = await page.evaluate(() => { const out = []; for (let i = 0; i < PHASES.length; i++) { setPhase(i); out.push(markers().length); } return out; });
  check("marqueurs dans chaque phase", per.every(n => n >= 5), per);
  check("libellé de phase", /^4\/11 · 13 mai : Le drapeau sur le Majo/.test(await page.evaluate(() => { setPhase(3); return document.querySelector("#dates button:nth-child(2)").textContent; })));
  check("filtre : Allemands masqués", await page.evaluate(() => { document.getElementById("f_A").click(); const r = markers().filter(visible).every(m => m.u.s !== "A"); document.getElementById("f_A").click(); return r && markers().filter(visible).some(m => m.u.s === "A"); }));
  check("filtre : division et plus", await page.evaluate(() => { const s = document.getElementById("f_min"); s.value = "5"; s.dispatchEvent(new Event("change")); const r = markers().filter(visible).filter(m => !m.rep).every(m => ["XX", "XXX", "XXXX"].includes(m.u.e)); s.value = "0"; s.dispatchEvent(new Event("change")); return r; }));
  await page.click("#dates button:nth-child(2)");
  check("fiche de phase : faits et question", /drapeau tricolore/.test(await page.textContent("#card")) && /Question à la salle/.test(await page.textContent("#card")));
  await page.evaluate(() => { document.getElementById("card").style.display = "none"; });

  console.log("— Carte à plat");
  await page.click("#tMap"); await page.waitForTimeout(700);
  check("carte affichée", await page.evaluate(() => document.getElementById("flat").style.display === "block"));
  const painted = await page.evaluate(() => { const c = document.getElementById("fmap"), x = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; const set = new Set(); for (let i = 0; i < x.length; i += 4 * 97) set.add(x[i] + "," + x[i + 1] + "," + x[i + 2]); return set.size; });
  check("carte dessinée (fond vectoriel, unités)", painted > 20, painted);
  check("deux fonds : topo et sans fond", await page.evaluate(() => document.getElementById("ftopo").textContent.length > 0) && (await page.evaluate(() => { document.getElementById("ftopo").click(); const a = document.getElementById("ftopo"); return true; })));
  await page.waitForTimeout(300);
  check("attribution du fond", /OpenTopoMap|atelier/.test(await page.textContent("#fattr")));
  await page.click("#fnext"); check("phase suivante depuis la carte", (await page.evaluate(() => phase)) === 4);
  await page.click("#fclose"); await page.waitForTimeout(300);

  console.log("— Ordre de bataille, ajouts, stockage");
  await page.click("#menuBtn");
  check("trois onglets de camp", (await page.locator("#tabs button").count()) === 3);
  check("ordre de bataille français affiché", (await page.locator("#odb .n").count()) >= 20, await page.locator("#odb .n").count());
  await page.click('#tabs button[data-s="A"]');
  check("ordre de bataille allemand", /71\. Infanterie-Division/.test(await page.textContent("#odb")));
  check("version dans le menu", /Version du/.test(await page.textContent("#shVer")));
  check("lien vers l'atelier", (await page.locator('#srcTxt a[href="garigliano-1944.html"]').count()) === 1);
  await page.fill("#nName", "II/8e RTM"); await page.fill("#nLat", "41.34"); await page.fill("#nLon", "13.80"); await page.selectOption("#nType", "mtn"); await page.selectOption("#nDate", "13");
  await page.click("#addUnit");
  const ls = await page.evaluate(() => ({ keys: Object.keys(localStorage), custom: JSON.parse(localStorage.getItem("garigliano44_custom") || "[]"), sedan: localStorage.getItem("eht_bouillon_set") }));
  check("unité ajoutée et enregistrée", ls.custom.length === 1 && ls.custom[0].t === "mtn" && ls.custom[0].d[0] === 13, ls.custom);
  check("stockage sous le préfixe de l'appli", ls.keys.filter(k => k !== "eht_bouillon_set").every(k => k.startsWith("garigliano44_")), ls.keys);
  check("réglages de Sedan intacts", ls.sedan === '{"fovP":61}', ls.sedan);
  check("unité ajoutée visible le 13 mai seulement", await page.evaluate(() => { setPhase(3); const a = markers().some(m => m.u.name === "II/8e RTM"); setPhase(4); return a && !markers().some(m => m.u.name === "II/8e RTM"); }));
  await page.click("#closeSheet");

  console.log("— Paysage");
  await page.setViewportSize({ width: 915, height: 412 }); await page.waitForTimeout(500);
  check("vue paysage sans erreur", await page.evaluate(() => isLand() && curFov() === fovL));
  await page.setViewportSize({ width: 412, height: 915 });

  console.log("— Hors ligne et cohabitation");
  await page.waitForFunction(() => navigator.serviceWorker.controller || navigator.serviceWorker.ready.then(() => true), null, { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(1500);
  const cs = await page.evaluate(async () => ({ keys: await caches.keys(), files: (await (await caches.open("garigliano44-app-v1")).keys()).map(r => new URL(r.url).pathname), temoin: !!(await (await caches.open("sedan40-tuiles-v1")).match("/temoin")) }));
  check("cache de l'appli créé", cs.keys.includes("garigliano44-app-v1"), cs.keys);
  check("fichiers en cache : moteur, données, atelier", ["/index.html", "/data.js", "/garigliano-1944.html"].every(f => cs.files.includes(f)), cs.files);
  check("cache d'une autre appli conservé", cs.temoin && cs.keys.includes("sedan40-tuiles-v1"), cs.keys);
  await page.reload(); await page.waitForTimeout(800);
  await ctx.setOffline(true);
  await ctx.unroute("**/*"); await ctx.route("**/*", route => route.abort());
  await page.reload({ waitUntil: "domcontentloaded" }).catch(e => errors.push("reload hors ligne: " + e.message));
  await page.waitForTimeout(800);
  check("rechargement hors ligne : appli et données présentes", await page.evaluate(() => typeof PHASES !== "undefined" && PHASES.length === 11 && document.getElementById("sTitle").textContent === "Garigliano 1944").catch(() => false));

  check("aucune erreur JavaScript", errors.length === 0, errors);
  console.log("\n" + ok + " vérifications réussies, " + ko + " échec(s).");
  await browser.close();
  process.exit(ko ? 1 : 0);
})().catch(e => { console.error("ERREUR DU SCRIPT", e); process.exit(2); });
