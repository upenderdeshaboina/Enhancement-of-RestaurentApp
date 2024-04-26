import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onLoginSuccessFul = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
  }

  onLoginFailure = error => {
    this.setState({errorMsg: error})
  }

  onSubmittingLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userCredentials = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onLoginSuccessFul(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwt = Cookies.get('jwt_token')
    if (jwt !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-login-container">
        <form onSubmit={this.onSubmittingLogin} className="form">
          <h1 className="login-heading">Login</h1>
          <div className="input-container">
            <label htmlFor="username">USERNAME</label>
            <input
              id="username"
              value={username}
              type="text"
              onChange={this.onChangeUserName}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              value={password}
              type="password"
              onChange={this.onChangePassword}
            />
          </div>
          <button className="submit-btn" type="submit">
            Login
          </button>
          {errorMsg !== '' && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
