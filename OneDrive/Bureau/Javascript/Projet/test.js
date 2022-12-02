//plateau
const plateau = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

function afficherPlateau() {
  console.table(plateau);
}
//qui joue ?
const couleur = ["R", "J"];
const hasard = Math.floor(Math.random() * couleur.length);
const joueur1 = couleur[hasard];
console.log(joueur1);
let joueur = joueur1;
console.log(joueur);

//changement de couleur
function changementCouleur() {
  joueur = joueur === "R" ? "J" : "R";
}

//avec clavier (utilisation des chiffres du haut pas du numpad)
document.addEventListener("keyup", ({ keyCode }) => {
  if (keyCode >= 49 && keyCode <= 55) {
    const indexColonne = keyCode - 49;
    deposer({ indexColonne, joueur });
  }
});

//déposer un pion
const deposer = ({ indexColonne, joueur }) => {
  for (let i = plateau.length - 1; i >= 0; i--) {
    if (plateau[i][indexColonne] === null) {
      plateau[i][indexColonne] = joueur;
      break;
    }
  }
  changementCouleur();
  afficherPlateau();
};

//colore la classe
function c() {
  var element = document.getElementById("myDIV");
  element.classList.add("mystyle");
}

//gagant?

function deposer() {
  etatJeu.cellules = [];
  etatJeu.joueur = joueur1;
  const cellule = document.getElementById(`${l}-${c}`);
  cellules.forEach((cellule) => {
    cellule.innerHTML = "";
    cellule.addEventListener("click", jouer);
    cellule.classList.remove("disabled");
  });
}

function deposer(ligne, colonne) {
  for (let l = 0; l < ligne; l++) {
    for (let c = 0; c < colonne; c++) {
      let jouerIci = document.getElementById(`${l}-${c}`);
      jouerIci.addEventListener("click", jouer);
    }
  }
}
const iconx = "😀";

const icono = "😛";

function jouer(event) {
  console.log(event.target.id);

  const id = event.target.id;

  const idinfo = id.split("-");

  const ligne = Number(idinfo[1]);

  const colonne = Number(idinfo[2]);

  console.log(colonne, ligne);

  const etatCelules = etatJeu.cellules[ligne][colonne];

  if (etatCelules !== null) return;

  const icon = etatJeu.joueur === "BLEU" ? iconx : icono;

  event.target.textContent = icon;

  etatJeu.cellules[ligne][colonne] = etatJeu.joueur;

  etatJeu.joueur = etatJeu.joueur === "BLEU" ? "ROND" : "BLEU";
}

const cellules = document.querySelectorAll(".case");

for (const cellule of cellules) {
  cellule.addEventListener("click", jouer);
}

//let bouton = document.getElementById("newGame");
//bouton.addEventListener("click", function () {
//  lancePartie();
//});

//function lancePartie() {
//etatJeu.cellules = creeTableau(ligne, colonne);
//console.table(cellules);
//deposer(ligne, colonne);
//}
