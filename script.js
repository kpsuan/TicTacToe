const tiles = document.querySelectorAll(".tile"); // select tile
const detailsBar = document.querySelector('#details'); //select the details bar
const resBtn = document.querySelector('#playAgainBtn'); //variable for the restart button
const win = [
    //2D array indices. //This will check all 3 consecutive cells in order to determine a win.
    //row 
    [0,1,2], //first row
    [3,4,5], //second row
    [6,7,8], //third row
    //columns
    [0,3,6], //first column
    [1,4,7], //second column
    [2,5,8], //third column
    //diagonals
    [0,4,8],
    [2,4,6],
];

//placeholder array
let placeHolder = ["", "", "", "", "", "", "", "", ""];
let currPlayer = "X";//tracks the current player
let running = false; // keeps track if game is running

startGame();

function startGame(){
    tiles.forEach(tile =>tile.addEventListener("click", tileClicked)); // calls the tileCLicked function if a tile is clicked
    resBtn.addEventListener("click", newGame); // starts a new game if the play again btn is clicked
    detailsBar.textContent = `${currPlayer}'s turn`; // update the current player 
    running = true;
}

function tileClicked(){
    const tileIndex = this.getAttribute("tileIndex"); // get the index number of the tile clicked
    //check if tile clicked is empty
    if(placeHolder[tileIndex] != "" || !running ){//if tile is not empty or game is not running 
        return; //do nothing
    }
    markTile(this, tileIndex); // calls markTile function
    checkWin(); //and check if win

}

function markTile(tile, index){
    placeHolder[index] = currPlayer; // update the placeholders
    tile.textContent = currPlayer; // marks the tile  
}

function nextTurn(){ //change player 
    currPlayer = (currPlayer == "X") ? "O" : "X"; //if current player = x, change it to O otherwise X
    detailsBar.textContent = `${currPlayer}'s turn`;
}
function checkWin(){
    let winGame = false;
   
    //iterate through all the win 2d indices conditions to check if there are no spaces  
    //and all tiles are marked of the same character
    for(let i = 0; i < win.length; i++){
        const con = win[i];
        //begin with the first row
        const tileA = placeHolder[con[0]]; 
        const tileB = placeHolder[con[1]];
        const tileC = placeHolder[con[2]];

        if(tileA == "" || tileB == "" || tileC == ""){
            continue;
        }
        if(tileA == tileB && tileB == tileC){
            winGame = true;
            break;
        }
    }

    if (winGame){
        detailsBar.textContent = `player ${currPlayer} wins`;
        running = false;
    }
    //prints out draw if all spaces are marked and no consecutive tiles have the same mark

    else if(!placeHolder.includes("")) {  // checks if the placeholder does not inclue any spaces 
        detailsBar.textContent = `It's a tie!`;
        running = false;
    }
    else{
        nextTurn();
    }
}

function newGame(){
    currPlayer = "X";
    placeHolder = ["", "", "", "", "", "", "", "", ""]; // reset to empty spaces
    detailsBar.textContent = `${currPlayer}'s turn`;
    tiles.forEach(tile => tile.textContent = ""); //update each tile to an empty space
    running = true;

}