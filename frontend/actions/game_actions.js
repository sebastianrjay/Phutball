// CONSTANTS

// Board
export const CLICK_TILE = 'CLICK_TILE'
export const FOOTBALL_START_COL = 8
export const FOOTBALL_START_ROW = 10
export const HEIGHT = 19
export const WIDTH = 15
export const PLAYER_ONE_GOAL_ROW = 0
export const PLAYER_TWO_GOAL_ROW = HEIGHT - 1

// Pieces
export const FOOTBALL = 'FOOTBALL'
export const MAN = 'MAN'
export const NO_PIECE = 'NO_PIECE'

// Players
export const PLAYER_ONE = 'PLAYER_ONE'
export const PLAYER_TWO = 'PLAYER_TWO'

// ACTION CREATORS

// Board

export const clickTile = ({ colIdx, disabled, piece, player, rowIdx }) => ({
  type: CLICK_TILE,
  colIdx,
  disabled,
  piece,
  player,
  rowIdx,
})
