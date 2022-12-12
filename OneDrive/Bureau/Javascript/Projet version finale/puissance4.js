//choix des colonnes et des lignes
let colonne = eval(window.prompt('Nombre de colonnes'));
let ligne = eval(window.prompt('Nombre de lignes'));
let autrePartie = document.querySelector('#table');

//qui joue en premier ?
const couleur = ['R', 'J'];
const hasard = Math.floor(Math.random() * couleur.length);
const joueur1 = couleur[hasard];
console.log(joueur1);
let joueur = joueur1; //celui qui joue en premier, let => car on alterne les tours donc ça change
console.log(joueur);

//pions
const colorRed = 'red';
const colorYellow = 'yellow';

//message
const gagner = document.querySelector('.gagnant');
const score = document.querySelector('.score');
let scoreJ = 0;
let scoreR = 0;
score.textContent = `J : ${scoreJ}-${scoreR} : R`;
let quiJoue = document.querySelector('.quiJoue');

//tableau pour l'etat du jeu au fur et à mesure de la partie
const etatJeu = {
    cellules: [],
    joueur: joueur1,
};
//fonction gagnant?

//Vérif ligne
function gagnantLigne(l, c, table, joueur) {
    let count = 0;
    for (let i = 0; i <= table[l].length - 1; i++) {
        if (table[l][i] == joueur) {
            count += 1;
        } else {
            count = 0;
        }
        if (count >= 4) {
            return true;
        }
    }
    return false;
}

//Vérif colonne
function gagnantColonne(l, c, table, joueur) {
    let count = 0;
    for (let i = 0; i <= table.length - 1; i++) {
        if (table[i][c] == joueur) {
            count += 1;
        } else {
            count = 0;
        }
        if (count >= 4) {
            return true;
        }
    }
    return false;
}

function gagnant(l, c, table, joueur) {
    return gagnantLigne(l, c, table, joueur) || gagnantColonne(l, c, table, joueur);
}

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
        let lignes = document.createElement('tr');
        //lignes.id = "L" + l;
        for (let c = 0; c < colonne; c++) {
            etatJeu.cellules = [l][c];
            let colonnes = document.createElement('td');
            colonnes.id = `${l}-${c}`;
            lignes.appendChild(colonnes);
        }
        document.querySelector('table').appendChild(lignes);
    }
    return tableau;
}

etatJeu.cellules = creeTableau(ligne, colonne);
window.alert(`c'est au joueur ${joueur} de commencer`); //permet de dire qui commence

const cellules = document.querySelectorAll('td');
for (const cellule of cellules) {
    cellule.addEventListener('click', jouer); //appel de la fonction jouer quand on click sur une cellule de la table html
}

//deposer un pion dans la cellule sur laquelle on a cliquer
function jouer(event) {
    const id = event.target.getAttribute('id');
    console.log(id);
    const coord = id.split('-');
    console.log(coord);
    console.log(coord[1]);
    const colonne = parseInt(coord[1]);
    console.log(colonne);
    console.table(etatJeu.cellules);

    //condition de gravité imposée
    for (let l = etatJeu.cellules.length - 1; l >= 0; l--) {
        if (etatJeu.cellules[l][colonne] === null) {
            etatJeu.cellules[l][colonne] = etatJeu.joueur;
            if (etatJeu.joueur === 'R') {
                document.getElementById(`${l}-${colonne}`).style.background = colorRed; //ajout d'une couleur en guise de pion

                //window.alert(`c'est au joueur ${joueur} de commencer`);
            } else {
                document.getElementById(`${l}-${colonne}`).style.background = colorYellow; //ajout d'une couleur en guise de pion
            }

            console.table(etatJeu.cellules);

            //ganant?
            console.log(joueur);
            gagnant(l, colonne, etatJeu.cellules, etatJeu.joueur);
            console.log(joueur);

            console.log(gagnant(l, colonne, etatJeu.cellules, etatJeu.joueur));
            if (gagnant(l, colonne, etatJeu.cellules, etatJeu.joueur) === true) {
                gagner.textContent = `Bravo ${etatJeu.joueur} a gagné ! `;
                if (etatJeu.joueur == 'R') {
                    scoreR = scoreR + 1;
                } else if (etatJeu.joueur == 'J') {
                    scoreJ = scoreJ + 1;
                }
                score.textContent = `J : ${scoreJ}-${scoreR} : R`;
            } else if (etatJeu.joueur == 'R') {
                //alternance entre les joueurs
                etatJeu.joueur = 'J';
            } else if (etatJeu.joueur == 'J') {
                etatJeu.joueur = 'R';
            }
            quiJoue.textContent = `c'est au tour du joueur ${etatJeu.joueur}`;
            break;
        }
    }
}

function newGame() {
    etatJeu.cellules = [];
    const couleur = ['R', 'J'];
    const hasard = Math.floor(Math.random() * couleur.length);
    const joueur1 = couleur[hasard];
    console.log(joueur1);
    let joueur = joueur1; //celui qui joue en premier, let => car on alterne les tours donc ça change
    console.log(joueur);
    let enleverTableau = document.querySelector('table');
    enleverTableau.remove();
    let tableau2 = document.createElement('table');
    autrePartie.appendChild(tableau2);
    let colonne = eval(window.prompt('Nombre de colonnes'));
    let ligne = eval(window.prompt('Nombre de lignes'));
    etatJeu.cellules = creeTableau(ligne, colonne);
    const cellules = document.querySelectorAll('td');
    for (const cellule of cellules) {
        cellule.addEventListener('click', jouer); //appel de la fonction jouer quand on click sur une cellule de la table html
    }
}

const buttonNewGame = document.querySelector('#newGame');
buttonNewGame.addEventListener('click', newGame);
