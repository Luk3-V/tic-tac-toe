const boardDiv = document.querySelector('.board');
const modal = document.querySelector('.modal');
const resetBtn = document.querySelector('.resetBtn');
const newBtn = document.querySelector('.newBtn');
const startBtn = document.querySelector('.startBtn');
const closeBtn = document.querySelector('.closeBtn');

const sizeInput = document.getElementById("size");
const sizeValue = document.getElementById("sizeValue");

const Player = (name, symbol) => {
    let _name = name;
    let _symbol = symbol;
    let _score = 0;

    const getName = () => {
        return _name;
    }
    const getSymbol = () => {
        return _symbol;
    }
    const getScore = () => {
        return _score;
    }
    const addPoint = () => {
        _score++;
    }

    return {getName, getSymbol, getScore, addPoint};
}

const gameBoard = (() => {
    let matrix = [];
    let matrixSize = 0;

    const create = (size) => {
        if(size < 3)
            return;
       
        matrix = [];
        matrixSize = size;

        boardDiv.innerHTML = '';
        
        for(var i=0; i<size; i++){
            matrix[i] = new Array(size);
            const row = document.createElement('div');
            row.classList.add('row');
            row.setAttribute('style', `height:${100/size}%;`);
            for(var j=0; j<size; j++){
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('style', `width:${100/size}%;`);
                cell.id = j+i*size;  
                row.appendChild(cell);
            }
            boardDiv.appendChild(row);
        }
    }

    const update = (x, y, player) => {
        matrix[x][y] = player;
        const cell = document.getElementById(x+y*matrixSize);
        cell.innerHTML = player;
    }

    const reset = () => {
        create(matrixSize);
    }

    return {create, update, reset};
})();

const gameController = (() => {
    const start = () => {
        console.log('start');
        gameBoard.create(3);
    }

    const reset = () => {
        console.log('reset');
        gameBoard.reset();
    }

    return {start, reset};
})();

// -------------------------------------

const openModal = (e) => {
    modal.style.display = "flex";
}
const closeModal = () => {
    modal.style.display = "none";
}
const startGame = (e) => {
    gameController.start();
}


// ------------- EVENTS ----------------

resetBtn.onclick = gameController.reset;
newBtn.onclick = openModal;
closeBtn.onclick = closeModal;
startBtn.onclick = startGame;
  
sizeInput.oninput = () => {
    sizeValue.innerHTML = sizeInput.value;
}

// --------------- INIT ----------------

sizeValue.innerHTML = sizeInput.value;
gameController.start();

// gameboard object
// - set size X
// - reset X
// - update X
// - display X
// - store positions X

// player object
// - x or o X
// - win counter X

// game controller
// - start
// - track turns
// - track moves, prevent illegal moves
// - detect win, update score, and reset game