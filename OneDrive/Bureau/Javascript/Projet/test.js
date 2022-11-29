//demande à l'utilisateur le nombre de lignes et de colonnes
function ask_user(){
    var line =  prompt("Nombre de lignes", 0);
    var column = prompt("Nombre de colonnes", 0);
    var array = []
    array.push(line, column)
    return array
}

//dessine le carte de jeu automatiquement.
function draw_map(lines, column){
    var board = document.getElementById("board") //recuperer la div avec id = board
    var newtable = document.createElement("table"); // creer la balise table
    for( var i=0; i<lines;i++){ // i =  nombre de ligne
        var newTr = document.createElement("tr"); // creer la balise tr
        for (var j=0; j<column;j++) { // j = nombre de colonne
            var newTd = document.createElement("td"); //creer la balise td
            //newTd.classList.add("wall");
            newTd.setAttribute("id",i+(j*10)); //ajoute un id a chaque cellule pour l'identifier
            newTr.appendChild(newTd); //ajoute les td dans tr
        }
        newtable.appendChild(newTr); // ajoute tr dans la table
    }
    board.appendChild(newtable); //ajoute la table dans la div board
}

// fonction qui appelle dans l'ordre toutes les fonctions pour le deroulement du jeu
function game(){
    var initialisation = ask_user()
    draw_map(initialisation[0],initialisation[1])
}

game()
