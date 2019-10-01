// Nous allons animer le sprite de la bombe ce trouvant dans le fichier (bombe.png)
// Le fichier fait 16 de hauteur et 48 de large (3 x 16)
// L'utilisation de sprite en une seule image est parfait pour le javascript car on ne charge qu'une seule fois l'image
// Avec un changement de backgroundImage l'image clignote au changement, alors que là non !

var nouvelle_div = document.createElement("div"); // Nous allons créer une nouvelle div
nouvelle_div.style.width = "16px"; // J'attribue une taille de 16 x 16
nouvelle_div.style.height = "16px";
nouvelle_div.style.backgroundImage = "url('bombe.png')"; // Je mets en fond l'image de la bombe
nouvelle_div.style.backgroundPosition = '0px 0px'; // je veux afficher le premier sprite qui commence en 0x0 et fini en 16x16
document.body.appendChild(nouvelle_div);

var grande_div = document.createElement("div");
grande_div.style.width = "100px"; // J'attribue une taille de 100 x 100
grande_div.style.height = "100px";
grande_div.style.backgroundSize = "cover"; // Pour pouvoir modifier la taille du sprite on le passe en cover
grande_div.style.backgroundImage = "url('bombe.png')";
grande_div.style.backgroundPosition = '0px 0px';
document.body.appendChild(grande_div);

setTimeout(function() { // Premier setTimeout (0,7s)
  nouvelle_div.style.backgroundPosition = '-16px 0px'; // Il suffit simplement d'afficher la position à afficher, ici on affiche de 16x0 à 32x16
  grande_div.style.backgroundPosition = '-100px 0px'; // Il faut prendre en compte le changement de taille !
  setTimeout(function() { // Deuxième setTimeout (1,4s)
    nouvelle_div.style.backgroundPosition = '-32px 0px'; // Et on continue ! Le mieux est d'avoir des variables pour automatiser !
    grande_div.style.backgroundPosition = '-200px 0px';
  }, 700);
}, 700);

// Il faut imaginer qu'on est tout en haut à gauche de l'image,
// Vers la droite on par dans le négatif, à gauche positif
// Il faut donc retirer la largeur/hauteur de l'image à chaque affichage de sprite
