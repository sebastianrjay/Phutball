import pick from 'lodash/pick'
import React from 'react'
import { connect } from 'react-redux'
import Game from './pages/game'
import Messages from './partials/messages'

const AppContainer = (props) => (
  <div id="app">
    <Messages/>
    <section className="row">
      <div className="col-md-2"></div>
      <div className="col-md-8">
        <Game/>
      </div>
      <div className="col-md-2"></div>
    </section>
  </div>
)

const mapStateToProps = (state, _ownProps) => pick(state, ['game', 'messages'])

export default connect(mapStateToProps)(AppContainer)
