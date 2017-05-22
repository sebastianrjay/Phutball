import max from 'lodash/max'
import min from 'lodash/min'
import { MAN } from '../actions/game_actions'

export const tryColumnJump = (newGameState, checkIndices) => {
  const { ballColIdx, colIdx, rowIdx } = checkIndices
  const maxColIdx = max([ballColIdx, colIdx])
  const minColIdx = min([ballColIdx, colIdx])

  for (let idx = minColIdx + 1; idx < maxColIdx; idx++) {
    const hasMan = newGameState.tiles[rowIdx][idx].piece === MAN
    if (!hasMan) return false
  }
  
  for (let idx = minColIdx + 1; idx < maxColIdx; idx++) {
    newGameState.tiles[rowIdx][idx].piece = null
  }
  
  return true
}

export const tryDiagonalJump = (newGameState, checkIndices) => {
  const { ballColIdx, ballRowIdx, colIdx, rowIdx} = checkIndices
  const colComparator = colIdx > ballColIdx ? '<' : '>'
  const colOperator = colIdx > ballColIdx ? '+' : '-'
  const rowComparator = rowIdx > ballRowIdx ? '<' : '>'
  const rowOperator = rowIdx > ballRowIdx ? '+' : '-'
  let col = eval(`ballColIdx ${colOperator} 1`)
  let row = eval(`ballRowIdx ${rowOperator} 1`)

  while (eval(`col ${colComparator} colIdx`) &&
      eval(`row ${rowComparator} rowIdx`)) {

    if (newGameState.tiles[row][col].piece !== MAN) return false
    eval(`col${colOperator}${colOperator}`)
    eval(`row${rowOperator}${rowOperator}`)
  }

  col = eval(`ballColIdx ${colOperator} 1`)
  row = eval(`ballRowIdx ${rowOperator} 1`)

  while (eval(`col ${colComparator} colIdx`) &&
      eval(`row ${rowComparator} rowIdx`)) {
    newGameState.tiles[row][col].piece = null
    eval(`col${colOperator}${colOperator}`)
    eval(`row${rowOperator}${rowOperator}`)
  }

  return true
}

export const tryRowJump = (newGameState, checkIndices) => {
  const { ballRowIdx, colIdx, rowIdx } = checkIndices
  const maxRowIdx = max([ballRowIdx, rowIdx])
  const minRowIdx = min([ballRowIdx, rowIdx])

  for (let idx = minRowIdx + 1; idx < maxRowIdx; idx++) {
    const hasMan = newGameState.tiles[idx][colIdx].piece === MAN
    if (!hasMan) return false
  }

  for (let idx = minRowIdx + 1; idx < maxRowIdx; idx++) {
    newGameState.tiles[idx][colIdx].piece = null
  }

  return true
}
