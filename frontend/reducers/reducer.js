import { combineReducers } from 'redux';

import GameReducer from './game/reducer'
import MessagesReducer from './messages/reducer'

const RootReducer = combineReducers({
  game: GameReducer,
  messages: MessagesReducer,
});

export default RootReducer;

