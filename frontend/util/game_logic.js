import defaultsDeep from 'lodash/defaultsDeep'
import {
  FOOTBALL,
  MAN,
  NO_PIECE,
  PLAYER_ONE,
  PLAYER_ONE_GOAL_ROW,
  PLAYER_TWO,
  PLAYER_TWO_GOAL_ROW,
} from '../actions/game_actions'
import {
  allValidMoves,
  setTilesDisabled,
  showNextMovesIfExistent,
  tryJump,
} from './moves'

const moveFootballAndShowNextMoves = (gameState, action) => {
  const { colIdx, rowIdx } = action
  const { ballColIdx, ballRowIdx } = gameState
  const currentPlayer = gameState.tiles[ballRowIdx][ballColIdx].player

  gameState.tiles[ballRowIdx][ballColIdx].piece = NO_PIECE
  gameState.tiles[ballRowIdx][ballColIdx].player = null
  gameState.tiles[rowIdx][colIdx].piece = FOOTBALL
  gameState.ballColIdx = colIdx
  gameState.ballRowIdx = rowIdx

  const nextMoves = allValidMoves(gameState)
  showNextMovesIfExistent(gameState, nextMoves)

  if (nextMoves.length === 0) {
    gameState.isBallSelected = false
    gameState.justMovedBall = false
  } else {
    gameState.tiles[rowIdx][colIdx].player = currentPlayer
    gameState.justMovedBall = true
  }

  return gameState
}

const placeNewMan = (gameState, action) => {
  const { colIdx, rowIdx } = action
  const newPlayer = gameState.player === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE

  gameState.player = newPlayer
  gameState.tiles[rowIdx][colIdx].piece = MAN

  return gameState
}

const removeMan = (gameState, action) => {
  const { colIdx, rowIdx } = action
  gameState.tiles[rowIdx][colIdx].piece = NO_PIECE
  return gameState
}

const scoreGoalIfOnGoalLine = (gameState) => {
  if (gameState.ballRowIdx === PLAYER_ONE_GOAL_ROW) {
    gameState.points[PLAYER_ONE] += 1
  } else if (gameState.ballRowIdx === PLAYER_TWO_GOAL_ROW) {
    gameState.points[PLAYER_TWO] += 1
  }
}

const toggleBallSelection = (gameState, action) => {
  const { colIdx, rowIdx } = action
  if (gameState.isBallSelected) {
    if (!gameState.justMovedBall) setTilesDisabled(gameState, false)
    gameState.tiles[rowIdx][colIdx].player = null
  } else {
    gameState.tiles[rowIdx][colIdx].player = gameState.player
  }

  gameState.isBallSelected = !gameState.isBallSelected
}

const toggleBallSelectionAndShowNextMoves = (gameState, action) => {
  const nextMoves = allValidMoves(gameState)
  showNextMovesIfExistent(gameState, nextMoves)
  toggleBallSelection(gameState, action)

  return gameState
}

export const handleTileClick = (state, action) => {
  const gameState = defaultsDeep({}, state)

  switch (action.piece) {
    case FOOTBALL:
      return toggleBallSelectionAndShowNextMoves(gameState, action)
    case MAN:
      return removeMan(gameState, action)
    case NO_PIECE:
      if (!state.isBallSelected) {
        return placeNewMan(gameState, action)
      } else {
        if (tryJump(gameState, action)) {
          moveFootballAndShowNextMoves(gameState, action)
          scoreGoalIfOnGoalLine(gameState)
          return gameState
        } else return state
      }
    default:
      return state
  }
}
