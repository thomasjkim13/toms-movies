import React, { Fragment } from 'react'
// Import our Navbar component from react bootstrap
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

// the links to show when we are signed in
const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#movies">Movies</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

// the links to show when we are not signed in
const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

// The links we always see
const alwaysOptions = (
  <Fragment>
    {/* Add a bootstrap link to the home route `/` */}
    <Nav.Link href="#/">Home</Nav.Link>
  </Fragment>
)

// the header accepts a user prop
const Header = ({ user }) => (
  // bg is the bootstrap variant to set the background color
  // expand is which breakpoint to collapse the navbar at
  // variant=dark, means our background color is dark, so use white text/links
  <Navbar bg="primary" variant="dark" expand="md">
    {/* Your website application's title in the navbar */}
    <Navbar.Brand href="#">
      ides movies
    </Navbar.Brand>
    {/* This is the hamburger menu, that toggles whether we see our links or not */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    {/* The Collapse component contains the links which we will need to click on
        the toggle button to show on smaller screens. */}
    <Navbar.Collapse id="basic-navbar-nav">
      {/* This groups our links together.
          ml-auto sets the left margin to automatically take up the available space
          ml-auto ends up pushing the links to the right side of the screen. */}
      <Nav className="ml-auto">
        {/* If we have a user, then render this span component.
            mr-2 adds a little margin to the right, to push it away from the links. */}
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        {/* This is a longer way to write the above code */}
        {/* user ? <span className="navbar-text mr-2">Welcome, {user.email}</span> : null */}
        {/* Always show the following links */}
        { alwaysOptions }
        {/* If we are signed in, show the authenticatedOptions links otherwise show
            the unauthenticatedOptions links */}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
