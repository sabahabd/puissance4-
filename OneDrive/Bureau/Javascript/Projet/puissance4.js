//choix des colonnes et des lignes
let colonne = eval(window.prompt("Nombre de colonnes"));
let ligne = eval(window.prompt("Nombre de lignes"));
const pionRouge = "🔴";
const pionJaune = "🟡";
//qui joue ?
const couleur = ["R", "J"];
const hasard = Math.floor(Math.random() * couleur.length);
const joueur1 = couleur[hasard];
console.log(joueur1);
let joueur = joueur1;
console.log(joueur);

//etat du jeu
const etatJeu = {
  cellules: [],
  joueur: joueur1,
};

//let bouton = document.getElementById("newGame");
//bouton.addEventListener("click", function () {
//  lancePartie();
//});

//création tableau
function creeTableau(ligne, colonne) {
  //remplissage cellule etatJeu
  let table = new Array(ligne);
  for (let l = 0; l < ligne; l++) {
    table[l] = new Array(colonne);
    for (let c = 0; c < colonne; c++) {
      table[l][c] = null;
    }
  }
  console.table(table);

  //remplissage de la table
  for (let l = 0; l < ligne; l++) {
    let lignes = document.createElement("tr");
    //lignes.id = "L" + l;
    for (let c = 0; c < colonne; c++) {
      etatJeu.cellules = [l][c];
      let colonnes = document.createElement("td");
      colonnes.id = `${l}-${c}`;
      lignes.appendChild(colonnes);
    }
    document.querySelector(".table").appendChild(lignes);
  }
}
etatJeu.cellules = creeTableau(ligne, colonne);
console.table(etatJeu.cellules);

//function lancePartie() {
//etatJeu.cellules = creeTableau(ligne, colonne);
//console.table(cellules);
//deposer(ligne, colonne);
//}

document.addEventListener("click", jouer);
function jouer(event) {
  const id = event.target.getAttribute("id");
  const coord = id.split("-");
  //const ligne = parseInt(coord[1]);
  const colonne = parseInt(coord[2]);

  //condition de gravité imposée
  for (let l = etatJeu.cellules.length - 1; l >= 0; l--) {
    if (etatJeu.cellules[l][colonne] === null) {
      const cellules = document.querySelector(`${l}-${colonne}`);
      etatJeu.cellules[l][colonne] = etatJeu.joueur;
      cellules.textContent = etatJeu.joueur === "R" ? pionRouge : pionJaune;
      console.table(etatJeu.cellules);
    }
  }
}
