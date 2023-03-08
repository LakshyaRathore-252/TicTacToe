const boxes = document.querySelectorAll(".box");
const game_info = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let curretPlayer;
let gameGrid;


const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [0, 4, 8],
    [2, 4, 6]

]


// Let's create a function to initalise the game

function initGame() {
    curretPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // UI pr bhi empty krna pdega

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index + 1}`;
    })
    newGameBtn.classList.remove("active");
    game_info.innerText = `Current Player - ${curretPlayer}`;

}

initGame();



function swapTurn() {
    if (curretPlayer === "X") {
        curretPlayer = "O";
    }

    else {
        curretPlayer = "X";
    }

    // Ui Change
    game_info.innerText = `curretPlayer = ${curretPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //check if winner is X
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else {
                answer = "O";
            }


            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //now we know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    //it means we have a winner
    if (answer !== "") {
        game_info.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillCount++;
    });

    // Board is filled , game is TIE
    if(fillCount === 9)
    {
        game_info.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}



function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = curretPlayer;
        gameGrid[index] = curretPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

// adding event listeners
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);