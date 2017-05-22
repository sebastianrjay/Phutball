import assign from 'lodash/assign'
import { FOOTBALL, MAN, PLAYER_ONE, PLAYER_TWO } from '../actions/game_actions'

const isValidMove = (newGameState, action) => {
  const { colIdx, rowIdx } = action
  const { ballRowIdx, ballColIdx } = newGameState

  
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
        // Jump over men and move ball
        return state
      }
    default:
      return state
  }
}
