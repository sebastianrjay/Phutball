import pick from 'lodash/pick'
import React from 'react'
import { connect } from 'react-redux'
import { HEIGHT } from '../../actions/game_actions'
import Tile from './tile'

const TileRow = ({ row, rowIdx }) => (
  <tr>
    <th>{HEIGHT - rowIdx}</th>
    {
      row.map(
        (tile, colIdx) => (
          <Tile key={colIdx} colIdx={colIdx} rowIdx={rowIdx} {...tile} />
        )
      )
    }
  </tr>
)

export default TileRow
