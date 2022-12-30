const innerBoardElem = document.querySelector('.inner-board');

const gameBoard = ((board) => {
  let state = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  function getState() {
    let stateCopy = [];
    for (const row of state) {
      let rowCopy = [];
      for (const val of row) {
        rowCopy.push(val);
      }
      stateCopy.push(rowCopy);
    }
    return stateCopy;
  }

  // place a piece
  function placePiece(row, col, piece) {
    let piecePlaced = false;
    if (
      typeof +row === 'number' &&
      !Number.isNaN(+row) &&
      typeof +col === 'number' &&
      !Number.isNaN(+col)
    ) {
      if (state[row][col] !== 'X' && state[row][col] !== 'O') {
        state[row][col] = piece;
        piecePlaced = true;
      }
    }
    refreshDisplay();
    return piecePlaced;
  }

  // display the board based on the state
  function refreshDisplay() {
    board.replaceChildren();
    for (let rowIndex = 0; rowIndex < state.length; rowIndex++) {
      let rowState = state[rowIndex];
      for (let colIndex = 0; colIndex < rowState.length; colIndex++) {
        let squareState = rowState[colIndex];
        let squareElem = document.createElement('div');
        squareElem.setAttribute('data-row', rowIndex);
        squareElem.setAttribute('data-col', colIndex);
        if (squareState === 'X') {
          squareElem.classList.add('x-piece');
        }
        if (squareState === 'O') {
          squareElem.classList.add('o-piece');
        }
        board.appendChild(squareElem);
      }
    }
  }

  // remove all pieces from the board
  function reset() {
    state = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    refreshDisplay();
  }

  return { getState, refreshDisplay, placePiece, reset };
})(innerBoardElem);

const gameStateController = ((gameBoard) => {
  let winningPlayer = null;
  let gameOver = false;
  let players = [];
  let currentPlayer;

  function startNewGame() {
    players = [playerFactory('X', 'Player'), playerFactory('O', 'Computer')];
    currentPlayer = players[0];
  }

  function toggleCurrentPlayer() {
    if (currentPlayer === players[0]) {
      currentPlayer = players[1];
    } else {
      currentPlayer = players[0];
    }
  }

  function getCurrentPlayerPiece() {
    return currentPlayer.piece;
  }

  function checkIfPlayerWon(playerPiece) {
    const gameBoardState = gameBoard.getState();

    for (let i = 0; i < gameBoardState.length; i++) {
      let row = gameBoardState[i];
      let column = gameBoardState.map((row) => row[i]);
      // row checks
      if (row.every((val) => val === playerPiece)) {
        console.log(`row #${i} check is met`);
        winningPlayer = currentPlayer;
        gameOver = true;
        return;
      }
      // column checks
      if (column.every((val) => val === playerPiece)) {
        console.log(`col #${i} check is met`);
        winningPlayer = currentPlayer;
        gameOver = true;
        return;
      }
    }
    // diagonal checks
    if (
      gameBoardState[0][0] === playerPiece &&
      gameBoardState[1][1] === playerPiece &&
      gameBoardState[2][2] === playerPiece
    ) {
      console.log(`top-left bottom-right diagonal check is met`);
      winningPlayer = currentPlayer;
      gameOver = true;
      return;
    }
    if (
      gameBoardState[2][0] === playerPiece &&
      gameBoardState[1][1] === playerPiece &&
      gameBoardState[0][2] === playerPiece
    ) {
      console.log(`top-left bottom-right diagonal check is met`);
      winningPlayer = currentPlayer;
      gameOver = true;
      return;
    }
  }

  function checkIfGameEnded() {
    for (const player of players) {
      checkIfPlayerWon(player.piece);
    }
  }

  return {
    startNewGame,
    getCurrentPlayerPiece,
    checkIfGameEnded,
    toggleCurrentPlayer,
  };
})(gameBoard);

function playerFactory(piece, name) {
  return { piece, name };
}

(function main() {
  innerBoardElem.onclick = (e) => {
    if ([...e.target.classList].includes('inner-board')) return;
    let square = e.target;
    // place the piece
    const pieceWasPlaced = gameBoard.placePiece(
      square.dataset.row,
      square.dataset.col,
      gameStateController.getCurrentPlayerPiece()
    );
    if (pieceWasPlaced) {
      // check if game ended
      gameStateController.checkIfGameEnded();
      // pass the player turn
      gameStateController.toggleCurrentPlayer();
    }
  };
  gameStateController.startNewGame();
})();
