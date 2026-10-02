// ================= Garigliano, mai 1944 — données de la bataille (le moteur est dans index.html) =================
// Pour une autre bataille : remplacer ce fichier, le manifeste et l'icône ; ne pas toucher au moteur.

// ---------- Configuration ----------
const CFG={
  prefix:"garigliano44_",            // préfixe du stockage local : propre à cette appli, pour ne pas se mélanger avec Sedan
  title:"Garigliano 1944", short:"Garigliano 1944", sub:"Mai 1944, du Garigliano à Pico", fileTag:"Garigliano",
  version:"Version du 02/10, 17 h 30",
  intro:["Tenez le téléphone à la verticale et balayez l'horizon : les unités s'affichent dans leur direction réelle et à leur hauteur réelle, avec la distance.",
         "11 phases, du 11 au 25 mai 1944 : la rupture de la ligne Gustav, puis l'exploitation jusqu'à Pico. Fonctionne hors ligne après un premier chargement."],
  warn:"Positions des unités reprises de l'atelier de narration et recalées sur les lieux géolocalisés : indicatives, à l'échelle de la division. Points d'observation provisoires, à remplacer par le programme du déplacement.",
  offline:"À faire avec du réseau, avant de partir : télécharge le fond topographique du Garigliano à Pico (environ 950 tuiles, trois à quatre minutes) et les altitudes des positions, et les garde sur le téléphone.",
  dayLab:"Jour (mai 1944) — l'unité s'affiche dans toutes les phases de ce jour",
  indic:"indicative (atelier de narration, recalée sur les lieux géolocalisés)",
  sides:[
    {k:"F",lab:"Français",adj:"Français",pays:"France",fill:"#3399ff",line:"#3399ff"},
    {k:"L",lab:"Alliés",adj:"Allié",pays:"Alliés",fill:"#c5e0b4",line:"#7fbf6a"},
    {k:"A",lab:"Allemands",adj:"Allemand",pays:"Allemagne",fill:"#ff1f1f",line:"#ff1f1f",hostile:true}],
  types:["inf","mtn","goum","para","inm","arm","blm","art","gen","hq","fort"],
  decl:4.3,       // déclinaison magnétique (°, est) : ESTIMATION non vérifiée pour Cassino, octobre 2026 — à contrôler (calculateur NOAA), ou recaler avec « Aligner »
  geoid:47,       // écart ellipsoïde – niveau de la mer (m) : ESTIMATION ; sert à corriger l'altitude GPS, l'erreur possible (quelques mètres) est inférieure à celle du GPS
  site:true,      // symboles affichés à leur angle de site (hauteur réelle) ; false = tout sur l'horizon, comme à Sedan
  center:{lat:41.35,lon:13.78}, zoom:12,
  prefetch:{box:[41.18,41.53,13.48,13.91],z:[11,12,13,14],zs:15}, // zone à précharger : [lat min, lat max, lon min, lon max], zooms de la zone, zoom autour des stations
  atelier:"garigliano-1944.html",
  sources:"<p>Récit, phases et ordre de bataille : atelier de narration « Garigliano, mai 1944 » (Jean-François Fraysse), complété par le dossier de préparation du 2 octobre 2026 — Wikipédia FR, <i>Bataille du Garigliano (1944)</i> ; site de l'artillerie, <i>La bataille du Garigliano (11 au 13 mai 1944)</i> ; Wikipedia EN, <i>French Expeditionary Corps (1943–44)</i> ; US Army in WWII, <i>Cassino to the Alps</i>, chapitre 4.</p>"+
    "<p>Coordonnées des lieux : Mapcarta et PeakVisor (données OpenStreetMap), recoupées avec GeoNames ou Wikipédia EN quand c'était possible. Monte Faito : altitude non vérifiée. Cerasola, Girofano et l'Ausente n'ont pas pu être géolocalisés.</p>"+
    "<p>Divergences entre sources, non tranchées : préparation d'artillerie du 11 mai dans le secteur français, heure de la prise du Majo, date de la prise du Faito, unité et date pour Castelforte, corps de rattachement des 71. et 94. ID. À confronter à J.-C. Notin, P. Gaujac et R. Chambe.</p>"+
    "<p><a href=\"garigliano-1944.html\" style=\"color:var(--kaki)\">Ouvrir l'atelier de narration</a></p>"
};

// ---------- Lieux géolocalisés (chantier 1, validé le 2 octobre 2026) ----------
// [nom, latitude, longitude, altitude (m) ou null, lieu majeur (1) ou non (0), source]
const LIEUX=[
  ["Castelforte",41.29902,13.82402,134,1,"Mapcarta ; GeoNames à 790 m"],
  ["Sant'Andrea del Garigliano",41.36722,13.84092,176,0,"Mapcarta"],
  ["Sant'Apollinare",41.40272,13.83161,27,0,"Mapcarta"],
  ["San Giorgio a Liri",41.40412,13.76131,38,0,"Mapcarta"],
  ["Coreno Ausonio",41.34632,13.77967,318,0,"Mapcarta ; GeoNames à 290 m"],
  ["Ausonia",41.35446,13.74875,178,1,"Mapcarta"],
  ["Spigno Saturnia",41.3064,13.7319,56,0,"Mapcarta"],
  ["Esperia",41.38395,13.68061,370,1,"Mapcarta ; GeoNames à 400 m"],
  ["Itri",41.2892,13.5264,174,0,"Mapcarta ; latitude.to à 320 m"],
  ["Pico",41.45094,13.55938,199,1,"Mapcarta"],
  ["Pontecorvo",41.46162,13.66670,97,1,"Mapcarta ; latitude.to à 340 m"],
  ["Cassino",41.49256,13.83053,40,1,"Mapcarta ; Wikipédia EN à 360 m"],
  ["Minturno",41.26297,13.74652,null,1,"Mapcarta"],
  ["Vallemaio",41.36624,13.81175,337,0,"Mapcarta"],
  ["Monte Majo",41.34951,13.80581,940,1,"PeakVisor ; GeoNames à 160 m"],
  ["Monte Faito",41.33836,13.82403,null,0,"Mapcarta ; altitude non vérifiée"],
  ["Monte Feuci",41.34135,13.81120,839,0,"PeakVisor"],
  ["Monte Ornito",41.33366,13.83937,708,0,"Mapcarta"],
  ["Monte Fammera",41.35770,13.71079,1184,0,"PeakVisor"],
  ["Monte Petrella",41.32205,13.66532,1533,0,"PeakVisor ; Wikipédia EN à 80 m"],
  ["Monte Revole",41.33731,13.60269,1285,0,"PeakVisor"],
  ["Confluent du Liri et du Gari",41.40972,13.86278,null,0,"Wikipédia EN"],
  ["Embouchure du Garigliano",41.22278,13.76167,0,0,"Wikipédia EN"]
];
const LIEU=n=>{const l=LIEUX.find(l=>l[0]===n); if(!l) throw new Error("Lieu inconnu : "+n); return {lat:l[1],lon:l[2],alt:l[3]==null?undefined:l[3]};};

// ---------- De la carte de l'atelier au terrain ----------
// L'atelier dessine sur une carte tactique : x = (longitude − 13,40) × 835 ; y = (41,62 − latitude) × 1 110 (1 km ≈ 10 unités).
// Ses villages tombent à moins de 500 m des lieux réels, mais ses sommets sont indicatifs (Majo à 2,2 km, Faito à 3,4 km, Revole à 1,5 km).
// Chaque position de l'atelier est donc recalée : on lui applique l'écart « réel − atelier » des points d'appui voisins, pondéré par l'inverse du carré de la distance.
// Points d'appui : [x atelier, y atelier, nom du lieu géolocalisé]
const APPUI=[[354,358,"Castelforte"],[322,315,"Monte Majo"],[291,294,"Ausonia"],[238,263,"Esperia"],[134,189,"Pico"],[359,144,"Cassino"],[289,396,"Minturno"],
  [223,181,"Pontecorvo"],[330,336,"Monte Faito"],[217,333,"Monte Petrella"],[175,300,"Monte Revole"],[276,344,"Spigno Saturnia"],[109,366,"Itri"],
  [301,239,"San Giorgio a Liri"],[359,250,"Sant'Apollinare"]]
  .map(([x,y,n])=>{const l=LIEU(n); return {x,y,dlat:l.lat-(41.62-y/1110),dlon:l.lon-(13.40+x/835)};});
function AT(x,y){
  let sw=0,dla=0,dlo=0;
  for(const a of APPUI){ const d2=(x-a.x)**2+(y-a.y)**2; if(d2<0.01) return {lat:+(41.62-y/1110+a.dlat).toFixed(5),lon:+(13.40+x/835+a.dlon).toFixed(5)};
    const w=1/d2; sw+=w; dla+=w*a.dlat; dlo+=w*a.dlon; }
  return {lat:+(41.62-y/1110+dla/sw).toFixed(5),lon:+(13.40+x/835+dlo/sw).toFixed(5)};
}
// Tracé SVG de l'atelier (M, L, C en coordonnées absolues) → liste de points [lat, lon]
function PATH(d){
  const out=[]; let cur=null,m; const re=/([MLC])([^MLC]*)/g;
  while((m=re.exec(d))){ const n=m[2].trim().split(/[\s,]+/).map(Number);
    if(m[1]!=="C"){ for(let i=0;i+1<n.length;i+=2){ cur=[n[i],n[i+1]]; out.push(cur); } }
    else for(let i=0;i+5<n.length;i+=6){ const p0=cur,p1=[n[i],n[i+1]],p2=[n[i+2],n[i+3]],p3=[n[i+4],n[i+5]];
      for(let k=1;k<=8;k++){ const u=k/8,a=1-u; out.push([0,1].map(j=>a*a*a*p0[j]+3*a*a*u*p1[j]+3*a*u*u*p2[j]+u*u*u*p3[j])); } cur=p3; } }
  return out.map(([x,y])=>{const p=AT(x,y); return [p.lat,p.lon];});
}
// Libellé d'une position : le lieu géolocalisé le plus proche, avec distance et direction au-delà de 3 km
const DE=n=>/^Monte /.test(n)?"du "+n:/^Confluent/.test(n)?"du c"+n.slice(1):/^Embouchure/.test(n)?"de l'e"+n.slice(1):/^[AEIOUH]/.test(n)?"d'"+n:"de "+n;
const PRES=p=>{ let b=null,bd=1e9; LIEUX.forEach(l=>{ const d=Math.hypot((l[1]-p.lat)*111.2,(l[2]-p.lon)*83.5); if(d<bd){bd=d;b=l;} });
  if(bd<1) return b[0]; if(bd<3) return "Secteur "+DE(b[0]);
  const a=(Math.atan2((p.lon-b[2])*83.5,(p.lat-b[1])*111.2)*180/Math.PI+360)%360, dir=["au nord","au nord-est","à l'est","au sud-est","au sud","au sud-ouest","à l'ouest","au nord-ouest"][Math.round(a/45)%8];
  return "À "+Math.round(bd)+" km "+dir+" "+DE(b[0]); };

// ---------- Points d'observation ----------
// PROVISOIRES : le programme du déplacement (18–23 octobre 2026) n'est pas encore connu. alt : altitude du point (m).
const STATIONS=[
  {id:"M", n:"Monte Majo, sommet (provisoire)", ...LIEU("Monte Majo")},
  {id:"C", n:"Castelforte (provisoire)", ...LIEU("Castelforte")},
  {id:"A", n:"Ausonia (provisoire)", ...LIEU("Ausonia")},
  {id:"E", n:"Esperia (provisoire)", ...LIEU("Esperia")},
  {id:"K", n:"Cassino, ville (provisoire)", ...LIEU("Cassino")},
  {id:"P", n:"Pico (provisoire)", ...LIEU("Pico")}
];

// ---------- Ordre de bataille ----------
// s : camp (F, L, A) ; t : inf, mtn, goum, para, inm, arm, blm, art, gen, hq ; e : échelon ; num : numéro ; par : unité mère
const ODB=[
  // FRANCE
  {id:"cef", s:"F", t:"inf", e:"XXX", num:"CEF", name:"Corps expéditionnaire français — Juin",
    comp:"2e DIM, 3e DIA, 1re DMI, 4e DMM, trois groupements de tabors marocains, éléments de corps. En mai 1944, environ 112 000 hommes, 12 000 véhicules, 2 500 chevaux et mulets (atelier). Rattaché à la 5e armée américaine."},
  {id:"dim2", s:"F", t:"inf", e:"XX", num:"2", par:"CEF", parent:"cef", name:"2e division d'infanterie marocaine — Dody", comp:"4e, 5e, 8e RTM ; 3e RSM ; 63e RAA."},
  {id:"rtm4", s:"F", t:"inf", e:"III", num:"4", par:"2", parent:"dim2", name:"4e régiment de tirailleurs marocains"},
  {id:"rtm5", s:"F", t:"inf", e:"III", num:"5", par:"2", parent:"dim2", name:"5e régiment de tirailleurs marocains"},
  {id:"rtm8", s:"F", t:"inf", e:"III", num:"8", par:"2", parent:"dim2", name:"8e régiment de tirailleurs marocains"},
  {id:"rsm3", s:"F", t:"blm", e:"III", num:"3", par:"2", parent:"dim2", name:"3e régiment de spahis marocains"},
  {id:"raa63", s:"F", t:"art", e:"III", num:"63", par:"2", parent:"dim2", name:"63e régiment d'artillerie d'Afrique"},
  {id:"dia3", s:"F", t:"inf", e:"XX", num:"3", par:"CEF", parent:"cef", name:"3e division d'infanterie algérienne — Monsabert", comp:"3e RTA, 4e RTT, 7e RTA ; 67e RAA."},
  {id:"rta3", s:"F", t:"inf", e:"III", num:"3", par:"3", parent:"dia3", name:"3e régiment de tirailleurs algériens"},
  {id:"rtt4", s:"F", t:"inf", e:"III", num:"4", par:"3", parent:"dia3", name:"4e régiment de tirailleurs tunisiens"},
  {id:"rta7", s:"F", t:"inf", e:"III", num:"7", par:"3", parent:"dia3", name:"7e régiment de tirailleurs algériens"},
  {id:"raa67", s:"F", t:"art", e:"III", num:"67", par:"3", parent:"dia3", name:"67e régiment d'artillerie d'Afrique"},
  {id:"dmi1", s:"F", t:"inf", e:"XX", num:"1", par:"CEF", parent:"cef", name:"1re division de marche d'infanterie (ex-1re DFL) — Brosset", comp:"Brigades à bataillons de marche ; 13e DBLE."},
  {id:"dble13", s:"F", t:"inf", e:"III", num:"13", par:"1", parent:"dmi1", name:"13e demi-brigade de Légion étrangère"},
  {id:"dmm4", s:"F", t:"mtn", e:"XX", num:"4", par:"CEF", parent:"cef", name:"4e division marocaine de montagne — Sevez", comp:"1er, 2e, 6e RTM ; 69e RAM. Forme le corps de montagne avec les goums."},
  {id:"rtm1", s:"F", t:"mtn", e:"III", num:"1", par:"4", parent:"dmm4", name:"1er régiment de tirailleurs marocains"},
  {id:"rtm2", s:"F", t:"mtn", e:"III", num:"2", par:"4", parent:"dmm4", name:"2e régiment de tirailleurs marocains"},
  {id:"rtm6", s:"F", t:"mtn", e:"III", num:"6", par:"4", parent:"dmm4", name:"6e régiment de tirailleurs marocains"},
  {id:"ram69", s:"F", t:"art", e:"III", num:"69", par:"4", parent:"dmm4", name:"69e régiment d'artillerie de montagne"},
  {id:"gtm", s:"F", t:"goum", e:"X", num:"GTM", par:"CEF", parent:"cef", name:"Groupements de tabors marocains — Guillaume",
    comp:"1er, 3e et 4e GTM (7 833 goumiers), commandés par les colonels Leblanc, Massiet du Biest et le lieutenant-colonel Gautier. Forment le corps de montagne avec la 4e DMM."},
  {id:"gtm1", s:"F", t:"goum", e:"III", num:"1", par:"GTM", parent:"gtm", name:"1er groupement de tabors marocains"},
  {id:"gtm3", s:"F", t:"goum", e:"III", num:"3", par:"GTM", parent:"gtm", name:"3e groupement de tabors marocains"},
  {id:"gtm4", s:"F", t:"goum", e:"III", num:"4", par:"GTM", parent:"gtm", name:"4e groupement de tabors marocains"},
  {id:"rca7", s:"F", t:"arm", e:"III", num:"7", par:"CEF", parent:"cef", name:"7e régiment de chasseurs d'Afrique"},
  {id:"rca8", s:"F", t:"arm", e:"III", num:"8", par:"CEF", parent:"cef", name:"8e régiment de chasseurs d'Afrique"},
  {id:"artcef", s:"F", t:"art", e:"X", num:"", par:"CEF", parent:"cef", name:"Artillerie de corps", comp:"44 batteries de 105 et 28 de 155 pour l'assaut final ; 260 000 coups tirés en 48 heures (site de l'artillerie)."},
  // ALLIÉS VOISINS
  {id:"a5", s:"L", t:"inf", e:"XXXX", num:"5", name:"5e armée américaine — Clark", comp:"Corps expéditionnaire français et IIe corps américain sur le Garigliano ; 6e corps américain à Anzio."},
  {id:"us2", s:"L", t:"inf", e:"XXX", num:"II", par:"5", parent:"a5", name:"IIe corps américain"},
  {id:"a8", s:"L", t:"inf", e:"XXXX", num:"8", name:"8e armée britannique"},
  {id:"uk13", s:"L", t:"inf", e:"XXX", num:"XIII", par:"8", parent:"a8", name:"XIIIe corps britannique"},
  {id:"pol2", s:"L", t:"inf", e:"XXX", num:"2", par:"8", parent:"a8", name:"2e corps polonais — Anders"},
  {id:"cdn1c", s:"L", t:"inf", e:"XXX", num:"1", par:"8", parent:"a8", name:"1er corps canadien"},
  {id:"can1", s:"L", t:"inf", e:"XX", num:"1", par:"1", parent:"cdn1c", name:"1re division d'infanterie canadienne"},
  // ALLEMAGNE
  {id:"a10", s:"A", t:"inf", e:"XXXX", num:"10", name:"10. Armee"},
  {id:"pzk14", s:"A", t:"arm", e:"XXX", num:"XIV", par:"10", parent:"a10", name:"XIV. Panzerkorps — von Senger und Etterlin",
    comp:"Rattachement des 71. et 94. ID : XIV. Panzerkorps selon Wikipédia FR ; un résumé de l'histoire officielle américaine cite le LI. Gebirgskorps. À vérifier."},
  {id:"d71", s:"A", t:"inf", e:"XX", num:"71", par:"XIV", parent:"pzk14", name:"71. Infanterie-Division — Raapke", comp:"Au nord, face au Monte Majo."},
  {id:"d94", s:"A", t:"inf", e:"XX", num:"94", par:"XIV", parent:"pzk14", name:"94. Infanterie-Division — Steinmetz", comp:"Au sud, jusqu'à la mer."},
  {id:"pg90", s:"A", t:"inm", e:"XX", num:"90", name:"90. Panzergrenadier-Division", comp:"Un régiment engagé en renfort ; son numéro reste à vérifier."},
  {id:"pz26", s:"A", t:"arm", e:"XX", num:"26", name:"26. Panzer-Division", comp:"Engagée devant Pico, fin mai."},
  {id:"geb51", s:"A", t:"mtn", e:"XXX", num:"LI", par:"10", parent:"a10", name:"LI. Gebirgskorps — Feuerstein"},
  {id:"fj1", s:"A", t:"para", e:"XX", num:"1", par:"LI", parent:"geb51", name:"1. Fallschirmjäger-Division", comp:"À Cassino."}
];
const PHOTOS={};

// ---------- Phases (titres, faits et questions de l'atelier de narration) ----------
// d : jour de mai 1944 ; lab : libellé ; t : titre ; f : faits ; q : question à la salle ; fb "R" : situation reconstituée
const PHASES=[
 {d:11,lab:"11 mai, soir",fb:"R",t:"Percer par la montagne « infranchissable »",f:"En mai 1944, le corps expéditionnaire compte environ 112 000 hommes, dont 60 % de Maghrébins encadrés par des officiers français, 12 000 véhicules et 2 500 chevaux et mulets.",q:"Pourquoi le défenseur tient-il légèrement un terrain qu’il croit infranchissable ? Quel risque prend-il ?"},
 {d:11,lab:"11 mai, 23 h",fb:"R",t:"Diadem : le feu de mille six cents canons",f:"Selon les sources américaines, l’offensive s’ouvre sur une préparation de 1 600 pièces d’artillerie sur l’ensemble du front, de Cassino à la mer.",q:"Que peut, et que ne peut pas, une préparation d’artillerie face à des positions fortifiées et minées ?"},
 {d:12,lab:"12 mai",fb:"R",t:"Le 12 mai, l’attaque piétine",f:"Le 12 mai au soir, malgré deux succès locaux, Castelforte et le mont Faito, l’attaque ne perce pas : les positions, minées et préparées depuis des mois, résistent.",q:"Que doit faire un chef dont l’attaque piétine au soir du premier jour ?"},
 {d:13,lab:"13 mai",fb:"R",t:"Le drapeau sur le Majo",f:"Vers 15 h 30, un drapeau tricolore de trente mètres carrés est hissé au sommet du Majo, visible à des kilomètres à la ronde.",q:"Quels indices montrent qu’une défense est rompue, et pas seulement repoussée ?"},
 {d:14,lab:"14–15 mai",fb:"R",t:"L’Ausente franchi, la montagne ouverte",f:"Le 14 mai, la rive gauche de l’Ausente est nettoyée ; le 15, le corps expéditionnaire force l’entrée du massif de la Petrella, à Castello.",q:"Pourquoi engager les troupes de montagne maintenant, et pas dès le premier jour ?"},
 {d:15,lab:"15–17 mai",fb:"R",t:"Goumiers et mulets dans les Aurunci",f:"Le corps de montagne réunit la 4e division marocaine de montagne et trois groupements de tabors marocains, commandés par les colonels Leblanc, Massiet du Biest et le lieutenant-colonel Gautier.",q:"Qu’est-ce qui fait qu’une troupe transforme un obstacle en axe de manœuvre ?"},
 {d:17,lab:"17 mai",fb:"R",t:"Esperia tombe, la charnière saute",f:"Esperia est conquise les 16 et 17 mai, sous la menace des colonnes de montagne qui débordent la défense par le sud.",q:"Pourquoi des renforts engagés par fractions ne colmatent-ils pas une brèche ?"},
 {d:18,lab:"18 mai",fb:"R",t:"Cassino tombe, retour sur la ligne Senger",f:"Le 18 mai, le 2e corps polonais occupe les ruines de l’abbaye du Mont-Cassin, évacuées par les parachutistes allemands.",q:"Dans une coalition, comment mesurer la part de chacun dans la victoire ?"},
 {d:19,lab:"19–22 mai",fb:"R",t:"Pico, verrou de la ligne Senger",f:"Pico tombe le 22 mai après de violents combats ; du 23 au 25 mai, la 26e Panzerdivision contre-attaque encore face au corps expéditionnaire.",q:"Comment une infanterie sans chars en nombre tient-elle face à une division blindée ?"},
 {d:22,lab:"Avril – juin",fb:"R",t:"La face sombre : les crimes de Ciociaria",f:"Estimations : 2 000 à 3 000 victimes selon le ministère italien de la Défense (1997), plusieurs milliers de viols selon l’historienne Julie Le Gac ; ces chiffres restent débattus. Selon les sources disponibles, 207 militaires du corps expéditionnaire sont traduits devant des tribunaux militaires français et 156 condamnés.",q:"En quoi la discipline et le respect du droit font-ils partie de la valeur d’une troupe ?"},
 {d:23,lab:"23–25 mai",fb:"R",t:"La ligne Senger cède, Anzio sort",f:"Les 23 et 24 mai, les Canadiens prennent Pontecorvo ; le 23, le 6e corps américain sort de la tête de pont d’Anzio.",q:"Pourquoi attaquer au même moment sur la ligne Senger et à Anzio ?"}
];

// ---------- Front allemand (tracés de l'atelier, recalés), appliqué à partir de la phase indiquée ----------
const FRONTS=[
 {from:0,p:[[362,150],[372,205],[378,240],[382,268],[372,308],[360,345],[346,372],[300,386],[270,406],[250,432]]},          // 11 mai
 {from:3,p:[[362,150],[372,205],[360,245],[330,270],[306,290],[300,322],[300,352],[280,386],[256,412]]},                    // 13 mai
 {from:5,p:[[362,150],[342,205],[302,230],[264,256],[246,280],[232,300],[226,330]]},                                        // 15 mai
 {from:6,p:[[362,150],[302,196],[256,218],[226,238],[200,258],[170,276],[150,330]]},                                        // 17 mai
 {from:8,p:[[330,140],[262,150],[226,172],[160,166],[116,192],[96,232],[70,300]]}                                           // 22 mai
].map(f=>({from:f.from,p:f.p.map(([x,y])=>AT(x,y))}));

// ---------- Positions des unités ----------
// Positions de l'atelier : [unité, phases, x, y (carte de l'atelier), désorganisée (1), note]
const POS=[
 // dispositif du 11 mai
 ["dmi1",[0,1],402,262],["dmm4",[0,1],402,300],["dim2",[0,1],388,336],["dia3",[0,1],378,376],["gtm",[0,1],440,330],["d71",[0,1],326,312],["d94",[0,1],258,388],
 // 12 mai : l'attaque piétine
 ["dim2",[2],334,340],["dia3",[2],356,362],["dmi1",[2],392,270],["dmm4",[2],394,308],["gtm",[2],440,330],["d71",[2],318,312],["d94",[2],258,388],
 // 13 mai : le Majo
 ["dim2",[3],322,320,0,"Enlève le Majo le 13 mai, par le Faito."],["dmi1",[3],360,300],["dia3",[3],346,352],["dmm4",[3],376,330],["gtm",[3],430,330],["d71",[3],272,320,1],["d94",[3],256,390],
 // 14–15 mai : exploitation
 ["dia3",[4],300,302],["dim2",[4],312,330],["dmm4",[4],278,348],["gtm",[4],296,364],["dmi1",[4],342,282],["d71",[4],256,300,1],["d94",[4],240,382],
 // 15–17 mai : monts Aurunci
 ["gtm",[5],205,326],["dmm4",[5],180,306],["dia3",[5],272,288],["dim2",[5],292,302],["d71",[5],244,276,1],
 // 17 mai : Esperia
 ["dia3",[6],242,266],["gtm",[6],196,300],["dmm4",[6],176,286],["dim2",[6],272,276],["d71",[6],214,244,1],
 // 18 mai : Cassino
 ["pol2",[7],384,134],["fj1",[7],338,128,1],["dia3",[7],236,252],["dmm4",[7],180,282],["d71",[7],214,232,1],
 // 19–22 mai : Pico (positions conservées pour la phase « Ciociaria »)
 ["dia3",[8,9],150,204],["dmi1",[8,9],178,222],["gtm",[8,9],118,244],["pz26",[8,9],124,172],
 // 23–25 mai : ligne Senger
 ["can1",[10],228,168],["dia3",[10],98,196],["dmi1",[10],132,214],["gtm",[10],60,244],["pz26",[10],112,150,1]
];
// Positions ajoutées hors atelier : [unité, phases, {lat, lon, alt}, lieu, fiabilité (S sourcée, R reconstituée, q à confirmer), note]
const POS2=[
 ["us2",[0,1,2,3],LIEU("Minturno"),"Minturno","q","Position schématique : le IIe corps américain attaque le long de la côte."],
 ["uk13",[0,1,2,3],AT(392,180),"Vallée du Liri","q","Position schématique : la 8e armée britannique attaque dans la vallée du Liri."],
 ["pol2",[0,1,2,3,4,5,6],AT(384,134),"Face au Mont-Cassin","q","Position schématique : le 2e corps polonais attaque à Cassino."],
 ["rta3",[5],LIEU("Ausonia"),"Ausonia","S","Coreno et Ausonia sont pris par le 3e RTA le 16 mai (dossier de préparation)."]
];
// Repères de terrain : [phases, nom du lieu géolocalisé, note]
const REP=[
 [[0,1,2,3,4],"Monte Majo","940 m, clé de la ligne Gustav dans le secteur français. Pris le 13 mai par la 2e DIM ; l'heure diffère selon les sources (« au petit matin » ou « dans l'après-midi », drapeau vers 15 h 30 selon l'atelier)."],
 [[0,1,2,3],"Monte Faito","Pris le 12 mai au soir selon le site de l'artillerie ; « sans succès initial » selon Wikipédia FR. Altitude non vérifiée : affiché sur l'horizon tant que le relief n'a pas été consulté."],
 [[2,3],"Monte Feuci","839 m, voisin du Majo. Rôle dans la bataille à confirmer."],
 [[0,1,2],"Monte Ornito","708 m, à l'est du Faito. Un site « Battaglie Linea Gustav » est signalé à proximité (OpenStreetMap)."],
 [[0,1,2,3],"Castelforte","Pris le 12 mai au soir selon le site de l'artillerie ; unité et date à vérifier (Wikipédia FR l'attribue au 4e RSM, sans date)."],
 [[0,1,2,3],"Sant'Andrea del Garigliano",""],
 [[2,3,4],"Sant'Apollinare","Débordement attribué au 3e RSM par Wikipédia FR ; rôle de la 1re DMI dans ce secteur à préciser."],
 [[0,1],"Confluent du Liri et du Gari","Le Garigliano naît ici, de la réunion du Liri et du Gari."],
 [[0,1,7],"Cassino","Kesselring ordonne l'abandon de Cassino le 17 mai ; le 18, le 2e corps polonais occupe les ruines de l'abbaye."],
 [[3,4,5],"Coreno Ausonio","Pris par le 3e RTA le 16 mai, avec Ausonia."],
 [[4,5,6],"Ausonia","Pris par le 3e RTA le 16 mai, avec Coreno."],
 [[4,5],"Spigno Saturnia","Mapcarta distingue le village actuel et « Spigno Saturnia Vecchia » : celui de 1944 reste à préciser."],
 [[4,5,6],"Monte Fammera","1 184 m. Cité parmi les sommets atteints les 15 et 16 mai."],
 [[5,6],"Monte Petrella","1 533 m, point culminant des monts Aurunci."],
 [[5,6],"Monte Revole","1 285 m."],
 [[5,6,7,9],"Esperia","Conquise les 16 et 17 mai."],
 [[6,7],"San Giorgio a Liri",""],
 [[8,9,10],"Itri","Le corps de montagne atteint la rocade Itri–Pico du 19 au 21 mai."],
 [[7,8,9,10],"Pico","Verrou de la ligne Hitler (ligne Senger) ; tombe le 22 mai."],
 [[8,9,10],"Pontecorvo","Pris par les Canadiens les 23 et 24 mai."]
];
const SIT=[];
POS.forEach(([id,ph,x,y,b,note])=>{ const p=AT(x,y); SIT.push({id,ph,lat:p.lat,lon:p.lon,lieu:PRES(p),b:!!b,note}); });
POS2.forEach(([id,ph,p,lieu,f,note])=>SIT.push({id,ph,lat:p.lat,lon:p.lon,alt:p.alt,lieu,b:false,f,note}));
REP.forEach(([ph,n,note])=>{ const p=LIEU(n); SIT.push({id:null,rep:n,ph,lat:p.lat,lon:p.lon,alt:p.alt,lieu:n,f:"S",note:(note?note+" ":"")+"Coordonnées : "+LIEUX.find(l=>l[0]===n)[5]+"."}); });

// ---------- Fond vectoriel hors ligne (tracés simplifiés de l'atelier, recalés) ----------
const BASE={
  riv:["M388,211 C400,232 418,250 421,268 C420,292 414,306 410,322 C404,340 398,352 392,368 C376,388 350,402 336,413 C322,426 314,438 309,450",  // Garigliano
       "M-60,40 C20,80 100,130 160,165 C200,180 223,181 250,195 C280,205 320,210 350,212 C365,212 378,210 388,211",                              // Liri
       "M362,140 C368,160 375,180 380,195 C384,203 386,207 388,211",                                                                              // Gari
       "M291,294 C296,320 300,345 302,370 C303,390 298,410 300,430"].map(PATH),                                                                   // Ausente
  roads:["M-125,366 L25,289 L109,366 L172,404 L250,405 L289,396 L360,420 L420,440","M172,404 L276,344 L291,294 L301,239 L359,144","M289,396 L334,355 L354,358",
         "M291,294 L238,263 L134,189","M134,189 L223,181 L250,144 L359,144 L450,120","M250,144 L100,80 L-58,55 L-42,-22","M25,289 L50,233 L134,189",
         "M109,366 L109,255 L134,189","M134,189 L60,120 L-58,55","M223,181 L238,263"].map(PATH),
  coast:["M-600,400 L-125,366 L25,399 L100,430 L158,460 L167,438 L183,405 L250,405 L301,438 L309,450 L376,466 L409,520 L460,640"].map(PATH),
  border:[],
  places:[...LIEUX.filter(l=>!/^(Confluent|Embouchure)/.test(l[0])).map(l=>[l[0],l[1],l[2],l[4]]),
          ...[["Formia",172,404,1],["Gaeta",150,452,0],["Fondi",25,289,0],["Lenola",50,233,0],["Aquino",250,144,0],["Campodimele",109,255,0],["Castello",270,330,0],["Monte d’Oro",214,232,0]]
             .map(([n,x,y,k])=>{const p=AT(x,y); return [n,p.lat,p.lon,k];})]
};
