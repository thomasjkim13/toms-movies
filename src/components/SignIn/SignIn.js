// import react and the component function
import React, { Component } from 'react'
// import withRouter to pass information
import { withRouter } from 'react-router-dom'

// import out signIn axios calls
import { signIn } from '../../api/auth'
// import all of the messages for this application
import messages from '../AutoDismissAlert/messages'

// import a Form and Button from bootstrap, so our forms look better
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignIn extends Component {
  constructor (props) {
    super(props)

    // keep track of the email, password. Initially start as empty strings until they have been typed in.
    this.state = {
      email: '',
      password: ''
    }
  }

  // when an input changes, update the state, so that the input's new value (event.target.value)
  // is stored in this.state. The new value will be stored at the input's name (event.target.name)
  handleChange = event => {
    // this.setState({
    //   [event.target.name]: event.target.value
    // })

    // create our new state change (how we will update state)
    const stateChange = {}
    // set the property that has the name of the input, to its new value
    stateChange[event.target.name] = event.target.value
    // update our state
    this.setState(stateChange)
  }

  onSignIn = event => {
    event.preventDefault()

    // destructure the props
    // msgAlert and setUser are being passed down from App.js
    // history - comes from withRouter at the bottom of the file
    const { msgAlert, history, setUser } = this.props

    // make a sign in axios request, pass it the email and password
    signIn(this.state)
      // if we signed in successfully, set the user to the user we got back in the response's data
      .then(res => setUser(res.data.user))
      // show a successful signIn message
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        // the message will be green because variant is `success`
        variant: 'success'
      }))
      // the history object controls your browser history
      // if you push '/', then it will send you the home page
      // this is similar to a Redirect (<Redirect to ='/'>)
      .then(() => history.push('/'))
      // If signing in fails
      .catch(error => {
        // clear the form's state, by resetting it to its initial values
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          // the message will be red because variant is `danger`
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign In</h3>
          <Form onSubmit={this.onSignIn}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn)
