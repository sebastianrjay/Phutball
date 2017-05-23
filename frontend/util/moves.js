import max from 'lodash/max'
import min from 'lodash/min'
import { MAN } from '../actions/game_actions'

export const allValidMoves = (newGameState) => {
  const allMoves = []

  newGameState.tiles.forEach((row, rowIdx) => {
    row.forEach((tile, colIdx) => {
      if (tryJump(newGameState, { colIdx, rowIdx }, false)) {
        allMoves.push({ colIdx, rowIdx })
      }
    })
  })

  return allMoves
}

export const showNextMovesIfExistent = (newGameState, nextMoves) => {
  if (nextMoves.length > 0) {
    _setTilesDisabled(newGameState, true)
    nextMoves.forEach(({ colIdx, rowIdx }) => {
      newGameState.tiles[rowIdx][colIdx].disabled = false
    })
  } else {
    _setTilesDisabled(newGameState, false)
  }
}

export const tryJump = (newGameState, { colIdx, rowIdx }, movePiece = true) => {
  const { ballColIdx, ballRowIdx } = newGameState
  const colJumpMagnitude = Math.abs(colIdx - ballColIdx)
  const rowJumpMagnitude = Math.abs(rowIdx - ballRowIdx)
  const indices = { ballColIdx, ballRowIdx, colIdx, rowIdx }
  const isMoveTooSmall = colJumpMagnitude <= 1 && rowJumpMagnitude <= 1

  // Ensure new tile is empty
  if (newGameState.tiles[rowIdx][colIdx].piece !== null) return false
  if (isMoveTooSmall) return false
  
  if (ballRowIdx === rowIdx) {
    return _tryColumnJump(newGameState, indices, movePiece)
  } else if (ballColIdx === colIdx) {
    return _tryRowJump(newGameState, indices, movePiece)
  } else {
    if (colJumpMagnitude === rowJumpMagnitude) {
      return _tryDiagonalJump(newGameState, indices, movePiece)
    } else return false
  }
}

const _setTilesDisabled = (newGameState, disabled) => {
  newGameState.tiles.forEach((row, rowIdx) => {
    row.forEach((tile, colIdx) => {
      newGameState.tiles[rowIdx][colIdx].disabled = disabled
    })
  })
}

const _tryColumnJump = (newGameState, indices, movePiece = true) => {
  const { ballColIdx, colIdx, rowIdx } = indices
  const maxColIdx = max([ballColIdx, colIdx])
  const minColIdx = min([ballColIdx, colIdx])

  for (let idx = minColIdx + 1; idx < maxColIdx; idx++) {
    const hasMan = newGameState.tiles[rowIdx][idx].piece === MAN
    if (!hasMan) return false
  }
  
  if (movePiece) {
    for (let idx = minColIdx + 1; idx < maxColIdx; idx++) {
      newGameState.tiles[rowIdx][idx].piece = null
    }
  }
  
  return true
}

const _tryDiagonalJump = (newGameState, indices, movePiece = true) => {
  const { ballColIdx, ballRowIdx, colIdx, rowIdx} = indices
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

  if (movePiece) {
    col = eval(`ballColIdx ${colOperator} 1`)
    row = eval(`ballRowIdx ${rowOperator} 1`)

    while (eval(`col ${colComparator} colIdx`) &&
        eval(`row ${rowComparator} rowIdx`)) {
      newGameState.tiles[row][col].piece = null
      eval(`col${colOperator}${colOperator}`)
      eval(`row${rowOperator}${rowOperator}`)
    }
  }

  return true
}

const _tryRowJump = (newGameState, indices, movePiece = true) => {
  const { ballRowIdx, colIdx, rowIdx } = indices
  const maxRowIdx = max([ballRowIdx, rowIdx])
  const minRowIdx = min([ballRowIdx, rowIdx])

  for (let idx = minRowIdx + 1; idx < maxRowIdx; idx++) {
    const hasMan = newGameState.tiles[idx][colIdx].piece === MAN
    if (!hasMan) return false
  }

  if (movePiece) {
    for (let idx = minRowIdx + 1; idx < maxRowIdx; idx++) {
      newGameState.tiles[idx][colIdx].piece = null
    }
  }

  return true
}
