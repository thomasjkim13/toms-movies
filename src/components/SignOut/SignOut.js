import { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import the signOut axios request
import { signOut } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

class SignOut extends Component {
  // this function will be run when this Component is
  // mounted (created and inserted into the dom)
  componentDidMount () {
    // history comes from withRouter, the other props come from App
    const { msgAlert, history, clearUser, user } = this.props

    // make a signOut axios request, pass the user for their token
    signOut(user)
      // whether the signOut succeeded (.then) or whether it failed (.catch)
      // tell the user we signed out successfully
      .finally(() => msgAlert({
        heading: 'Signed Out Successfully',
        message: messages.signOutSuccess,
        variant: 'success'
      }))
      .finally(() => history.push('/'))
      // resets the user back to `null` our initial state when we aren't signed in
      .finally(() => clearUser())
  }

  // We never want to show the SignOut component. We want to be
  // signed out and redirected if anyone goes to /sign-out
  //
  // So we return a falsy value (''), so nothing is shown on the screen
  render () {
    return ''
  }
}

export default withRouter(SignOut)
