import React from 'react'
import { connect } from 'react-redux'
import { clickTile } from '../../actions/game_actions'
import kebabCase from 'lodash/kebabCase'

const charCode = {
  FOOTBALL: 9675,
  MAN: 9679,
}

const Tile = ({ colIdx, disabled, handleClick, piece, player, rowIdx }) => (
  <td
    className={`${disabled ? 'disabled ' : ''}${kebabCase(player)}`}
    onClick={handleClick({ colIdx, disabled, piece, player, rowIdx })}
  >
    { piece ? String.fromCharCode(charCode[piece]) : "\u00a0\u00a0" }
  </td>
)

const mapStateToProps = (state, ownProps) => {
  return state.game.tiles[ownProps.rowIdx][ownProps.colIdx]
}

const mapDispatchToProps = (dispatch) => ({
  handleClick: (props) => (e) => {
    if (!props.disabled) return dispatch(clickTile(props))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tile)
