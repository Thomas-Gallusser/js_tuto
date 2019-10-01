// On reprend le tuto déplacement !
// Petit changement sur les déplacements pour facilement gérer les collisions
// + fonction toute prête de collisions à la fin !

var taille_mouvement = 25;

// Je commence à créer mon terrain, une simple div de taille 275x275
var terrain = document.createElement("div");
terrain.style.width = "325px";
terrain.style.height = "325px";
terrain.style.position = "relative"; // Je met le terrain en relative
// En m'étant un div en relative et en ajoutant dedans un autre div en absolute
// ça permet de placerla position 0 en haut à gauche du parent (ici le parent est le terrain)
terrain.style.backgroundImage = "url('ground.png')"; // Mon image de fond fait 25x25
document.body.appendChild(terrain); // Je l'ajoute à mon body

// Je commence à créer mon joueur (un simple cube) de 25x25
var player = document.createElement("div");
player.style.width = "25px";
player.style.height = "25px";
player.style.left = "25px"; // On place le joueur en dehors du bord
player.style.top = "25px";
player.style.backgroundColor = "black";
player  .style.position = "absolute"; // Les "enfants" (élément à l'intérieur) du terrain sont en absolute
terrain.appendChild(player); // Je l'ajoute à mon body

// Nos cubes faisant 25x25 et le terrain 275x275 nous avons une case centrale qui sera en position 150x150
// (275 / 25 = 11 cubes de long/large le milieux sera au 6eme cube, 6 x 25 = 150, le centre est donc en 150x150)

// Nous avons déjà notre terrain et notre cube ... J'ajoute 1 cube qui sera un "mur" au centre
var murs = []

for (var i = 0; i < 325; i+=25) addMur(i,0); //Mur du haut
for (var i = 0; i < 325; i+=25) addMur(i,300); // Mur du bas
for (var i = 25; i < 300; i+=25) addMur(0,i); // Mur de gauche
for (var i = 25; i < 300; i+=25) addMur(300,i); // Mur de DROITE

function addMur(x,y) { // Création de murs dynamic pour évité de répété les 10 lignes
  var newMur = document.createElement("div");
  newMur.style.width = "25px";
  newMur.style.height = "25px";
  newMur.style.left = x + "px";
  newMur.style.top = y + "px";
  newMur.style.position = "absolute";
  newMur.style.backgroundColor = "red";
  murs.push(newMur);
  terrain.appendChild(newMur);
}

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
  if (!verifCollisionTableau(player,nouvelle_valeur_x,nouvelle_valeur_y,murs)) {
    player.style.left = nouvelle_valeur_x + 'px';
    player.style.top = nouvelle_valeur_y + 'px';
  }
}, false); // Le False est important pour lire les flèches du clavier

// Cette fonction va vérifier si dans le tableau entrée le premier_objet va aller dessus
// Le premier_objet est mis le joueur et dans le tableau la variable de tableau murs
// Ceci va vérifier si le joueur va passer sur un des murs existant
function verifCollisionTableau(premier_objet,deplacement_en_x, deplacement_en_y, tableau_a_verifier) {
  // La fonction "filter" sert à retourner un tableau, ça ne sert pas à ça mais ça peut être très utile !
  if ((tableau_a_verifier.filter(e => deplacement_en_x < e.offsetLeft + e.offsetWidth && deplacement_en_x + premier_objet.offsetWidth > e.offsetLeft && deplacement_en_y < e.offsetTop + e.offsetHeight && premier_objet.offsetHeight + deplacement_en_y > e.offsetTop)).length > 0) {
       return true; // collision
  }
  return false; // pas de collision
}

// Cette fonction vérifie les déplacements après, donc trop tard pour vérifier un mur, peut être utilisé pour un bonus par exemple:
// function verifCollision(premier_objet, deuxieme_objet) {
//   if (premier_objet.offsetLeft < deuxieme_objet.offsetLeft + deuxieme_objet.offsetWidth &&
//      premier_objet.offsetLeft + premier_objet.offsetWidth > deuxieme_objet.offsetLeft &&
//      premier_objet.offsetTop < deuxieme_objet.offsetTop + deuxieme_objet.offsetHeight &&
//      premier_objet.offsetHeight + premier_objet.offsetTop > deuxieme_objet.offsetTop) {
//        return true; // collision
//   }
//   return false; // pas de collision
// }

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

// le bord gauche du joueur est inférieur au bord droit du mur (vrais) ET
// le bord droit du joueur est supérieur au bord gauche du mur (vrais)
// Donc on est dedans si on regarde juste droite et gauche


// Maintenant si on regarde la hauteur:
// Le bord haut du joueur est inférieur au bord bas du mur (faux) ET
// Le bord bas du joueur est supérieur au bord haut du mur (vrais)
// En regardant la hauteur, on sait que le joueur n'est pas sur le mur
