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

//gagant?
