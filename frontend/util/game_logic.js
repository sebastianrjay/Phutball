import assign from 'lodash/assign'
import { FOOTBALL, MAN, PLAYER_ONE, PLAYER_TWO } from '../actions/game_actions'
import {
  allValidMoves,
  showNextMovesIfExistent,
  tryJump,
} from './moves'

const moveFootballAndShowNextMoves = (newGameState, action) => {
  const { colIdx, rowIdx } = action
  const { ballColIdx, ballRowIdx } = newGameState
  const currentPlayer = newGameState.tiles[ballRowIdx][ballColIdx].player

  newGameState.tiles[ballRowIdx][ballColIdx].piece = null
  newGameState.tiles[ballRowIdx][ballColIdx].player = null
  newGameState.tiles[rowIdx][colIdx].piece = FOOTBALL
  newGameState.ballColIdx = colIdx
  newGameState.ballRowIdx = rowIdx

  const nextMoves = allValidMoves(newGameState)
  showNextMovesIfExistent(newGameState, nextMoves)

  if (nextMoves.length === 0) {
    newGameState.isBallSelected = false
  } else {
    newGameState.tiles[rowIdx][colIdx].player = currentPlayer
  }

  return newGameState
}

const placeNewMan = (newGameState, action) => {
  const { colIdx, rowIdx } = action
  const newPlayer = newGameState.player === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE

  newGameState.player = newPlayer
  newGameState.tiles[rowIdx][colIdx].piece = MAN

  return newGameState
}

const toggleBallSelection = (newGameState, action) => {
  const { colIdx, rowIdx } = action
  newGameState.isBallSelected = !newGameState.isBallSelected
  if (newGameState.tiles[rowIdx][colIdx].player) {
    newGameState.tiles[rowIdx][colIdx].player = null
  } else {
    newGameState.tiles[rowIdx][colIdx].player = newGameState.player
  }
}

const toggleBallSelectionAndShowNextMoves = (newGameState, action) => {
  const nextMoves = allValidMoves(newGameState)
  showNextMovesIfExistent(newGameState, nextMoves)
  toggleBallSelection(newGameState, action)

  return newGameState
}

export const handleTileClick = (state, action) => {
  const newGameState = assign({}, state)

  switch (action.piece) {
    case FOOTBALL:
      return toggleBallSelectionAndShowNextMoves(newGameState, action)
    case MAN:
      // Man deletion not yet built
      return state
    case null:
      if (!state.isBallSelected) {
        return placeNewMan(newGameState, action)
      } else {
        if (tryJump(newGameState, action)) {
          return moveFootballAndShowNextMoves(newGameState, action)
        } else return state
      }
    default:
      return state
  }
}
