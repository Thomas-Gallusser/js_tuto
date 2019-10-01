// La fonction "setTimeout" permet d'éxecuter une fonction au bout de X temps:
var retour_de_la_balise_p;

setTimeout(function() { // début de la fonction de mon setTimeout
  retour_de_la_balise_p = document.createElement("p");
  retour_de_la_balise_p.innerHTML = 'Ce texte s\'affichera au bout de 2 secondes';
  document.body.appendChild(retour_de_la_balise_p);
}, 2000); // fermeture de ma fonction avec en seconde paramètre un temps en milliseconde (1000 = 1 seconde)


// Il est également possible de le faire plusieurs fois
setTimeout(function() {
  retour_de_la_balise_p = document.createElement("p");
  retour_de_la_balise_p.innerHTML = 'Ce texte s\'affichera au bout de 3 secondes';
  document.body.appendChild(retour_de_la_balise_p);

  // Je relance ma fonction setTimeout dans ma fonction setTimeout !
  setTimeout(function() {
    retour_de_la_balise_p = document.createElement("p");
    retour_de_la_balise_p.innerHTML = 'Ce texte s\'affichera au bout de 4 secondes';
    document.body.appendChild(retour_de_la_balise_p);
  }, 1000); // Ma deuxième fonction setTimeout sera lancer 1 secondes après la précédente, 3 + 1 = 4 secondes
}, 3000);
