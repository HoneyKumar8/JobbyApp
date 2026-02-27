import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import JobsList from '../JobsList'

import './index.css'

const Jobs = () => {
  const [profile, setProfile] = useState(null)
  const [profileStatus, setProfileStatus] = useState('LOADING')
  const [searchInput, setSearchInput] = useState('')
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([])
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('')
  const [selectedLocations, setSelectedLocations] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const fetchProfile = async () => {
    setProfileStatus('LOADING')
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()

    if (response.ok) {
      setProfile(data.profile_details)
      setProfileStatus('SUCCESS')
    } else {
      setProfileStatus('FAILURE')
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const renderProfile = () => {
    switch (profileStatus) {
      case 'LOADING':
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
          </div>
        )
      case 'SUCCESS':
        return (
          <div className="profile-container">
            <img src={profile.profile_image_url} alt="profile" />
            <h1>{profile.name}</h1>
            <p>{profile.short_bio}</p>
          </div>
        )
      case 'FAILURE':
        return (
          <div className="profile-failure-view">
            <button type="button" onClick={fetchProfile}>
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  const onChangeEmploymentType = event => {
    const {value, checked} = event.target
    setSelectedEmploymentTypes(prev =>
      checked ? [...prev, value] : prev.filter(id => id !== value),
    )
  }

  const onChangeSalaryRange = event => {
    setSelectedSalaryRange(event.target.value)
  }

  const onChangeLocation = event => {
    const {value, checked} = event.target

    setSelectedLocations(prev =>
      checked ? [...prev, value] : prev.filter(id => id !== value),
    )
  }

  const onSearchInputChange = event => {
    setSearchInput(event.target.value)
  }

  const onSearchSubmit = () => {
    setSearchQuery(searchInput)
  }

  const filters = {
    employmentTypes: selectedEmploymentTypes,
    salaryRange: selectedSalaryRange,
    searchInput: searchQuery,
    locations: selectedLocations,
  }

  const employmentTypesList = [
    {label: 'Full Time', employmentTypeId: 'FULLTIME'},
    {label: 'Part Time', employmentTypeId: 'PARTTIME'},
    {label: 'Freelance', employmentTypeId: 'FREELANCE'},
    {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
  ]

  const salaryRangesList = [
    {salaryRangeId: '1000000', label: '10 LPA and above'},
    {salaryRangeId: '2000000', label: '20 LPA and above'},
    {salaryRangeId: '3000000', label: '30 LPA and above'},
    {salaryRangeId: '4000000', label: '40 LPA and above'},
  ]

  const locationsList = [
    {locationId: 'HYDERABAD', label: 'Hyderabad'},
    {locationId: 'BANGALORE', label: 'Bangalore'},
    {locationId: 'CHENNAI', label: 'Chennai'},
    {locationId: 'DELHI', label: 'Delhi'},
    {locationId: 'MUMBAI', label: 'Mumbai'},
  ]

  return (
    <div className="jobs-container">
      <Header />
      <div className="jobs-content">
        <div className="filters-section">
          {renderProfile()}
          <FiltersGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            onChangeEmploymentType={onChangeEmploymentType}
            onChangeSalaryRange={onChangeSalaryRange}
            locationsList={locationsList}
            onChangeLocation={onChangeLocation}
            onSearchInputChange={onSearchInputChange}
            onSearchSubmit={onSearchSubmit}
            searchInput={searchInput}
          />
        </div>
        <JobsList filters={filters} />
      </div>
    </div>
  )
}

export default Jobs
