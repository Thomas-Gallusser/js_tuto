var audio = new Audio('explosion.wav'); // Je charge UNE SEULE FOIS mon son

function lancer_le_son() { // Je créer une fonction pour le lancer
  audio.cloneNode(true).play(); // .cloneNode(true) permet de pouvoir le lancer plusieurs fois en même temps (plusieurs bombes par exemple)
}
