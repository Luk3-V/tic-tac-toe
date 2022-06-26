const scoreOne = document.querySelector('.scoreOne');
const scoreTwo = document.querySelector('.scoreTwo');
const boardDiv = document.querySelector('.board');
const modal = document.querySelector('.modal');
const clearBtn = document.querySelector('.clearBtn');
const newBtn = document.querySelector('.newBtn');
const startBtn = document.querySelector('.startBtn');
const closeBtn = document.querySelector('.closeBtn');
const form = document.querySelector('form');

const sizeInput = document.getElementById("size");
const sizeValue = document.getElementById("sizeValue");

// ------------ OBJECTS -------------

const gameBoard = (() => {
    let board = [];
    let boardSize = 0;

    const create = (size) => {
        if(size < 3)
            return;
       
        board = new Array(size*size);
        boardSize = size;

        boardDiv.innerHTML = '';
        
        for(var i=0; i<size; i++){
            const row = document.createElement('div');
            row.classList.add('row');
            row.setAttribute('style', `height:${100/size}%;`);
            for(var j=0; j<size; j++){
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('style', `width:${100/size}%;`);
                cell.id = i*size+j;  
                cell.onclick = gameController.playCell;
                row.appendChild(cell);
            }
            boardDiv.appendChild(row);
        } 
    }

    const update = (index, player) => {
        board[index] = player;
        const cell = document.getElementById(index);
        if(player == 'X')
            cell.innerHTML = `<i class="fa-solid fa-x" style="font-size:${500/boardSize}px;"></i>`;
        else
            cell.innerHTML = `<i class="fa-solid fa-o" style="font-size:${500/boardSize}px;"></i>`;
    }

    const clear = () => {
        create(boardSize);
    }

    const getSize = () => {
        return boardSize;
    }

    const isEmpty = (index) => {
        return (board[index] == null);
    }

    const isWin = (index) => {
        const row = Math.floor(index/boardSize);
        const col = index%boardSize;
        const player = board[index];

        let horizontal = true;
        let vertical = true;
        let diagonal1 = true;
        let diagonal2 = true;

        for(let i=0; i<boardSize; i++){ // Horizontal
            if(board[i + row*boardSize] != player){
                horizontal = false;
                break;
            }   
        }
        for(let i=0; i<(boardSize*boardSize); i+=eval(boardSize)){ // Vertical
            if(board[i + col] != player){
                vertical = false;
                break;
            }
        }
        for(let i=0; i<boardSize; i++){ // Diagonal 1
            if(board[i*boardSize+i] != player){
                diagonal1 = false;
                break;
            }
        }
        for(let i=0; i<boardSize; i++){ // Diagonal 2
            if(board[i*boardSize+(boardSize-1-i)] != player){
                diagonal2 = false;
                break;
            }
        }

        return horizontal || vertical || diagonal1 || diagonal2;
    }

    return {create, update, clear, getSize, isEmpty, isWin};
})();

const gameController = (() => {
    let player1 = 0; // 'X'
    let player2 = 0; // 'O'
    let startTurn = 'X';
    let currentTurn = 'X';
    let playing = true;

    const start = (size) => {     
        player1 = 0;
        player2 = 0;
        updateScore();
        startTurn = 'X';
        setTurn('X');
        playing = true;
        gameBoard.create(size);
    }

    const clear = () => {
        if(startTurn == 'X'){
            startTurn = 'O';
            setTurn('O');
        }
        else {
            startTurn = 'X';
            setTurn('X');
        }
        playing = true;
        gameBoard.clear();
    }

    const setTurn = (player) => {
        if(player == 'X'){
            scoreTwo.setAttribute("style", "border: 1px solid darkgrey;");
            scoreOne.setAttribute("style", "border: 1px solid red; transform: scale(1.1,1.1);");  
        }
        else {      
            scoreOne.setAttribute("style", "border: 1px solid darkgrey;");
            scoreTwo.setAttribute("style", "border: 1px solid dodgerblue; transform: scale(1.1,1.1);");       
        }   
        currentTurn = player;             
    }

    const playCell = (e) => {
        if(playing && gameBoard.isEmpty(e.currentTarget.id)){
            gameBoard.update(e.currentTarget.id, currentTurn);
            if(gameBoard.isWin(e.currentTarget.id)){
                console.log('win');
                if(currentTurn == 'X')
                    player1++;
                else
                    player2++;
                updateScore();
                playing = false;
                return;
            }
            if(currentTurn == 'X')
                setTurn('O');
            else 
                setTurn('X');               
        }   
    }

    const updateScore = () =>{
        scoreOne.lastElementChild.innerHTML = player1;
        scoreTwo.lastElementChild.innerHTML = player2;
    }

    return {start, clear, playCell};
})();

// ------------ FUNCTIONS -------------

const openModal = (e) => {
    modal.style.display = "flex";
}
const closeModal = () => {
    modal.style.display = "none";
}
const startGame = (e) => {
    e.preventDefault();
    gameController.start(form.size.value);
    closeModal();
}

// ------------- EVENTS ----------------

clearBtn.onclick = gameController.clear;
newBtn.onclick = openModal;
closeBtn.onclick = closeModal;
startBtn.onclick = startGame;
  
sizeInput.oninput = () => {
    sizeValue.innerHTML = sizeInput.value;
}

// --------------- INIT ----------------

sizeValue.innerHTML = sizeInput.value;
gameController.start(3);






// TODO
// - add bot gamemode
// - add win indicator (highlight winning squares)
// - add draw indicator
// - initial start menu