import './index.css'
import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {FiSearch} from 'react-icons/fi'
import Header from '../Header'
import JobItem from '../JobItem'

const apiProfileStats = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const apiJobStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noJobs: 'NOJOBS',
  loading: 'LOADING',
}
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Jobs = () => {
  const [profileData, setProfileData] = useState()
  const [apiProfile, setProfile] = useState(apiProfileStats.initial)
  const [apiJobs, setJobs] = useState(apiJobStatus.initial)
  const [jobsData, setData] = useState([])
  const [type, setEmploymentType] = useState([])
  const [salary, setPackage] = useState('')
  const [input, setInput] = useState('')
  const [onClickInput, onClickSetInput] = useState('')

  const getProfileData = async () => {
    setProfile(apiProfileStats.loading)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      setProfileData(updatedData)
      setProfile(apiProfileStats.success)
    } else {
      setProfile(apiProfileStats.failure)
    }
  }

  const getJobsData = async () => {
    setJobs(apiJobStatus.loading)
    console.log(type)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${salary}&search=${onClickInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log('hii')
    const data = await response.json()
    if (data.jobs.length === 0) {
      setJobs(apiJobStatus.noJobs)
    } else if (response.ok === true) {
      const formattedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      setJobs(apiJobStatus.success)
      setData(formattedData)
      console.log(formattedData)
    } else {
      setJobs(apiJobStatus.failure)
    }
  }

  useEffect(() => {
    getProfileData()
  }, [])

  useEffect(() => {
    getJobsData()
  }, [type, salary, onClickInput])

  const getJobsSuccessView = () => (
    <>
      <ul>
        {jobsData.map(each => (
          <JobItem each={each} key={each.id} />
        ))}
      </ul>
    </>
  )

  const noJobsView = () => (
    <div className="noJobs">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-paragraph">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  const retryJobDetails = () => {
    getJobsData()
  }
  const getJobsFailureView = () => (
    <div className="noJobs">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">Oops! Something Went Wrong</h1>
      <p className="no-jobs-paragraph">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={retryJobDetails}>
        Retry
      </button>
    </div>
  )
  const getJobsLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const getProfileSuccess = () => (
    <div className="profile-div">
      <img src={profileData.profileImageUrl} alt="profile" />
      <h1 className="profile-name">{profileData.name}</h1>
      <p className="profile-shortBio">{profileData.shortBio}</p>
    </div>
  )

  const profileFailure = () => (
    <button type="button" className="retry-button">
      Retry
    </button>
  )

  const profileLoader = () => (
    <div className="loader-div" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const onClickCheck = event => {
    setEmploymentType(prevState => [...prevState, event.target.id])
  }

  const onChangeRadio = event => {
    setPackage(event.target.id)
  }

  const onChangeInput = event => {
    setInput(event.target.value)
  }

  const searchInput = () => {
    onClickSetInput(input)
  }
  const renderJobs = () => {
    switch (apiJobs) {
      case apiJobStatus.success:
        return getJobsSuccessView()
      case apiJobStatus.loading:
        return getJobsLoaderView()
      case apiJobStatus.noJobs:
        return noJobsView()
      case apiJobStatus.failure:
        return getJobsFailureView()
      default:
        return null
    }
  }
  const renderProfile = () => {
    // console.log(apiProfile)
    switch (apiProfile) {
      case apiProfileStats.success:
        return getProfileSuccess()
      case apiProfileStats.failure:
        return profileFailure()
      case apiProfileStats.loading:
        return profileLoader()
      default:
        return null
    }
  }
  return (
    <>
      <Header />
      <div className="jobs-div">
        <div className="jobs-subDiv">
          {renderProfile()}
          <hr className="hr" />
          <h1 className="paragraph">Type of Employment</h1>
          <ul>
            {employmentTypesList.map(each => (
              <li key={each.employmentTypeId} className="li-jobs">
                <input
                  type="checkbox"
                  id={each.employmentTypeId}
                  className="checkbox"
                  onChange={onClickCheck}
                />
                <label htmlFor={each.employmentTypeId}>{each.label}</label>
                <br />
              </li>
            ))}
          </ul>
          <hr className="hr" />
          <h1 className="paragraph">Salary Range</h1>
          <ul>
            {salaryRangesList.map(each => (
              <li key={each.salaryRangeId}>
                <input
                  type="radio"
                  id={each.salaryRangeId}
                  className="checkbox"
                  name="option"
                  onClick={onChangeRadio}
                />
                <label htmlFor={each.salaryRangeId} className="label">
                  {each.label}
                </label>
                <br />
              </li>
            ))}
          </ul>
        </div>
        <div className="jobs-subDiv2">
          <div className="input-div">
            <input
              type="search"
              className="input-search"
              placeholder="Search"
              onChange={onChangeInput}
            />
            <button
              type="button"
              className="search-image"
              onClick={searchInput}
              data-testid="searchButton"
            >
              <FiSearch />
            </button>
          </div>
          {renderJobs()}
        </div>
      </div>
    </>
  )
}
export default Jobs
