import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const JobItemDetails = () => {
  const {id} = useParams()
  const [jobDetails, setJobDetails] = useState(null)
  const [similarJobs, setSimilarJobs] = useState([])
  const [status, setStatus] = useState('LOADING')

  const fetchJobDetails = async () => {
    setStatus('LOADING')
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      setJobDetails(data.job_details)
      setSimilarJobs(data.similar_jobs)
      setStatus('SUCCESS')
    } else {
      setStatus('FAILURE')
    }
  }

  useEffect(() => {
    fetchJobDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]) // ✅ Keeps retry working and avoids warning

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
      <button type="button" onClick={fetchJobDetails}>
        Retry
      </button>
    </div>
  )

  const renderSkills = skills => (
    <ul className="skills-list">
      {skills.map(skill => (
        <li key={skill.name}>
          <img src={skill.image_url} alt={skill.name} className="skill-icon" />
          <p>{skill.name}</p>
        </li>
      ))}
    </ul>
  )

  const renderLifeAtCompany = life => (
    <div className="life-at-company">
      <h1>Description</h1>
      <p>{life.description}</p>
      <img src={life.image_url} alt="life at company" />
    </div>
  )

  const renderSimilarJobs = () => (
    <div className="similar-jobs">
      <h1>Similar Jobs</h1>
      <ul className="similar-jobs-list">
        {similarJobs.map(job => {
          const {
            id: jobId,
            title,
            rating,
            company_logo_url: companyLogoUrl,
            location,
            employment_type: employmentType,
            job_description: jobDescription,
          } = job

          return (
            <li key={jobId} className="similar-job-card">
              <img
                src={companyLogoUrl}
                alt="similar job company logo"
                className="company-logo"
              />
              <h1>{title}</h1>
              <p>⭐ {rating}</p>
              <p>{location}</p>
              <p>{employmentType}</p>
              <h1>Description</h1>
              <p>{jobDescription}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )

  const renderJobDetails = () => {
    const {
      company_logo_url: companyLogoUrl,
      title,
      rating,
      location,
      employment_type: employmentType,
      package_per_annum: packagePerAnnum,
      job_description: jobDescription,
      company_website_url: companyWebsiteUrl,
      skills,
      life_at_company: lifeAtCompany,
    } = jobDetails

    return (
      <div className="job-details">
        <div className="job-header">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div>
            <h1>{title}</h1>
            <p>⭐ {rating}</p>
          </div>
        </div>

        <div className="job-meta">
          <p>{location}</p>
          <p>{employmentType}</p>
          <p>{packagePerAnnum}</p>
        </div>

        <hr />

        <h1>Description</h1>
        <p>{jobDescription}</p>
        <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
          Visit
        </a>

        <h1>Skills</h1>
        {renderSkills(skills)}

        <h1>Life at Company</h1>
        {renderLifeAtCompany(lifeAtCompany)}
      </div>
    )
  }

  const renderContent = () => {
    switch (status) {
      case 'LOADING':
        return renderLoader()
      case 'SUCCESS':
        return (
          <>
            {renderJobDetails()}
            {renderSimilarJobs()}
          </>
        )
      case 'FAILURE':
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className="job-item-details-container">
      <Header />
      {renderContent()}
    </div>
  )
}

export default JobItemDetails
