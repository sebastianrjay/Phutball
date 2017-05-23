import merge from 'lodash/merge'
import {
  FOOTBALL,
  FOOTBALL_START_COL,
  FOOTBALL_START_ROW,
  HEIGHT,
  NO_PIECE,
  PLAYER_ONE,
  PLAYER_TWO,
  WIDTH,
} from '../../actions/game_actions'

const ballColIdx = FOOTBALL_START_COL - 1
const ballRowIdx = FOOTBALL_START_ROW - 1
const defaultTileState = {
  disabled: false,
  piece: NO_PIECE,
  player: PLAYER_ONE,
}
const tiles = []

for (let rowIdx = 0; rowIdx < HEIGHT; rowIdx++) {
  tiles[rowIdx] = []
  for (let colIdx = 0; colIdx < WIDTH; colIdx++) {
    if (rowIdx === ballRowIdx && colIdx === ballColIdx) {
      tiles[rowIdx][colIdx] = merge({}, defaultTileState, { piece: FOOTBALL })
    } else {
      tiles[rowIdx][colIdx] = merge({}, defaultTileState)
    }
  }
}

const InitialState = {
  ballColIdx,
  ballRowIdx,
  isBallSelected: false,
  justMovedBall: false,
  player: PLAYER_ONE,
  points: {
    [PLAYER_ONE]: 0,
    [PLAYER_TWO]: 0,
  },
  tiles,
}

export default InitialState
