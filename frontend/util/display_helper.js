import {
  FOOTBALL,
  NO_PIECE,
  PLAYER_ONE,
  PLAYER_TWO,
} from '../actions/game_actions'
import { tryJump } from './moves'

export const allValidMoves = (gameState) => {
  const allMoves = []

  gameState.tiles.forEach((row, rowIdx) => {
    row.forEach((tile, colIdx) => {
      if (tryJump(gameState, { colIdx, rowIdx }, false)) {
        allMoves.push({ colIdx, rowIdx })
      }
    })
  })

  return allMoves
}

export const moveFootball = (gameState, action) => {
  const { colIdx, rowIdx } = action
  const { ballColIdx, ballRowIdx } = gameState

  gameState.tiles[ballRowIdx][ballColIdx].piece = NO_PIECE
  gameState.tiles[ballRowIdx][ballColIdx].player = null
  gameState.tiles[ballRowIdx][ballColIdx].selected = false
  gameState.tiles[rowIdx][colIdx].piece = FOOTBALL
  gameState.ballColIdx = colIdx
  gameState.ballRowIdx = rowIdx
}

export const setBallPlayer = (gameState, action, nextMoves) => {
  const { colIdx, rowIdx } = action
  const { ballColIdx, ballRowIdx } = gameState
  const currentPlayer = gameState.tiles[ballRowIdx][ballColIdx].player

  if (nextMoves.length === 0) {
    gameState.isBallSelected = false
    gameState.justMovedBall = false
    setNextPlayer(gameState, currentPlayer)
  } else {
    gameState.tiles[rowIdx][colIdx].player = currentPlayer
    gameState.tiles[rowIdx][colIdx].selected = true
    gameState.justMovedBall = true
  }
}

export const setNextPlayer = (gameState, currentPlayer = gameState.player) => {
  const nextPlayer = gameState.player === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE
  gameState.player = nextPlayer

  gameState.tiles.forEach((tileRow, rowIdx) => {
    tileRow.forEach((tile, colIdx) => {
      gameState.tiles[rowIdx][colIdx].player = nextPlayer
    })
  })
}

export const setTilesDisabled = (gameState, disabled) => {
  gameState.tiles.forEach((row, rowIdx) => {
    row.forEach((tile, colIdx) => {
      if (!(gameState.ballRowIdx === rowIdx &&
          gameState.ballColIdx === colIdx)) {
        gameState.tiles[rowIdx][colIdx].disabled = disabled
      }
    })
  })
}

export const showNextMovesIfExistent = (gameState, nextMoves) => {
  if (nextMoves.length > 0) {
    setTilesDisabled(gameState, true)
    nextMoves.forEach(({ colIdx, rowIdx }) => {
      gameState.tiles[rowIdx][colIdx].disabled = false
    })
  } else {
    setTilesDisabled(gameState, false)
  }
}

export const toggleBallSelection = (gameState, action) => {
  const { colIdx, rowIdx } = action
  if (gameState.isBallSelected) {
    if (!gameState.justMovedBall) setTilesDisabled(gameState, false)
    gameState.tiles[rowIdx][colIdx].player = null
  } else {
    gameState.tiles[rowIdx][colIdx].player = gameState.player
  }

  gameState.isBallSelected = !gameState.isBallSelected
}
