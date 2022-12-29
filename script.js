// DOCUMENT QUERIES
const innerBoardElem = document.querySelector('.inner-board')
// END DOCUMENT QUERIES

// DATA STRUCTURES
// END DATA STRUCTURES

// GLOBAL STATE
let gameBoard = ((board) => {
  let state = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]

  let playerChoice = 'X'
  let currentTurn = 'X'
  let gameOver = false

  // display the board based on the state
  function refreshDisplay() {
    innerBoardElem.replaceChildren()
    for (let rowIndex = 0; rowIndex < state.length; rowIndex++) {
      let rowState = state[rowIndex]
      for (let colIndex = 0; colIndex < rowState.length; colIndex++) {
        let squareState = rowState[colIndex]
        let squareElem = document.createElement('div')
        if (squareState === 'X') {
          squareElem.classList.add('x-piece')
        }
        if (squareState === 'O') {
          squareElem.classList.add('o-piece')
        }
        board.appendChild(squareElem)
      }
    }
  }

  // place a piece
  function placePiece() {
    refreshDisplay()
  }

  // remove all pieces from the board
  function reset() {}

  // determine if the game has ended
  function gameEnd() {
    // row checks
    for (let rowIndex = 0; rowIndex < state.length; rowIndex++) {
      let row = state[rowIndex]
      if (row.every((val) => val === 'X') || row.every((val) => val === 'O')) {
        gameOver = true
        return
      }
    }
    // column checks

    // diagonal checks
  }

  return {
    reset,
    placePiece,
  }
})(innerBoardElem)
// END GLOBAL STATE

// SET UP DOM
// END SET UP DOM

// DOM MANIPULATION FUNCTIONS
// END DOM MANIPULATION FUNCTIONS

;(function main() {})()
