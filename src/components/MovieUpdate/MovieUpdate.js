import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Redirect, withRouter } from 'react-router-dom'

import { movieShow, movieUpdate } from '../../api/movies'

import MovieForm from '../MovieForm/MovieForm'

class MovieUpdate extends Component {
  constructor () {
    super()

    this.state = {
      movie: null,
      updated: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    movieShow(match.params.id, user)
      .then(res => this.setState({ movie: res.data.movie }))
      .then(() => {
        msgAlert({
          heading: 'Showing Movie Successfully',
          variant: 'success',
          message: 'You can now edit the movie.'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Showing Movie Failed',
          variant: 'danger',
          message: 'Movie is not displayed due to error: ' + err.message
        })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, match, msgAlert } = this.props
    const { movie } = this.state

    movieUpdate(match.params.id, movie, user)
      .then(res => this.setState({ updated: true }))
      .then(() => {
        msgAlert({
          heading: 'Updated Movie Successfully',
          variant: 'success',
          message: 'Movie has been updated.'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Updating Movie Failed',
          variant: 'danger',
          message: 'Movie was not updated due to error: ' + err.message
        })
      })
  }

  // same handleChange from MovieCreate
  handleChange = event => {
    this.setState({ movie: { ...this.state.movie, [event.target.name]: event.target.value } })
  }

  render () {
    const { movie, updated } = this.state

    // if we don't have a movie yet
    if (!movie) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    // if the movie is deleted
    if (updated) {
      // redirect to the movies index page
      return <Redirect to={`/movies/${this.props.match.params.id}`} />
    }

    return (
      <div>
        <h3>Edit Movie</h3>
        <MovieForm
          movie={movie}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default withRouter(MovieUpdate)
