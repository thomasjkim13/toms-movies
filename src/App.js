// Import React (since our JSX is converted to React.createElement calls)
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

// from the uuid (universal unique id) package
// import the fourth version of uuid, and call it `uuid` (as uuid)
import { v4 as uuid } from 'uuid'

// Import our components
// Since our components are in folders with the same name, the folder name and
// component name end up in the path
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import MovieIndex from './components/MovieIndex/MovieIndex'
import MovieCreate from './components/MovieCreate/MovieCreate'
import MovieShow from './components/MovieShow/MovieShow'
import MovieUpdate from './components/MovieUpdate/MovieUpdate'

class App extends Component {
  // Add a constructor to initialize state for our App
  // Best practice: Accepts props and calls super with props, so that
  // this.props is set in the constrcutor
  constructor (props) {
    super(props)

    // Initially we won't have a user until they have been signed in, so the user
    // starts as null.
    // Also, we want to keep track of any message alerts we show the user. Initially this
    // will be empty.
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  // set the user state to the passed in user
  setUser = user => this.setState({ user })

  // reset the user state back to null (signing out our user)
  clearUser = () => this.setState({ user: null })

  // the deleteAlert function removes the msgAlert with the given id
  deleteAlert = (id) => {
    // Update the msgAlerts state
    this.setState((state) => {
      // set the msgAlerts state, to be all of the msgAlerts currently in state
      // but without any msgAlert whose id matches the id we passed in a parameter
      // We filter for any message whose id is not the id we are trying to delete
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  // msgAlert will show a new message alert
  // it accepts a heading for the alert, the alert's body (message), and the
  // bootstrap variant to style the alert (primary, secondary, danger, info, etc...)
  msgAlert = ({ heading, message, variant }) => {
    // Create a unique id for this message
    const id = uuid()

    // Update the msgAlerts state
    this.setState((state) => {
      // set the msgAlerts state to be a new array ([])
      // with all of the msgAlerts from the current state (...state.msgAlerts)
      // and a new message alert object using the heading, message, variant, and id provided
      // ({ heading, message, variant, id })
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    // destructure (extract) the msgAlerts and user state
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        {/* This header is the top navigation bar with our links
            We pass the Header the user, so it can display the user's email.
            Also, so we can display the correct links. */}
        <Header user={user} />
        {/* Take each message alert and map it into an AutoDismissAlert element */}
        {msgAlerts.map(msgAlert => (
          // An AutoDismissAlert shows a message (alert) and then automatically disappears
          <AutoDismissAlert
            /* React uses the key to identify the element when it is inserted,
              updated, or removed */
            key={msgAlert.id}

            /* The msgAlert needs the heading, variant, and message to show for the alert */
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}

            /* The msgAlert needs the msgAlert's id and deleteAlert functions to
               remove the msgAlert after 5 seconds */
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          {/* Use a normal Route component so we can see SignUp whenever we aren't logged in */}
          <Route path='/sign-up' render={() => (
            // Pass the SignUp component the `msgAlert` so it can tell us if we
            // signed up successfully or not.
            // We also pass the setUser function so we can be automatically signed in
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          {/* Same as SignUp, but the path changes to /sign-in and the component changes to SignIn */}
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          {/* An AuthenticatedRoute is used the same way as a normal route
            except it has a `user` prop we must pass it. The AuthenticatedRoute
            will show if the user is not null. If the user is null, it will redirect
            to the home page */}
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            // SignOut needs a msgAlert to notify us when we sign out
            // it wants a clearUser prop, to reset the user after signing out
            // it wants a user prop, so it can use the user's token to make an authenticated request
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            // Similar to SignOut, but the path is /change-password, the component is ChangePassword,
            // and ChangePassword does not need the clearUser prop
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          {/* Get all movies | index */}
          <AuthenticatedRoute user={user} exact path='/movies' render={() => (
            <MovieIndex msgAlert={this.msgAlert} user={user} />
          )} />

          {/* Create a movie */}
          <AuthenticatedRoute user={user} path='/create-movie' render={() => (
            <MovieCreate msgAlert={this.msgAlert} user={user} />
          )} />

          {/* Get a single movie | show */}
          <AuthenticatedRoute user={user} exact path='/movies/:id' render={() => (
            <MovieShow msgAlert={this.msgAlert} user={user} />
          )} />

          {/* Update a single movie */}
          <AuthenticatedRoute user={user} path='/movies/:id/edit' render={() => (
            <MovieUpdate msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
