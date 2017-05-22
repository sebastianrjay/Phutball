// https://en.wikipedia.org/wiki/Phutball

// Constants

// Board
// My version places pieces on squares instead of vertices, and assumes a board 
// with 19 x 15 squares instead of 19 x 15 vertices.
export const CLICK_TILE = 'CLICK_TILE'
export const FOOTBALL_START_COL = 8
export const FOOTBALL_START_ROW = 10
export const HEIGHT = 19
export const WIDTH = 15

// Pieces
export const FOOTBALL = 'FOOTBALL'
export const MAN = 'MAN'

// Players
export const PLAYER_ONE = 'PLAYER_ONE'
export const PLAYER_TWO = 'PLAYER_TWO'

// Action Creators

// Board

export const clickTile = ({ colIdx, disabled, piece, player, rowIdx }) => {
  if (disabled) {
    return {}
  } else {
    return {
      type: CLICK_TILE,
      colIdx,
      disabled,
      piece,
      player,
      rowIdx,
    }
  }
}