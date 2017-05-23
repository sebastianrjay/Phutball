import { combineReducers } from 'redux'

import GameReducer from './game/reducer'
import MessagesReducer from './messages/reducer'

const reducer = combineReducers({
  game: GameReducer,
  messages: MessagesReducer,
})

export default reducer
