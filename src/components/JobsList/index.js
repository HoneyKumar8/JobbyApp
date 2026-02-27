import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobCard from '../JobCard'
import './index.css'

const JobsList = props => {
  const {filters} = props
  const [jobs, setJobs] = useState([])
  const [status, setStatus] = useState('LOADING')

  const fetchJobs = async () => {
    setStatus('LOADING')
    const token = Cookies.get('jwt_token')

    const employmentQuery = filters.employmentTypes.join(',') || '' // ✅ comma-separated
    const salaryQuery = filters.salaryRange || ''
    const searchQuery = filters.searchInput || ''
    const locationQuery = filters.locations.join(',') || ''

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentQuery}&minimum_package=${salaryQuery}&search=${searchQuery}&location=${locationQuery}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      setJobs(data.jobs)
      setStatus('SUCCESS')
    } else {
      setStatus('FAILURE')
    }
  }

  useEffect(() => {
    fetchJobs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={fetchJobs}>
        Retry
      </button>
    </div>
  )

  const renderNoJobsView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />{' '}
      {/* ✅ Test Case 9 */}
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  const renderJobsList = () => {
    if (jobs.length === 0) {
      return renderNoJobsView()
    }

    return (
      <ul className="jobs-list">
        {jobs.map(job => (
          <JobCard key={job.id} jobDetails={job} />
        ))}
      </ul>
    )
  }

  const renderContent = () => {
    switch (status) {
      case 'LOADING':
        return renderLoader()
      case 'SUCCESS':
        return renderJobsList()
      case 'FAILURE':
        return renderFailureView()
      default:
        return null
    }
  }

  return <div className="jobs-list-container">{renderContent()}</div>
}

export default JobsList
