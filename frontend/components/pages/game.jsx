import map from 'lodash/map'
import range from 'lodash/range'
import React from 'react'
import { connect } from 'react-redux'
import { PLAYER_ONE, PLAYER_TWO } from '../../actions/game_actions'
import TileRow from '../partials/tile_row'

const CHAR_CODES = range('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1)
const ALPHABET = map(CHAR_CODES, charCode => String.fromCharCode(charCode))

const Game = ({ player, points, tiles }) => (
  <section id="game" className="row">
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-4"/>
        <div className="col-md-4 score-chart">
          <h2>Phutball</h2>
          <br/>
          <h4>Score</h4>
          <p><span className="player-one">Player X:</span> { points[PLAYER_ONE] }</p>
          <p><span className="player-two">Player O:</span> { points[PLAYER_TWO] }</p>
        </div>
        <div className="col-md-4"/>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-bordered" cellPadding="0" cellSpacing="0">
              <thead>
                <tr>
                  <th></th>
                  {
                    tiles[0].map((tile, tileIdx) => {
                      return (<th key={tileIdx}>{ALPHABET[tileIdx]}</th>)
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {
                  tiles.map(
                    (row, rowIdx) => (
                      <TileRow key={rowIdx} row={row} rowIdx={rowIdx} />
                    )
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const mapStateToProps = (state, _ownProps) => state.game

export default connect(mapStateToProps)(Game)
