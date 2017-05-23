import merge from 'lodash/merge'
import {
  CLICK_TILE,
  FOOTBALL,
  FOOTBALL_START_COL,
  FOOTBALL_START_ROW,
  HEIGHT,
  PLAYER_ONE,
  PLAYER_TWO,
  WIDTH,
} from '../../actions/game_actions'
import { handleTileClick } from '../../util/game_logic'

const ballColIdx = FOOTBALL_START_COL - 1
const ballRowIdx = FOOTBALL_START_ROW - 1
const defaultTileState = {
  disabled: false,
  piece: null,
  player: null,
}
const tiles = []

for (let rowIdx = 0; rowIdx < HEIGHT; rowIdx++) {
  tiles[rowIdx] = []
  for (let colIdx = 0; colIdx < WIDTH; colIdx++) {
    if (rowIdx === ballRowIdx && colIdx === ballColIdx) {
      tiles[rowIdx][colIdx] = {
        disabled: false,
        piece: FOOTBALL,
        player: null,
      }
    } else {
      tiles[rowIdx][colIdx] = merge({}, defaultTileState)
    }
  }
}

const initialState = {
  ballColIdx,
  ballRowIdx,
  isBallSelected: false,
  player: PLAYER_ONE,
  points: {
    [PLAYER_ONE]: 0,
    [PLAYER_TWO]: 0,
  },
  tiles,
}

const GameReducer = (state = initialState, action) => {
  switch(action.type) {
    case CLICK_TILE:
      return handleTileClick(state, action)
    default:
      return state
  }
}

export default GameReducer
