import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    rating,
    company_logo_url: companyLogoUrl,
    location,
    employment_type: employmentType,
    package_per_annum: packagePerAnnum,
    job_description: jobDescription,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="job-card-link">
      <li className="job-card">
        <div className="job-card-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="job-title-rating">
            <h1 className="job-title">{title}</h1> {/* ✅ Test Case 1 */}
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p> {/* ✅ Test Case 2 */}
            </div>
          </div>
        </div>
        <div className="job-card-details">
          <p className="location">{location}</p>
          <p className="employment-type">{employmentType}</p>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <h1 className="description-heading">Description</h1> {/* ✅ Fix */}
        <p className="job-description">{jobDescription}</p>{' '}
        {/* ✅ Test Case 3 */}
      </li>
    </Link>
  )
}

export default JobCard
