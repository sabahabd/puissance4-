//choix des colonnes et des lignes
let colonne = eval(window.prompt("Nombre de colonnes"));
let ligne = eval(window.prompt("Nombre de lignes"));
let autrePartie = document.querySelector("#table");

//qui joue en premier ?
const couleur = ["R", "J"];
const hasard = Math.floor(Math.random() * couleur.length);
const joueur1 = couleur[hasard];
console.log(joueur1);
let joueur = joueur1; //celui qui joue en premier, let => car on alterne les tours donc ça change
console.log(joueur);

//pions
const colorRed = "red";
const colorYellow = "yellow";

//message
const gagner = document.querySelector(".gagnant");
let quiJoue = document.querySelector(".quiJoue");

//tableau pour l'etat du jeu au fur et à mesure de la partie
const etatJeu = {
  cellules: [],
  joueur: joueur1,
};

//création tableau js et table html
function creeTableau(ligne, colonne) {
  //remplissage cellule etatJeu
  let tableau = new Array(ligne);
  for (let l = 0; l < ligne; l++) {
    tableau[l] = new Array(colonne);
    for (let c = 0; c < colonne; c++) {
      tableau[l][c] = null;
    }
  }
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
    document.querySelector("table").appendChild(lignes);
  }
  return tableau;
}

etatJeu.cellules = creeTableau(ligne, colonne);
window.alert(`c'est au joueur ${joueur} de commencer`);

const cellules = document.querySelectorAll("td");
for (const cellule of cellules) {
  cellule.addEventListener("click", jouer); //appel de la fonction jouer quand on click sur une cellule de la table html
}

//deposer un pion dans la cellule sur laquelle on a cliquer
function jouer(event) {
  const id = event.target.getAttribute("id");
  console.log(id);
  const coord = id.split("-");
  console.log(coord);
  console.log(coord[1]);
  const colonne = parseInt(coord[1]);
  console.log(colonne);
  console.table(etatJeu.cellules);

  //condition de gravité imposée
  for (let l = etatJeu.cellules.length - 1; l >= 0; l--) {
    if (etatJeu.cellules[l][colonne] === null) {
      etatJeu.cellules[l][colonne] = etatJeu.joueur;
      if (etatJeu.joueur === "R") {
        document.getElementById(`${l}-${colonne}`).style.background = colorRed; //ajout d'une couleur en guise de pion

        //window.alert(`c'est au joueur ${joueur} de commencer`);
      } else {
        document.getElementById(`${l}-${colonne}`).style.background =
          colorYellow; //ajout d'une couleur en guise de pion
      }
      etatJeu.joueur = etatJeu.joueur === "R" ? "J" : "R"; //alternance entre les joueurs
      quiJoue.textContent = `c'est au tour du joueur ${etatJeu.joueur}`;

      console.table(etatJeu.cellules);

      //ganant?
      const vainqueur = gagant(l, colonne, etatJeu.cellules);
      if (vainqueur !== null) {
        gagner.textContent = (vainqueur, "a gagné !");
      } else {
        etatJeu.joueur = etatJeu.joueur === "R" ? "J" : "R";
      }
      break;
    }
  }
}

//fonction gagnant?

function gagant(ligne, colonne, tableau) {
  //horizontal
  for (ligne = ligne; ligne < tableau.length; ligne++) {
    for (colonne = colonne; colonne < tableau.length; colonne++) {
      if (
        (etatJeu.cellules[ligne][colonne] === etatJeu.joueur &&
          etatJeu.cellules[ligne + 1][colonne] === etatJeu.joueur &&
          etatJeu.cellules[ligne + 2][colonne] === etatJeu.joueur &&
          etatJeu.cellules[ligne + 3][colonne] === etatJeu.joueur) ||
        (etatJeu.cellules[ligne][colonne] === etatJeu.joueur &&
          etatJeu.cellules[ligne][colonne - 1] === etatJeu.joueur &&
          etatJeu.cellules[ligne][colonne - 2] === etatJeu.joueur &&
          etatJeu.cellules[ligne][colonne - 3] === etatJeu.joueur)
      ) {
        return etatJeu.joueur;
      }
    }
  }

  //vertical
  if (
    tableau.length - 4 < ligne <= 0 &&
    etatJeu.cellules[ligne][colonne] === etatJeu.joueur &&
    etatJeu.cellules[ligne + 1][colonne] === etatJeu.joueur &&
    etatJeu.cellules[ligne + 2][colonne] === etatJeu.joueur &&
    etatJeu.cellules[ligne + 3][colonne] === etatJeu.joueur
  ) {
    return etatJeu.joueur;
  }

  //diagonale
  if (
    (tableau.length - 4 < ligne <= 0 &&
      etatJeu.cellules[ligne][colonne] === etatJeu.joueur &&
      etatJeu.cellules[ligne + 1][colonne + 1] === etatJeu.joueur &&
      etatJeu.cellules[ligne + 2][colonne + 2] === etatJeu.joueur &&
      etatJeu.cellules[ligne + 3][colonne + 3] === etatJeu.joueur) ||
    (tableau.length - 4 < ligne <= 0 &&
      etatJeu.cellules[ligne][colonne] === etatJeu.joueur &&
      etatJeu.cellules[ligne - 1][colonne - 1] === etatJeu.joueur &&
      etatJeu.cellules[ligne - 2][colonne - 2] === etatJeu.joueur &&
      etatJeu.cellules[ligne - 3][colonne - 3] === etatJeu.joueur)
  ) {
    return etatJeu.joueur;
  }
  if (
    (tableau.length - 4 < ligne <= 0 &&
      etatJeu.cellules[ligne][colonne] === etatJeu.joueur &&
      etatJeu.cellules[ligne + 1][colonne - 1] === etatJeu.joueur &&
      etatJeu.cellules[ligne + 2][colonne - 2] === etatJeu.joueur &&
      etatJeu.cellules[ligne + 3][colonne - 3] === etatJeu.joueur) ||
    (tableau.length - 4 < ligne <= 0 &&
      etatJeu.cellules[ligne][colonne] === etatJeu.joueur &&
      etatJeu.cellules[ligne + 1][colonne - 1] === etatJeu.joueur &&
      etatJeu.cellules[ligne + 2][colonne - 2] === etatJeu.joueur &&
      etatJeu.cellules[ligne + 3][colonne - 3] === etatJeu.joueur)
  ) {
    return etatJeu.joueur;
  }
}

function reset() {
  etatJeu.cellules = [];
  const couleur = ["R", "J"];
  const hasard = Math.floor(Math.random() * couleur.length);
  const joueur1 = couleur[hasard];
  console.log(joueur1);
  let joueur = joueur1; //celui qui joue en premier, let => car on alterne les tours donc ça change
  console.log(joueur);
  let enleverTableau = document.querySelector("table");
  enleverTableau.remove();
  let tableau2 = document.createElement("table");
  autrePartie.appendChild(tableau2);
  let colonne = eval(window.prompt("Nombre de colonnes"));
  let ligne = eval(window.prompt("Nombre de lignes"));
  etatJeu.cellules = creeTableau(ligne, colonne);
  const cellules = document.querySelectorAll("td");
  for (const cellule of cellules) {
    cellule.addEventListener("click", jouer); //appel de la fonction jouer quand on click sur une cellule de la table html
  }
}

const buttonReset = document.querySelector("#newGame");
buttonReset.addEventListener("click", reset);
