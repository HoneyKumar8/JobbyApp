import './index.css'
import {BsSearch} from 'react-icons/bs'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    onChangeEmploymentType,
    onChangeSalaryRange,
    onSearchInputChange,
    onSearchSubmit,
    searchInput,
    locationsList,
    onChangeLocation,
  } = props

  return (
    <div className="filters-group-container">
      <div className="search-container">
        <input
          type="search"
          value={searchInput}
          onChange={onSearchInputChange}
          placeholder="Search"
        />
        <button
          type="button"
          data-testid="searchButton"
          onClick={onSearchSubmit}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>

      <h3>Type of Employment</h3>
      <ul className="filters-list">
        {employmentTypesList.map(type => (
          <li key={type.employmentTypeId}>
            <input
              type="checkbox"
              id={type.employmentTypeId}
              value={type.employmentTypeId}
              onChange={onChangeEmploymentType}
            />
            <label htmlFor={type.employmentTypeId}>{type.label}</label>
          </li>
        ))}
      </ul>

      <h3>Salary Range</h3>
      <ul className="filters-list">
        {salaryRangesList.map(range => (
          <li key={range.salaryRangeId}>
            <input
              type="radio"
              id={range.salaryRangeId}
              name="salary"
              value={range.salaryRangeId}
              onChange={onChangeSalaryRange}
            />
            <label htmlFor={range.salaryRangeId}>{range.label}</label>
          </li>
        ))}
      </ul>

      <h3>Location</h3>
      <ul className="filters-list">
        {locationsList.map(location => (
          <li key={location.locationId}>
            <input
              type="checkbox"
              id={location.locationId}
              value={location.locationId}
              onChange={onChangeLocation}
            />
            <label htmlFor={location.locationId}>{location.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FiltersGroup
