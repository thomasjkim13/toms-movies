// Import Fragment, which is similar to a div, by grouping multiple elements, but
// does not show up in the dom
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

// import the fourth version (v4) of the universally unique id package. Store this
// function with the variable name `uuid` (as uuid)
import { v4 as uuid } from 'uuid'

// Importing our auth components
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'

// These components will have routes to interact with them
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // keep track of the user. while initially null, the user will be set when
      // signing in
      user: null,
      // keep track of the message alerts we want to show the user. these are the
      // messages at the bottom of the screen
      msgAlerts: []
    }
  }

  // a method to set the `user` state, to whatever `user` we pass this method
  // we will set the user when signing in
  setUser = user => this.setState({ user })

  // this method, resets the `user` state to its original value of `null`
  // we will clear the user when signing out
  clearUser = () => this.setState({ user: null })

  // delete the message alert with the id passed in
  deleteAlert = (id) => {
    this.setState((state) => {
      // set the `msgAlerts` state, to the existing msgAlerts state (state.msgAlerts)
      // but filter out any message alert, whose id we are trying to delete
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  // shows a new message alert, by adding a message alert object to the `msgAlerts` array
  // heading - the title/heading of the message to show the user
  // message - the body of the message (the actual content)
  // variant - the bootstrap color variant to use (primary, success, danger, etc...)
  msgAlert = ({ heading, message, variant }) => {
    // create an id for our message alert, so we can stop showing it after 5 seconds
    const id = uuid()
    // update the `msgAlerts` state, to include a new message alert object using the
    // heading, message, variant, and id
    this.setState((state) => {
      // typically, if we wanted to add a new message alert, we would use `push`
      // in React though, we should never update state directly. So using `push`
      // is not a good way to add something to our array.
      // state.msgAlerts.push({ heading, message, variant, id })
      // return { msgAlerts: state.msgAlerts }

      // this does not modify state directly. it sets the `msgAlerts` state to
      // a new array that includes the previous msg alerts (...state.msgAlerts)
      // AND include a new message alert at the end ({ heading, message, variant, id })
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    // destructuring our state
    const { msgAlerts, user } = this.state

    return (
      // We want to render multiple elements, so we wrap them in a Fragment
      <Fragment>
        {/* This is our navigation bar at the top of the page. we pass down the `user` so we can show their email address and show different links if they are signed in or not. */}
        <Header user={user} />
        {/* Turn each message alert, into an AutoDismissAlert component. To show
            the user a message */}
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          {/* We want the SignUp and SignIn components to be visible when the user
              is not logged in. So we use a normal Route */}
          <Route path='/sign-up' render={() => (
            // Pass the `msgAlert` prop, to tell users if they signed up successfully or not
            // Pass the setUser prop, to automatically sign in after signing up
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          {/* When using an AuthenticatedRoute we **must** make sure to pass it the `user`.
              If the `user` is null, the AuthenticatRoute, will send us to the home page. */}
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          {/* we use an AuthentacatedRoute so the user has to be signed in to change the password */}
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            /* we pass down the `user` prop, so we have the user's `token` when making our change password request */
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
