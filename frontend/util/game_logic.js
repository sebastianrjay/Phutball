import assign from 'lodash/assign'
import { FOOTBALL, MAN, PLAYER_ONE, PLAYER_TWO } from '../actions/game_actions'
import { tryColumnJump, tryDiagonalJump, tryRowJump } from './moves'

const makeJumpIfValid = (newGameState, action) => {
  const { colIdx, rowIdx } = action
  const { ballColIdx, ballRowIdx } = newGameState
  const checkIndices = { ballColIdx, ballRowIdx, colIdx, rowIdx }

  // Ensure new tile is empty
  if (newGameState.tiles[rowIdx][colIdx].piece !== null) return false

  if (ballRowIdx === rowIdx && ballColIdx === colIdx) {
    return false
  } else if (ballRowIdx === rowIdx) {
    return tryColumnJump(newGameState, checkIndices)
  } else if (ballColIdx === colIdx) {
    return tryRowJump(newGameState, checkIndices)
  } else return tryDiagonalJump(newGameState, checkIndices)
}

const moveFootball = (newGameState, action) => {
  const { colIdx, rowIdx } = action
  const { ballColIdx, ballRowIdx } = newGameState

  newGameState.tiles[ballRowIdx][ballColIdx].piece = null
  newGameState.tiles[ballRowIdx][ballColIdx].player = null
  newGameState.tiles[rowIdx][colIdx].piece = FOOTBALL
  newGameState.ballColIdx = colIdx
  newGameState.ballRowIdx = rowIdx
  newGameState.isBallSelected = false

  return newGameState
}

const placeNewMan = (newGameState, action) => {
  const { colIdx, rowIdx } = action
  const newPlayer = newGameState.player === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE
  const newTileState = assign({}, previousTileState, { piece: MAN })
  const previousTileState = newGameState.tiles[rowIdx][colIdx]

  newGameState.player = newPlayer
  newGameState.tiles[rowIdx][colIdx] = newTileState

  return newGameState
}

const toggleBallSelection = (newGameState, action) => {
  const { colIdx, rowIdx } = action
  newGameState.isBallSelected = !newGameState.isBallSelected
  const previousTileState = newGameState.tiles[rowIdx][colIdx]
  const newTileState = assign({}, previousTileState)
  if (previousTileState.player) {
    newTileState.player = null
  } else {
    newTileState.player = newGameState.player
  }

  newGameState.tiles[rowIdx][colIdx] = newTileState

  return newGameState
}

export const handleTileClick = (state, action) => {
  const newGameState = assign({}, state)

  switch (action.piece) {
    case FOOTBALL:
      return toggleBallSelection(newGameState, action)
    case MAN:
      // Man deletion not yet built
      return state
    case null:
      if (!state.isBallSelected) {
        return placeNewMan(newGameState, action)
      } else {
        if (makeJumpIfValid(newGameState, action)) {
          return moveFootball(newGameState, action)
        } else return state
      }
    default:
      return state
  }
}
