import React from 'react'

// import the bootstrap Alert component
import Alert from 'react-bootstrap/Alert'

// import some custom styling for the AutoDismissAlert component
import './AutoDismissAlert.scss'

class AutoDismissAlert extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // add state to keep track of whether to `show` the message alert or not
      show: true
    }
    this.timeoutId = null
  }

  // start the timer to hide the component whenever the component is mounted
  // (create an component and insert it into the dom)
  componentDidMount () {
    // call the `handleClose` method after `5000` milliseconds (5 seconds)
    // we store the `timeoutId`, so we can cancel the timer if the component is unmounted
    this.timeoutId = setTimeout(this.handleClose, 5000)
  }

  // this function runs whenever your component is being unmounted (removed from the dom)
  componentWillUnmount () {
    // we want to clear our timer so `this.handleClose` does not run.
    // that could cause an error, because a component which doesn't exist anymore is
    // trying to edit its previous state...
    clearTimeout(this.timeoutId)
  }

  // handleClose sets the `show` state to be false so we don't show the component anymore
  handleClose = () => this.setState({ show: false })

  render () {
    // destructure our props
    const { variant, heading, message, deleteAlert, id } = this.props

    // Delete this alert after the fade animation time (300 ms by default)
    if (!this.state.show) {
      setTimeout(() => {
        deleteAlert(id)
      }, 300)
    }

    return (
      <Alert
        // adds an "x" so users can cancel the alert
        dismissible
        // whether the Alert should be visible
        show={this.state.show}
        // the color of the alert
        variant={variant}
        // what to do when the alert is closed (set show to false)
        onClose={this.handleClose}
      >
        <div className="container">
          {/* Used for the alert's title */}
          <Alert.Heading>
            {heading}
          </Alert.Heading>
          <p className="alert-body">{message}</p>
        </div>
      </Alert>
    )
  }
}

export default AutoDismissAlert
