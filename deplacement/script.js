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
  //console.log(event); // on peut log "event" pour voir tout ce qui peut être récupérer
  //On peut soit récupérer le keyCode (exemple: 32) sois le code (exemple: "Space")
  if (event.code == "ArrowUp") { // Si j'appuis sur flèche haut ..
    player.style.top = (player.offsetTop - player.offsetHeight) + 'px'; // On ajoute à la position y du joueur sa hauteur
  }
  if (event.code == "ArrowDown") { // Si j'appuis sur flèche bas ..
    player.style.top = (player.offsetTop + player.offsetHeight) + 'px'; // On retire à la position y du joueur sa hauteur
  }
  if (event.code == "ArrowRight") { // Si j'appuis sur flèche droite ..
    player.style.left = (player.offsetLeft + player.offsetWidth) + 'px'; // On ajoute à la position x du joueur sa largeur
  }
  if (event.code == "ArrowLeft") { // Si j'appuis sur flèche gauche ..
    player.style.left = (player.offsetLeft - player.offsetWidth) + 'px'; // On ajoute à la position x du joueur sa largeur
  }
}, false); // Le False est important pour lire les flèches du clavier

// Pour changer la position avec le style.top / style.left il faut que ce sois en 'px' obligatoirement
// Quand on mélange calcul et texte il faut mettre le calcul entre parenthèse
// (0 + 0) + ' = la tête à toto'
