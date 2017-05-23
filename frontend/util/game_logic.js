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
  moveFootball,
  setBallPlayer,
  setNextPlayer,
  setTilesDisabled,
  showNextMovesIfExistent,
  toggleBallSelection,
} from './display_helper'
import { tryJump } from './moves'

const moveFootballAndShowNextMoves = (gameState, action) => {
  moveFootball(gameState, action)
  const nextMoves = allValidMoves(gameState)
  showNextMovesIfExistent(gameState, nextMoves)
  setBallPlayer(gameState, action, nextMoves)

  return gameState
}

const placeNewMan = (gameState, action) => {
  const { colIdx, rowIdx } = action
  gameState.tiles[rowIdx][colIdx].piece = MAN
  setNextPlayer(gameState)

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
