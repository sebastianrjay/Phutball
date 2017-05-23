import max from 'lodash/max'
import min from 'lodash/min'
import { MAN, NO_PIECE } from '../actions/game_actions'

export const tryJump = (gameState, { colIdx, rowIdx }, movePiece = true) => {
  // Return true if possible; false otherwise. Move piece if movePiece is true
  const { ballColIdx, ballRowIdx } = gameState
  const colJumpMagnitude = Math.abs(colIdx - ballColIdx)
  const rowJumpMagnitude = Math.abs(rowIdx - ballRowIdx)
  const indices = { ballColIdx, ballRowIdx, colIdx, rowIdx }
  const moveIsTooSmall = colJumpMagnitude <= 1 && rowJumpMagnitude <= 1

  if (gameState.tiles[rowIdx][colIdx].piece !== NO_PIECE) return false
  if (moveIsTooSmall) return false
  
  if (ballRowIdx === rowIdx) {
    return _tryColumnJump(gameState, indices, movePiece)
  } else if (ballColIdx === colIdx) {
    return _tryRowJump(gameState, indices, movePiece)
  } else if (colJumpMagnitude === rowJumpMagnitude) {
    return _tryDiagonalJump(gameState, indices, movePiece)
  } else return false
}

const _tryColumnJump = (gameState, indices, movePiece = true) => {
  const { ballColIdx, colIdx, rowIdx } = indices
  const maxColIdx = max([ballColIdx, colIdx])
  const minColIdx = min([ballColIdx, colIdx])

  for (let idx = minColIdx + 1; idx < maxColIdx; idx++) {
    const hasMan = gameState.tiles[rowIdx][idx].piece === MAN
    if (!hasMan) return false
  }
  
  if (movePiece) {
    for (let idx = minColIdx + 1; idx < maxColIdx; idx++) {
      gameState.tiles[rowIdx][idx].piece = NO_PIECE
    }
  }
  
  return true
}

const _tryDiagonalJump = (gameState, indices, movePiece = true) => {
  const { ballColIdx, ballRowIdx, colIdx, rowIdx} = indices
  const colComparator = colIdx > ballColIdx ? '<' : '>'
  const colOperator = colIdx > ballColIdx ? '+' : '-'
  const rowComparator = rowIdx > ballRowIdx ? '<' : '>'
  const rowOperator = rowIdx > ballRowIdx ? '+' : '-'
  let col = eval(`ballColIdx ${colOperator} 1`)
  let row = eval(`ballRowIdx ${rowOperator} 1`)

  while (eval(`col ${colComparator} colIdx`) &&
      eval(`row ${rowComparator} rowIdx`)) {

    if (gameState.tiles[row][col].piece !== MAN) return false
    eval(`col${colOperator}${colOperator}`) // Increment / decrement col
    eval(`row${rowOperator}${rowOperator}`) // Increment / decrement row
  }

  if (movePiece) {
    col = eval(`ballColIdx ${colOperator} 1`)
    row = eval(`ballRowIdx ${rowOperator} 1`)

    while (eval(`col ${colComparator} colIdx`) &&
        eval(`row ${rowComparator} rowIdx`)) {
      gameState.tiles[row][col].piece = NO_PIECE
      eval(`col${colOperator}${colOperator}`) // Increment / decrement col
      eval(`row${rowOperator}${rowOperator}`) // Increment / decrement row
    }
  }

  return true
}

const _tryRowJump = (gameState, indices, movePiece = true) => {
  const { ballRowIdx, colIdx, rowIdx } = indices
  const maxRowIdx = max([ballRowIdx, rowIdx])
  const minRowIdx = min([ballRowIdx, rowIdx])

  for (let idx = minRowIdx + 1; idx < maxRowIdx; idx++) {
    const hasMan = gameState.tiles[idx][colIdx].piece === MAN
    if (!hasMan) return false
  }

  if (movePiece) {
    for (let idx = minRowIdx + 1; idx < maxRowIdx; idx++) {
      gameState.tiles[idx][colIdx].piece = NO_PIECE
    }
  }

  return true
}
