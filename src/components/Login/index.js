import './index.css'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    error: '',
  }

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, error: errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-div">
        <div className="login-subDiv">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <form onSubmit={this.submitForm}>
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              id="username"
              className="input"
              placeholder="Username"
              onChange={this.onChangeName}
            />

            <br />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              id="password"
              className="input"
              placeholder="Password"
              onChange={this.onChangePassword}
            />
            <br />
            <button type="submit" className="button">
              Login
            </button>
            {showSubmitError && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
