// On reprend le tuto déplacement !
// Petit changement sur les déplacements pour facilement gérer les collisions
// + fonction toute prête de collisions à la fin !

var taille_mouvement = 25;

// Je commence à créer mon terrain, une simple div de taille 275x275
var terrain = document.createElement("div");
terrain.style.width = "275px";
terrain.style.height = "275px";
terrain.style.position = "relative"; // Je met le terrain en relative
// En m'étant un div en relative et en ajoutant dedans un autre div en absolute
// ça permet de placerla position 0 en haut à gauche du parent (ici le parent est le terrain)
terrain.style.backgroundImage = "url('ground.png')"; // Mon image de fond fait 25x25
document.body.appendChild(terrain); // Je l'ajoute à mon body

// Je commence à créer mon joueur (un simple cube) de 25x25
var player = document.createElement("div");
player.style.width = "25px";
player.style.height = "25px";
player.style.backgroundColor = "black";
player  .style.position = "absolute"; // Les "enfants" (élément à l'intérieur) du terrain sont en absolute
terrain.appendChild(player); // Je l'ajoute à mon body

// Nos cubes faisant 25x25 et le terrain 275x275 nous avons une case centrale qui sera en position 150x150
// (275 / 25 = 11 cubes de long/large le milieux sera au 6eme cube, 6 x 25 = 150, le centre est donc en 150x150)

// Nous avons déjà notre terrain et notre cube ... J'ajoute 1 cube qui sera un "mur" au centre
var mur = document.createElement("div");
mur.style.width = "25px";
mur.style.height = "25px";
mur.style.left = "125px"; // Sachant qu'on démarre en 0x0 et que le centre est à 150 on décale d'un carré donc 25x25
mur.style.top = "125px"; // (carré 1 = 0, 2 = 25, 3 = 50, 4 = 75, 5 = 100, le 6eme sera bien à 125)
mur.style.position = "absolute";
mur.style.backgroundColor = "red";
terrain.appendChild(mur); // Je l'ajoute à mon body

// On ne peut que gérer la position "left" (gauche) et "top" (haut) d'un élément
// Pour avoir sa position à sa droite il suffit de faire sa position gauche + sa largeur
// Un cube en position 25 du haut et faisant 25 de hauteur aura son top à 25 et son bottom à 50
// Il démarrera donc en 25x25 et finira en 50x50 si il à une taille de 25x25

// A savoir qu'on peut utiliser les "offset" qui permet d'avoir des infos sur l'élément exemple:
// player.offsetLeft : permet d'obtenir la position gauche (ici 0)
// player.offsetTop : permet d'obtenir la position haut (ici 0)
// player.offsetWidth : permet d'obtenir la largeur de l'objet (ici 25)
// player.offsetHeight : permet d'obtenir la hauteur de l'objet (ici 25)
// player.offsetParent : permet d'obtenir le parent de l'objet (ici le div du terrain)

// On lit les enfoncements du clavier (sur "document" qui est la page)
document.addEventListener("keydown", event => {
  // On charge les valeurs avant
  var nouvelle_valeur_x = player.offsetLeft;
  var nouvelle_valeur_y = player.offsetTop;

  if (event.code == "ArrowUp") nouvelle_valeur_y -= taille_mouvement;
  if (event.code == "ArrowDown") nouvelle_valeur_y += taille_mouvement;
  if (event.code == "ArrowRight") nouvelle_valeur_x += taille_mouvement;
  if (event.code == "ArrowLeft") nouvelle_valeur_x -= taille_mouvement;

  // Pour déplacer directement le joueur, n'est pas une bonne solution pour du cases par cases
  if (!verifCollision(player,nouvelle_valeur_x,nouvelle_valeur_y,mur)) {
    player.style.left = nouvelle_valeur_x + 'px';
    player.style.top = nouvelle_valeur_y + 'px';
  }
}, false); // Le False est important pour lire les flèches du clavier

// Pour changer la position avec le style.top / style.left il faut que ce sois en 'px' obligatoirement
// Quand on mélange calcul et texte il faut mettre le calcul entre parenthèse
// (0 + 0) + ' = la tête à toto'

// J'utilise 2 valeurs de déplacement pour calculer les futurs déplacements (sinon on calcul trop tard)
function verifCollision(premier_objet,deplacement_en_x, deplacement_en_y, deuxieme_objet) {
  if (deplacement_en_x < deuxieme_objet.offsetLeft + deuxieme_objet.offsetWidth &&
     deplacement_en_x + premier_objet.offsetWidth > deuxieme_objet.offsetLeft &&
     deplacement_en_y < deuxieme_objet.offsetTop + deuxieme_objet.offsetHeight &&
     premier_objet.offsetHeight + deplacement_en_y > deuxieme_objet.offsetTop) {
       return true; // collision
  }
  return false; // pas de collision
}

// Pour aller plus loin sur la collision en français lignes par lignes le if:

// Si le bord gauche du premier_objet est inférieur au bord droite du deuxieme_objet ET SI
// Si le bord droite du premier_objet est supérieur au bord gauche du deuxieme_objet ET SI
// Si le bord haut du premier_objet est inférieur au bord bas du deuxieme_objet ET SI
// Si le bord bas du premier_objet est supérieur au bord haut du deuxieme_objet
// Alors on à une collision


//-------------------------------------------------------------------------------------------------------------
// C'est plus simple si on regarde qu'une direction, exemple si on regarde que la gauche et la droite:

// |player|
//     |mur|

// Si on ne regarde pas la hauteur
// le bord gauche du joueur est inférieur au bord droit du mur ET
// le bord droit du joueur est supérieur au bord gauche du mur
// Donc on est dedans si on regarde juste droite et gauche
// on ne le serait pas si on regarde la hauteur
