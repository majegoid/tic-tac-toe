// DOCUMENT QUERIES
const gameBoardElem = document.querySelector('.game-board');
// END DOCUMENT QUERIES

// DATA STRUCTURES
// END DATA STRUCTURES

// GLOBAL STATE
let gameBoard = ((board) => {
  let state = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  let currentTurn = 'X';

  // display the board based on the state
  function display() {}

  // place a piece
  function placePiece() {}

  // remove all pieces from the board
  function reset() {}

  // determine if the game has ended
  function gameEnd() {}

  return {
    reset,
    placePiece,
  };
})(gameBoardElem);
// END GLOBAL STATE

// SET UP DOM
// END SET UP DOM

// DOM MANIPULATION FUNCTIONS
// END DOM MANIPULATION FUNCTIONS

(function main() {})();
