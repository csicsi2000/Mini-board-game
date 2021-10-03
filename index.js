const cellElements = document.querySelectorAll('.cell');
let firstTurn;
const firstPlayer = 'player1';
const secondPlayer = 'player2';
var Table = [[],[]];
var winner;
var moveCount = 0;


Start();
//start
function Start(){
    firstTurn = false;
    turnText();
    cellElements.forEach(cell => {
        cell.classList.remove(firstPlayer);
        cell.classList.remove(secondPlayer);
    })
    Table = [[],[]];
    moveCount = 0;
    for( var i=0; i<10; i++ ) {
        Table.push( [] );
    }

    for (var i = 0; i < 10; i++)
    {
        for (var j =  Table[i].length; j < 10; j++)
        {
            Table[i].push("empty");
        }
    }
    console.log(Table);
      
    let count = 0;
    let row = 0;
    let column = 0;
    cellElements.forEach(cell => {
        cell.addEventListener('click',handleClick, {once: true})

        cell.setAttribute("row", row);
        cell.setAttribute("column", column);

        //console.log(row +', ' + column)
        //console.log(Table[row][column])
        count++;
        column++;
        
        if(count % 10 == 0){
            row++;
            column = 0;
        }
    });
}

function handleClick(e){
    const cell = e.target;
    const currentTurn = firstTurn ? firstPlayer : secondPlayer;
    const CellRow = cell.getAttribute("row");
    const CellColumn = cell.getAttribute("column");
    Table[CellRow][CellColumn] = currentTurn;

    //console.log(Table[CellRow][CellColumn]);

    placeMark(cell,currentTurn, CellRow, CellColumn);
    //console.log("click")

    isWinning(currentTurn, CellRow, CellColumn);
}

//move
function placeMark(cell, currentTurn, x, y){
    cell.classList.add(currentTurn)
    turnText();
    Table[x][y] = currentTurn;
}

function turnText(){
    if(firstTurn){
        firstTurn = false;
        document.getElementById("textTurn").innerHTML = document.getElementById("second").value + "'s turn.";
    }
    else{
        firstTurn = true;
        document.getElementById("textTurn").innerHTML = document.getElementById("first").value + "'s turn.";
    }
}

function isInRange(x, y){
    if(x<0 || x>9 || y <0 || y>9){
        return false;
    }
    else{
        return true;
    } 
}

//is winner 
var points = 0;
function isWinning(currentP, x, y){
    x = Number(x);
    y = Number(y);
    //console.log(Table[x][y] +" "+ x + " " + y)
    moveCount++;

    //winning condition
    let n = 5;

    //check row
    for(let i = 0; i < n; i++){
        //console.log("row");

        if(!isInRange(x, y+i)){
            //console.log('out of range');
            break;
        }
        if(Table[x][y+i] != currentP){
            //console.log(currentP+ " " + Table[x][y+i]);
            break;
        }
        else{
            points++;
            
        }
    }

    for(let i = 0; i < n; i++){
        if(!isInRange(x, y-i)){
            break;
        }
        if(Table[x][y-i] != currentP){
            break;
        }
        else{
            points++;
        }
    }
    points--;
    console.log(points)

    if (points >= n){
        winner = currentP;
        winnerScreen();
        return;
    }
    console.log(points + " row final");
    points= 0;

    //check col 
    for(let i = 0; i < n; i++){
        //console.log("col");
        if(!isInRange(x+i, y)){
            break;
        }
        if(Table[x+i][y] != currentP){
            //console.log('not');
            break;
        }
        else{
            points++;
            
        }
    }
    for(let i = 0; i < n; i++){
        if(!isInRange(x-i, y)){
            break;
        }
        if(Table[x-i][y] != currentP){
            break;
        }
        else{
            points++;
        }
    }
    points--;
    if (points >= n){
        winner = currentP;
        winnerScreen();
        return;
    }
    console.log(points + " col final");
    points= 0;


    //we're on a diagonal
    for(let i = 0; i < n; i++){
        //console.log("diagonal");

        if(!isInRange(x+i, y+i)){
            break;
        }
        if(Table[x+i][y+i] != currentP){
            break;
        }else{
            points++;
        }
    }
    for(let i = 0; i < n; i++){
        if(!isInRange(x-i, y-i)){
            break;
        }
        if(Table[x-i][y-i] != currentP){
            break;
        }else{
            points++;
        }
    }
    points--;
    if (points >= n){
        winner = currentP;
        winnerScreen();
        return;
    }
    console.log(points + " diagonal final");
    points= 0;

    //check anti diag
    for(let i = 0; i < n; i++){

        if(!isInRange(x-i, y+i)){
            break;
        }
        if(Table[x-i][y+i] != currentP){
            break;
        }else{
            points++;
        }
    }
    for(let i = 0; i < n; i++){
        if(!isInRange(x+i, y-i)){
            break;
        }
        if(Table[x+i][y-i] != currentP){
            break;
        }else{
            points++;
        }
    }
    points--;
    if (points >= n){
        winner = currentP;
        winnerScreen();
        return;
    }
    console.log(points + " anti diagonal final");
    points= 0;

    //check draw
    if(moveCount == 100){
        winner = "Draw";
        winnerScreen();
    }
}

function winnerScreen(){
    console.log(winner)

    if (winner == "player1"){
        document.getElementById("gyoztesID").innerHTML = document.getElementById("first").value +" is the winner";
    } 
    else if (winner == "player2"){
        let win = String(document.getElementById("second").value) +" is the winner";
        document.getElementById("gyoztesID").innerHTML =  win;
    } else{
        document.getElementById("gyoztesID").innerHTML = "Draw";
    }
    document.getElementById("finalScreen").style.display = "flex";  
    points = 0;
}

document.getElementById("restart").addEventListener("click",() =>{
    document.getElementById("finalScreen").style.display = "none";
    Start();
})

let root = document.documentElement;
$('#first').on('input', function() {
    root.style.setProperty('--firstP', document.getElementById("first").value);
    if(firstTurn){
        document.getElementById("textTurn").innerHTML = document.getElementById("first").value + "'s turn.";
    }
    //console.log(document.getElementById("first").value)
});

$('#second').on('input', function() {
    root.style.setProperty('--secondP', document.getElementById("second").value);
    if(!firstTurn){
        document.getElementById("textTurn").innerHTML = document.getElementById("second").value + "'s turn.";
    }
});

