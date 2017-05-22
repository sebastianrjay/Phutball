import React from 'react'

const messageClass = {
  error: 'alert alert-danger',
  success: 'alert alert-success',
}

const Message = ({ message, messageType }) => (
  <div className={messageClass[messageType]}>{message}</div>
)

export default Message
