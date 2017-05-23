import merge from 'lodash/merge'
import { CLICK_TILE } from '../../actions/game_actions'
import { handleTileClick } from '../../util/game_logic'
import InitialState from './initial_state'

const GameReducer = (state = InitialState, action) => {
  switch(action.type) {
    case CLICK_TILE:
      return handleTileClick(state, action)
    default:
      return state
  }
}

export default GameReducer
