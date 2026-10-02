# Garigliano 1944 · Vue terrain

Appli web installable sur téléphone, utilisable hors ligne : elle montre sur le terrain (caméra) et sur une carte à plat les unités, repères et mouvements de la bataille du Garigliano (11–25 mai 1944), phase par phase.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Moteur, commun à toutes les batailles. Repris de `jef1234567/sedan40-terrain` (commit `5a2773e`), sans aucune donnée de bataille. |
| `data.js` | Données du Garigliano : configuration, lieux géolocalisés, points d'observation, ordre de bataille, phases, positions, repères, fronts, fond vectoriel. |
| `sw.js` | Fonctionnement hors ligne. Ne touche qu'aux caches préfixés `garigliano44-`. |
| `manifest.json`, `icon.svg` | Installation sur l'écran d'accueil. |
| `garigliano-1944.html` | Atelier de narration (source des phases, des positions et des tracés). |
| `tests/verif.js` | 51 vérifications automatiques en navigateur simulé. |

## Ce qui change par rapport à Sedan

- **Moteur et données séparés** : une nouvelle bataille = un nouveau `data.js`.
- **Angle de site** : chaque symbole est posé à sa hauteur réelle (altitude du point, altitude de l'observateur, courbure terrestre). Sans altitude connue, le symbole reste sur l'horizon. Réglage : filtre « Hauteur réelle ».
- **Altitudes** : celles des lieux sont dans `data.js` ; celles des autres positions et de l'observateur sont relevées en ligne (Open-Meteo) puis gardées sur le téléphone. Hors ligne et sans relevé, l'altitude GPS sert de repli.
- **Stockage** : préfixe `garigliano44_`, distinct de celui de Sedan.
- **Fichiers de l'appli** : réseau d'abord, copie locale après 4 secondes sans réponse.
- **Symboles ajoutés** : infanterie de montagne, goums (lettre G : convention maison, à valider), parachutistes.

## Positions

L'atelier dessine sur une carte tactique (x = (longitude − 13,40) × 835 ; y = (41,62 − latitude) × 1 110). Ses villages tombent à moins de 500 m des lieux réels, mais ses sommets sont indicatifs. Chaque position est donc recalée sur les lieux géolocalisés voisins (`AT()` dans `data.js`). Les positions restent indicatives, à l'échelle de la division.

## À vérifier sur le téléphone (impossible à tester ici)

- fond topographique et préchargement des tuiles ;
- relevé des altitudes en ligne ;
- déclinaison magnétique (`decl`, estimation) : recaler avec « Aligner » ou « Je le vise ».

## Tests

```
python3 -m http.server 8765
node tests/verif.js
```
