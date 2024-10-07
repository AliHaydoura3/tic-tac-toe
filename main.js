const players = (function () {
  let player1 = "";
  let player2 = "";
  
  return { player1, player2 };
}) ();

const gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
  
  const updateBoard = (index, firstPlayerTurn) => {
    board[index] = firstPlayerTurn ? "X" : "O";
  };
  
  const restartBoard = () => {
    for (let i = 0; i < 9; i++) {
      board[i] = "";
    }
  };
  
  const triEq = (a, b, c) => {
    return a !== "" && a === b && b === c;
  };
  
  const checkWin = () => {
    return triEq(board[0], board[1], board[2]) || triEq(board[3], board[4], board[5]) || triEq(board[6], board[7], board[8]) || triEq(board[0], board[3], board[6]) || triEq(board[1], board[4], board[7]) || triEq(board[2], board[5], board[8]) || triEq(board[0], board[4], board[8]) || triEq(board[2], board[4], board[6]);
  };
  
  const checkTie = () => {
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        return false;
      }
    }
    return true;
  };
  
  return { board, updateBoard, restartBoard, checkWin, checkTie };
}) ();

const game = (function () {
  let firstPlayerTurn = true;
  let result = "";
  
  const gameover = (turn) => {
    if (gameboard.checkWin()) {
      return `${turn ? players.player2 : players.player1} has won!`;
    } else if (gameboard.checkTie()) {
      return "It's a tie!";
    }
    return false;
  };
  
  return { firstPlayerTurn, result, gameover };
}) ();

const display = (function () {
  const body = document.querySelector("body");
  const startPage = document.getElementById("start");
  const startButton = document.getElementById("submit-start");
  const gamePage = document.getElementById("game");
  const endPage = document.getElementById("end");
  const restartButton = document.getElementById("restart");
  
  gamePage.remove();
  endPage.remove();
  
  startButton.addEventListener("click", (event) => {
    event.preventDefault();
    const player1Input = document.getElementById("first-player");
    const player2Input = document.getElementById("second-player");
    players.player1 = player1Input.value;
    players.player2 = player2Input.value;
    startPage.remove();
    body.appendChild(gamePage);
    displayBoard();
  });
  
  restartButton.addEventListener("click", (event) => {
    event.preventDefault();
    endPage.remove();
    body.appendChild(startPage);
    gameboard.restartBoard();
  });
  
  const displayBoard = () => {
    const displayedBoard = document.getElementById("board");
    const turnSpan = document.getElementById("turn");
    
    displayedBoard.innerHTML = "";
    turnSpan.innerText = game.firstPlayerTurn ? players.player1 : players.player2;
    
    let result = game.gameover(game.firstPlayerTurn);
  
    if (result) {
      gamePage.remove();
      body.appendChild(endPage);
      const resultElement = document.getElementById("result");
      resultElement.innerText = result;
    }
  
    gameboard.board.forEach((string, index) => {
      const square = document.createElement("div");
      square.innerText = gameboard.board[index];
      
      if (string === "") {
        square.addEventListener("click", () => {
          gameboard.updateBoard(index, game.firstPlayerTurn);
           game.firstPlayerTurn = !game.firstPlayerTurn;
          displayBoard();
        });
      }
      
      displayedBoard.appendChild(square);
    });
  };
  
  return { displayBoard };
}) ();

