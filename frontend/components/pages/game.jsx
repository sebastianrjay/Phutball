import map from 'lodash/map'
import range from 'lodash/range'
import remove from 'lodash/remove'
import React from 'react'
import { connect } from 'react-redux'
import TileRow from '../partials/tile_row'

const CHAR_CODES = range('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1)
const ALPHABET = map(CHAR_CODES, charCode => String.fromCharCode(charCode))

const Game = ({ isBallSelected, player, selectedColIdx, selectedRowIdx, tiles }) => (
  <section id="board" className="row">
    <div className="col-md-12">
      <div className="table-responsive">
        <table className="table table-bordered" cellPadding="0" cellSpacing="0">
          <tr>
            <th></th>
            { tiles[0].map((tile, tileIdx) => <th>{ALPHABET[tileIdx]}</th>) }
          </tr>
          {
            tiles.map(
              (row, rowIdx) => (
                <TileRow key={rowIdx} row={row} rowIdx={rowIdx} />
              )
            )
          }
        </table>
      </div>
    </div>
  </section>
)

const mapStateToProps = (state, _ownProps) => state.game

export default connect(mapStateToProps)(Game)
