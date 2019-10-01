// La fonction "setTimeout" permet d'éxecuter une fonction au bout de X temps:
var retour_de_la_balise_p;


var ma_boucle = setInterval(repetition_toutes_les_2_secondes, 2000); // je créer une interval toutes les 2 secondes
function repetition_toutes_les_2_secondes(){
    retour_de_la_balise_p = document.createElement("p");
    retour_de_la_balise_p.innerHTML = 'Ce texte s\'ajoutera toutes les 2 secondes';
    document.body.appendChild(retour_de_la_balise_p);
}

// J'arrête ma boucle après 6 secondes:
setTimeout(function() {
  clearInterval(ma_boucle); // On peut arrêter un setInterval grâce à la fonction "clearInterval";
}, 6000);

// Mon texte ne s'affichera que 3 fois
