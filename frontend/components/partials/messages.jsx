import React from 'react'
import { connect } from 'react-redux'
import pick from 'lodash/pick'
import Message from './message'

const Messages = ({ messages }) => (
  <section id="messages-container" className="row">
    <div className="col-md-3"></div>
    <div className="col-md-6">
      { messages.map((message, idx) => <Message key={idx} {...message} />) }
    </div>
    <div className="col-md-3"></div>
  </section>
)

const mapStateToProps = (state, _ownProps) => pick(state, 'messages')

export default connect(mapStateToProps)(Messages)
