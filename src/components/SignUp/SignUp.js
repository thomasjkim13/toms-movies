import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import out singUp and signIn axios calls
import { signUp, signIn } from '../../api/auth'

// import all of the messages for this application
import messages from '../AutoDismissAlert/messages'

// import a Form and Button from bootstrap, so our forms look better
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor (props) {
    super(props)

    // keep track of the email, password, and passwordConfirmation. Initially start
    // as empty strings until they have been typed in.
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
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

  onSignUp = event => {
    event.preventDefault()

    // destructure the props
    // msgAlert and setUser are being passed down from App.js
    // history - comes from withRouter at the bottom of the file
    const { msgAlert, history, setUser } = this.props

    // make a sign up axios request, pass it the email, password, and passwordConfirmation
    signUp(this.state)
    // if we could sign up successfully, then try to signIn with the same email and password
      .then(() => signIn(this.state))
      // if we signed in successfully, set the user to the user we got back in the response's data
      .then(res => setUser(res.data.user))
      // show a successful signUp message
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        // the message will be green becuase variant is 'success'
        variant: 'success'
      }))
      // the history object controls your browser history
      // if you push '/', then it will send you the home page
      // this is similar to a Redirect (<Redirect to ='/'>)
      .then(() => history.push('/'))
      // if signing up fails
      .catch(error => {
        // clear the form's state, by resetting it to its initial values
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    // destructure our state, so it is easier to use
    const { email, password, passwordConfirmation } = this.state

    return (
      // add a bootstrap row and different column szes, so the sign up form is responsvie on different sized pages.
      <div className="row">
        {/*
          * mt-5 sets the `top` `margin` to be large (5)
          * mx-auto sets the x margins (left & rgith) automatically. this centers the div horizontally, because the left and right margin are the same.
        */}
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign Up</h3>
          {/* When the sign up form is submitted, run the `onSignUp` function */}
          <Form onSubmit={this.onSignUp}>
            {/* A form group, groups a from label, control (input), and optional help text */}
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              {/* This is similar to an input in the `react-crud` lesson. But since we are using react bootstrap, we use a Form.Control instead */}
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
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            {/* This is a bootstrap Button. This is prettier than a normal button */}
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

// use the `withRouter` function to give our `SignUp` component access to the
// `route props` (match, history, and location)
export default withRouter(SignUp)
// export default SignUp
