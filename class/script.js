// Une classe permet de proprement créer un objet comme un des ennemies ou encore des bombes ou des murs,
// On peut l'instancier aussi souvent que l'on veut avec les paramètres que l'ont veut.
// Elle peut contenir plusieurs fonctions, dans l'exemple il n'y en aura qu'une.

class ma_class { // On choisis le nom qu'on veut
  // La variable constructor permettra d'initier "ma_class" avec 2 paramètres qui seront ici "variable1" et "variable2"
  constructor(variable1, variable2) {
    this.variable_de_ma_class = variable1; // Les variables "variable1" et "variable2" ne sont accessible que dans la fonction constructor
    this.ce_que_je_veux = variable2; // On créer donc des variables pour la class entière grâce à "this" qui permet de visé la class.
  }

  une_fonction_de_ma_class() {
    var nouvelle_balise_p = document.createElement("p"); // je créer une nouvelle balise p
    nouvelle_balise_p.innerHTML = 'Coucou ! Tu as entrée comme valeur: <span class="red">' + this.variable_de_ma_class + '</span> et <span class="red">' + this.ce_que_je_veux + '</span>';
    // Grâce à "innerHTML" je remplie le texte, il existe aussi "innerText" mais cette fonction écrit le HTML et ne l'execute pas
    document.body.appendChild(nouvelle_balise_p); // j'ajouter au body ma nouvelle balise p
  }
}

var mes_class = []; // Je créer un tableau vide
mes_class.push(new ma_class("blabla","orange")); // Push sert à ajouter a la fin du tableau quelque chose
mes_class.push(new ma_class("super variable","ceci est un texte")); //  ici on ajoute 2 instances de class avec 2 entrées différentes

// Maintenant j'appelle ma fonction "une_fonction_de_ma_class"
mes_class[0].une_fonction_de_ma_class(); // Je récupère le prémier élément (le 0) du tableau
mes_class[1].une_fonction_de_ma_class(); // Je récupère le deuxième élément (le 1) du tableau

// Les class sont super utile dans le cas où doit continuer à executer du code,
// Comme pour une animation d'explosion, un ennemie qui va bouger etc ..
