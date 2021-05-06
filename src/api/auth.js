// import the api for our url, similar to the browser template
import apiUrl from '../apiConfig'
// import axios so we can make HTTP requests
import axios from 'axios'

// the credentials parameter has the same format as `this.state` in SignUp.js
// we want to export multiple things from this file, so we are using a "named export"
// instead of a "default export"
export const signUp = credentials => {
  return axios({
    // the method and url will both be the same as the jquery-ajax-token-auth lesson
    method: 'POST',
    url: apiUrl + '/sign-up',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

export const signIn = credentials => {
  return axios({
    // signIn has the same url and method as the jquery-ajax-token-auth lesson
    url: apiUrl + '/sign-in',
    method: 'POST',
    data: {
      credentials: {
        // the same data as `signUp` but no `passwordConfirmation`
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

// signOut needs a user for their token
export const signOut = user => {
  return axios({
    // the same url and method from the jquery-ajax-token-auth lesson
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

// the passwords parameter is `this.state` from ChangePassword. the oldPassword and
// the newPassword
export const changePassword = (passwords, user) => {
  return axios({
    // same url and method as the jquery-ajax-token-auth lesson
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      // similar to the authorization header from the jquery-ajax-token-auth lesson
      // except the `user` is a parameter, instead of coming from store.user
      'Authorization': `Token token=${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
