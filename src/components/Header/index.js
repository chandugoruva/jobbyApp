import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const logoutUser = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navbar">
      <Link to="/">
        <li className="li">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </li>
      </Link>
      <ul className="ul">
        <Link to="/">
          <li className="li">Home</li>
        </Link>
        <Link to="/jobs">
          <li className="li">Jobs</li>
        </Link>
      </ul>

      <button type="button" className="logout-button" onClick={logoutUser}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
