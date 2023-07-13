import './index.css'
import {AiTwotoneStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsBagFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const JobItem = props => {
  const {each} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = each
  return (
    <Link to={`jobs/${id}`} className="link">
      <div className="job-item-div">
        <div className="logo-flex">
          <img src={companyLogoUrl} alt="logo" className="company logo" />
          <div>
            <h1 className="title">{title}</h1>
            <p className="rating">
              {' '}
              <AiTwotoneStar className="icon1" /> {rating}
            </p>
          </div>
        </div>
        <div className="flex1">
          <div className="flex2">
            <div className="location-flex">
              <ImLocation className="icon2" />
              <p className="location">{location}</p>
            </div>
            <div className="employment-flex">
              <BsBagFill className="icon3" />
              <p className="employment">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </div>
    </Link>
  )
}
export default JobItem
