import omit from 'lodash/omit'
import { ADD_MESSAGE, RESET_MESSAGES } from '../../actions/message_actions'

const MessagesReducer = (state = [], action) => {
  switch(action.type) {
    case ADD_MESSAGE:
      const newMessage = omit(action, 'type')
      return state.concat(newMessage)
    case RESET_MESSAGES:
      return []
    default:
      return state
  }
}

export default MessagesReducer
