# Voix ElevenLabs · Garigliano, mai 1944

Fichier : une phrase = un fichier audio, nommé `étape_phrase.mp3` (comme dans `voix/`, ex. `2_0.mp3`), pour remplacer directement les mp3 actuels.

## Réglages recommandés
- **Modèle : Eleven v3** (seul à interpréter les balises entre crochets ; en v2/Flash, supprimer les crochets avec la regex `\[[^\]]*\]\s*`).
- Voix : une voix française posée et grave, de type documentaire (à choisir en écoute ; la même pour les 82 phrases). Stability : « Natural » ou « Robust » pour garder une voix constante entre les fichiers.
- Générer **phrase par phrase** (82 fichiers), car l’application synchronise encarts et surbrillances sur chaque phrase.
- Aucun `[laughs]` : le sujet ne s’y prête pas (et la scène 11 traite de crimes de guerre). Les seules touches « humaines » sont une ironie sèche (scène 3, permission de von Senger) et une fierté contenue (drapeau sur le Majo).
- Les balises sont des **suggestions** : v3 les interprète librement. Réécouter, et retirer/changer celles qui sonnent mal.

## Minutage
Durées **estimées** à 15 caractères/seconde (même hypothèse que l’application) + 0,35 s de respiration par phrase + 1,2 s d’entrée et 1,6 s de sortie par scène. Total estimé : **09:58**. Après génération, mesurer les vraies durées ; je peux recaler l’application dessus.

## Prononciation (dictionnaire ElevenLabs, règles « alias »)
| Mot | Alias à lire |
|---|---|
| Garigliano | Garilliano |
| Majo | Maïo |
| Faito | Faïto |
| Girofano | Djirofano |
| Cerasola | Tchérasola |
| Castelforte | Castelforté |
| Ausonia | Aouzonia |
| Ausente | Aouzenté |
| Aurunci | Aouroun-tchi |
| Ausoni | Aouzoni |
| Esperia | Espéria |
| Petrella | Pétrella |
| Revole | Rèvolé |
| Pontecorvo | Pontécorvo |
| Valmontone | Valmontoné |
| Ciociaria | Tchotchaaria |
| marocchinate | marokkinaté |
| Anzio | Antsio |
| Senger | Zengueur |
| von Senger | fonne Zengueur |
| Kesselring | Kesselring (à tester) |
| Panzerdivision | Pantseur-division |
| Alexander | Alexandeur |
| Diadem | Daïadem |
| Farnèse | Farnèze |

Chiffres, heures et ordinaux sont déjà écrits en toutes lettres dans le texte ci-dessous (ex. « quinze heures trente », « deuxième division »). Les dates et années restent en chiffres.

## Textes par scène

## Scène 1 sur 14 · Un hiver bloqué devant Cassino
*Janvier–avril 1944 · début 00:00 · durée estimée 51 s (00:51)*

Réglage de la scène : `[calm, documentary narration]` (à placer en tête de la première phrase)

**0_0** `00:01` (1.4 s)
> [calm, documentary narration] Printemps 1944.

**0_1** `00:03` (12.3 s)
> En Italie, les Alliés sont bloqués depuis l’automne devant la ligne Gustav, qui barre la péninsule de l’embouchure du Garigliano jusqu’à la mer Adriatique, en passant par Cassino.

**0_2** `00:15` (4.7 s)
> Trois offensives contre Cassino ont échoué entre janvier et mars.

**0_3** `00:20` (7.4 s)
> Le débarquement d’Anzio, en janvier, devait déborder la ligne par la mer : la tête de pont reste enfermée.

**0_4** `00:27` (6.3 s)
> Le corps expéditionnaire français du général Juin combat en Italie depuis la fin de 1943.

**0_5** `00:33` (9.0 s)
> Dans les montagnes des Abruzzes, puis au Belvédère, ses tirailleurs ont montré qu’ils savaient se battre là où d’autres piétinent.

**0_6** `00:42` (7.4 s)
> En face, le maréchal Kesselring tient, avec des divisions aguerries, un terrain qui favorise le défenseur.


## Scène 2 sur 14 · Percer par la montagne « infranchissable »
*4 avril – 11 mai 1944 · début 00:51 · durée estimée 54 s (00:54)*

Réglage de la scène : `[calm, confident]` (à placer en tête de la première phrase)

**1_0** `00:52` (7.8 s)
> [calm, confident] Pour l’offensive de printemps, nommée Diadem, le général Alexander regroupe ses forces entre Cassino et la mer.

**1_1** `01:00` (11.3 s)
> Le 4 avril, Juin propose au général Clark, qui commande la cinquième Armée américaine, de porter l’effort dans la montagne et de le confier au corps expéditionnaire.

**1_2** `01:12` (7.3 s)
> Les monts Aurunci, sans routes, passent pour infranchissables, et les Allemands les tiennent légèrement.

**1_3** `01:19` (7.1 s)
> Juin compte sur ses tirailleurs et sur les goumiers marocains du général Guillaume, avec leurs mulets.

**1_4** `01:26` (8.9 s)
> Le corps compte alors environ cent douze mille hommes, dont soixante pour cent de Maghrébins encadrés par des officiers français.

**1_5** `01:35` (9.0 s)
> Le plan est simple : percer au Majo, puis déborder par la montagne vers Pico, sur les arrières de la défense de la vallée du Liri.


## Scène 3 sur 14 · Diadem : le feu de mille six cents canons
*11 mai 1944, 23 h · début 01:46 · durée estimée 55 s (00:55)*

Réglage de la scène : `[low voice, tense]` (à placer en tête de la première phrase)

**2_0** `01:47` (10.8 s)
> [low voice, tense] Le 11 mai 1944, à 23 heures, l’artillerie alliée ouvre le feu sur tout le front, de Cassino à la mer : mille six cents pièces selon les sources américaines.

**2_1** `01:58` (5.5 s)
> Dans la tête de pont du Garigliano, le corps expéditionnaire attaque aussitôt.

**2_2** `02:03` (8.4 s)
> La deuxième division d’infanterie marocaine du général Dody doit enlever le mont Faito, puis le Majo, clé de la position.

**2_3** `02:11` (5.7 s)
> Au nord, la première division de marche attaque vers la Cerasola et le Girofano.

**2_4** `02:17` (6.7 s)
> Au sud, la troisième division d’infanterie algérienne du général de Monsabert vise Castelforte.

**2_5** `02:24` (9.2 s)
> En face, la soixante et onzième division d’infanterie allemande tient des positions fortifiées, minées et préparées depuis des mois.

**2_6** `02:33` (6.4 s)
> [dry, slightly ironic] La surprise est réelle : le général von Senger, qui commande le secteur, est en permission.


## Scène 4 sur 14 · Le 12 mai, l’attaque piétine
*12 mai 1944 · début 02:41 · durée estimée 46 s (00:46)*

Réglage de la scène : `[serious]` (à placer en tête de la première phrase)

**3_0** `02:42` (2.3 s)
> [serious] Le 12 mai, l’attaque piétine.

**3_1** `02:44` (7.9 s)
> Les tirailleurs marocains prennent le Faito, et la troisième division algérienne enlève le village de Castelforte.

**3_2** `02:52` (8.0 s)
> Ailleurs, sur la Cerasola et le Girofano, les assauts se brisent sur les champs de mines et les armes automatiques.

**3_3** `03:00` (7.4 s)
> L’attaque a été lancée sans préparation d’artillerie, pour garder la surprise, et les pertes sont lourdes.

**3_4** `03:08` (4.2 s)
> Le soir, sur tout le front allié, rien n’est encore percé.

**3_5** `03:12` (7.6 s)
> Juin juge pourtant que la défense allemande est usée, et décide de relancer l’attaque dès le lendemain matin.

**3_6** `03:20` (5.4 s)
> [thoughtful] La friction est partout ; la décision tient à la lecture qu’en fait le chef.


## Scène 5 sur 14 · Le drapeau sur le Majo
*13 mai 1944 · début 03:27 · durée estimée 46 s (00:46)*

Réglage de la scène : `[building energy]` (à placer en tête de la première phrase)

**4_0** `03:28` (2.8 s)
> [building energy] Le 13 mai, la défense allemande cède.

**4_1** `03:31` (3.0 s)
> Vers 14 heures, le Girofano est nettoyé.

**4_2** `03:34` (14.3 s)
> [proud] Vers quinze heures trente, les tirailleurs marocains de la deuxième division atteignent le sommet du Majo et y hissent un immense drapeau tricolore, de trente mètres carrés, visible à des kilomètres à la ronde.

**4_3** `03:48` (4.7 s)
> La ligne Gustav est rompue sur le front du corps expéditionnaire.

**4_4** `03:53` (6.1 s)
> La soixante et onzième division allemande, à bout de réserves, se replie vers l’ouest.

**4_5** `03:59` (12.6 s)
> Les Alliés voisins, Américains sur la côte et Britanniques dans la vallée du Liri, progressent encore difficilement : la brèche française devient le point décisif de toute l’offensive.


## Scène 6 sur 14 · L’Ausente franchi, la montagne ouverte
*14–15 mai 1944 · début 04:13 · durée estimée 39 s (00:39)*

Réglage de la scène : `[determined]` (à placer en tête de la première phrase)

**5_0** `04:14` (2.2 s)
> [determined] Juin exploite sans attendre.

**5_1** `04:16` (6.1 s)
> Le 14 mai, ses divisions nettoient la rive gauche de l’Ausente et marchent sur Ausonia.

**5_2** `04:23` (4.8 s)
> Le 15, elles forcent l’entrée du massif de la Petrella, à Castello.

**5_3** `04:27` (8.8 s)
> Juin engage alors son corps de montagne : la quatrième division marocaine de montagne et trois groupements de tabors marocains.

**5_4** `04:36` (5.8 s)
> Ils doivent traverser les monts Aurunci, là où les Allemands n’attendent personne.

**5_5** `04:42` (8.5 s)
> En agissant plus vite que l’adversaire ne peut se rétablir, Juin conserve la liberté d’action que la rupture lui a donnée.


## Scène 7 sur 14 · Goumiers et mulets dans les Aurunci
*15–17 mai 1944 · début 04:52 · durée estimée 39 s (00:39)*

Réglage de la scène : `[measured, admiring]` (à placer en tête de la première phrase)

**6_0** `04:53` (8.0 s)
> [measured, admiring] Du 15 au 17 mai, goumiers et tirailleurs de montagne s’enfoncent dans un massif sans routes, presque sans sentiers.

**6_1** `05:01` (4.4 s)
> Les mulets portent les armes lourdes, les munitions et l’eau.

**6_2** `05:06` (9.5 s)
> Les colonnes franchissent la Petrella et poussent vers le mont Revole, pour tomber sur les arrières d’Esperia, du Monte d’Oro et de Pico.

**6_3** `05:15` (8.6 s)
> Les Allemands, qui croyaient le massif infranchissable, voient surgir des troupes là où ils n’avaient laissé que des postes.

**6_4** `05:24` (5.3 s)
> Une troupe adaptée à son milieu transforme un obstacle en axe de manœuvre.


## Scène 8 sur 14 · Esperia tombe, la charnière saute
*17 mai 1944 · début 05:31 · durée estimée 34 s (00:34)*

Réglage de la scène : `[steady]` (à placer en tête de la première phrase)

**7_0** `05:32` (2.0 s)
> [steady] Le 17 mai, Esperia tombe.

**7_1** `05:34` (7.7 s)
> Menacée d’être prise à revers par les colonnes de montagne, la défense allemande ne peut plus tenir la vallée.

**7_2** `05:42` (9.6 s)
> Le commandement allemand engage ses renforts par fractions, à mesure qu’ils arrivent : trop tard et trop dispersés pour colmater la brèche.

**7_3** `05:51` (6.8 s)
> Pendant ce temps, sur la côte, le deuxième corps américain avance à son tour vers Formia et Itri.

**7_4** `05:58` (4.9 s)
> La manœuvre par la montagne a fait sauter la charnière de la défense.


## Scène 9 sur 14 · Cassino tombe, retour sur la ligne Senger
*18 mai 1944 · début 06:05 · durée estimée 42 s (00:42)*

Réglage de la scène : `[solemn]` (à placer en tête de la première phrase)

**8_0** `06:06` (10.9 s)
> [solemn] Le 18 mai, au nord, les soldats du deuxième corps polonais occupent les ruines de l’abbaye du Mont-Cassin, que les parachutistes allemands viennent d’évacuer.

**8_1** `06:17` (4.6 s)
> Dans la vallée du Liri, la huitième Armée britannique progresse.

**8_2** `06:21` (6.3 s)
> Le débordement français par le sud a contribué à rendre la position de Cassino intenable.

**8_3** `06:28` (9.3 s)
> Les Allemands se replient sur leur deuxième ligne, la ligne Hitler, rebaptisée ligne Senger, de Pontecorvo à Aquino, avec Pico au sud.

**8_4** `06:37` (7.8 s)
> La victoire de Diadem est une victoire de coalition : chaque corps fixe l’adversaire pendant qu’un autre perce.


## Scène 10 sur 14 · Pico, verrou de la ligne Senger
*19–22 mai 1944 · début 06:46 · durée estimée 30 s (00:30)*

Réglage de la scène : `[tense]` (à placer en tête de la première phrase)

**9_0** `06:48` (4.9 s)
> [tense] Pico, verrou de la ligne Senger au sud, est défendu avec acharnement.

**9_1** `06:52` (3.6 s)
> Le corps expéditionnaire y livre de durs combats.

**9_2** `06:56` (2.2 s)
> Le 22 mai, Pico tombe enfin.

**9_3** `06:58` (6.8 s)
> Du 23 au 25 mai, la vingt-sixième Panzerdivision contre-attaque encore pour reprendre le terrain.

**9_4** `07:05` (5.1 s)
> Face à des chars, l’infanterie française doit durer, tenir et relancer.

**9_5** `07:10` (4.0 s)
> La prise de Pico ouvre le flanc sud de la ligne Senger.


## Scène 11 sur 14 · La face sombre : les crimes de Ciociaria
*Avril – juin 1944 · début 07:16 · durée estimée 46 s (00:46)*

Réglage de la scène : `[somber, slow]` (à placer en tête de la première phrase)

**10_0** `07:17` (3.0 s)
> [somber, slow] [pause] Cette campagne a aussi une face sombre.

**10_1** `07:20` (12.8 s)
> Entre avril et juin 1944, des soldats du corps expéditionnaire, surtout des goumiers, commettent des viols, des meurtres et des pillages contre les civils du sud du Latium, la Ciociaria.

**10_2** `07:33` (14.5 s)
> Les estimations varient : de deux à trois mille victimes selon le ministère italien de la Défense en 1997, quatre à cinq mille viols selon l’historienne Julie Le Gac, davantage selon les associations de victimes.

**10_3** `07:47` (3.8 s)
> Les Italiens appellent ces crimes les marocchinate.

**10_4** `07:51` (9.5 s)
> [slow, heavy] Ils rappellent que la discipline et le respect du droit font partie de la valeur d’une troupe, au même titre que son efficacité au combat.


## Scène 12 sur 14 · La ligne Senger cède, Anzio sort
*23 mai 1944 · début 08:02 · durée estimée 33 s (00:33)*

Réglage de la scène : `[urgent]` (à placer en tête de la première phrase)

**11_0** `08:03` (3.6 s)
> [urgent] Le 23 mai, les Alliés attaquent la ligne Senger.

**11_1** `08:07` (3.5 s)
> Les Canadiens enlèvent Pontecorvo le jour même.

**11_2** `08:10` (5.6 s)
> Le même jour, le sixième corps américain sort enfin de la tête de pont d’Anzio.

**11_3** `08:16` (6.9 s)
> La dixième Armée allemande doit se replier vers le nord, par la vallée du Liri et les monts Ausoni.

**11_4** `08:23` (7.5 s)
> Le corps expéditionnaire continue de manœuvrer par les hauteurs, débordant chaque position par la montagne.

**11_5** `08:30` (3.5 s)
> La défense allemande au sud de Rome s’effondre.


## Scène 13 sur 14 · Le choix de Clark
*Fin mai 1944 · début 08:35 · durée estimée 36 s (00:36)*

Réglage de la scène : `[reflective]` (à placer en tête de la première phrase)

**12_0** `08:37` (8.9 s)
> [reflective] Le général Alexander voulait que les forces sorties d’Anzio coupent à Valmontone la route de repli de la dixième Armée allemande.

**12_1** `08:46` (5.0 s)
> Fin mai, le général Clark oriente l’essentiel de son effort vers Rome.

**12_2** `08:51` (6.9 s)
> Une partie des divisions allemandes échappe ainsi à l’encerclement et ira se rétablir plus au nord.

**12_3** `08:58` (5.2 s)
> Le corps expéditionnaire, lui, poursuit par les monts au sud-est de Rome.

**12_4** `09:03` (6.8 s)
> [thoughtful] Détruire l’armée ennemie, ou prendre la capitale : c’est le grand débat de cette fin de bataille.


## Scène 14 sur 14 · Rome, et la renaissance d’une armée
*4–5 juin 1944 · début 09:11 · durée estimée 47 s (00:47)*

Réglage de la scène : `[warm, conclusive]` (à placer en tête de la première phrase)

**13_0** `09:12` (3.4 s)
> [warm, conclusive] Le 4 juin 1944, les Alliés entrent dans Rome.

**13_1** `09:16` (8.7 s)
> Le 5, le général Clark fait son entrée dans la ville, accompagné de ses commandants de corps, parmi lesquels le général Juin.

**13_2** `09:24` (7.8 s)
> La première division de marche hisse le drapeau tricolore sur le palais Farnèse, siège de l’ambassade de France.

**13_3** `09:32` (5.9 s)
> [pause] Deux jours plus tard, le débarquement de Normandie relègue l’Italie au second plan.

**13_4** `09:38` (9.4 s)
> Au Garigliano, l’armée française renaissante a montré qu’elle savait concevoir et réussir une manœuvre décisive au sein d’une coalition.

**13_5** `09:48` (9.2 s)
> [slow, conclusive] Surprise, exploitation par la montagne, rythme maintenu : la victoire tient à la compréhension du terrain et à l’audace de son chef.
