import Header from '../Header'

import './index.css'

const notFoundImage =
  'https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png'

const NotFound = () => (
  <>
    <Header />
    <div className="notFound-container">
      <div className="notFound-image-container">
        <img className="notFound-image" src={notFoundImage} alt="not found" />
      </div>
      <h1 className="notFound-heading">Page Not Found</h1>
      <p className="notFound-paragraph">
        we are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
