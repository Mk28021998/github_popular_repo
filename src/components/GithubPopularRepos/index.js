import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoriesData: [],
    selectedLanguageFilter: languageFiltersData[0].id,
  }

  componentDidMount = () => {
    this.getRepositorary()
  }

  renderLanguageFilteredList = () => {
    const {selectedLanguageFilter} = this.state

    return (
      <ul className="language-filter-list-const">
        {languageFiltersData.map(eachLanguageFilter => (
          <LanguageFilterItem
            isSelected={eachLanguageFilter.id === selectedLanguageFilter}
            key={eachLanguageFilter.id}
            languageFilter={eachLanguageFilter}
          />
        ))}
      </ul>
    )
  }

  getRepositorary = async () => {
    const {selectedLanguageFilter} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/popular-repos?language='
    const response = await fetch(`${apiUrl}${selectedLanguageFilter}`)
    const data = await response.json()
    // console.log(response)
    console.log(data)
    if (response.ok === true) {
      const updatedData = data.popular_repos.map(eachRepository => ({
        id: eachRepository.id,
        avatarUrl: eachRepository.avatar_url,
        forksCount: eachRepository.forks_count,
        issuesCount: eachRepository.issues_count,
        starsCount: eachRepository.stars_count,
        name: eachRepository.name,
      }))
      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  setSelectedLanguageFilterAndRepositoryItem = newFilterId => {
    this.setState({selectedLanguageFilter: newFilterId}, this.getRepositorary)
  }

  renderRepositoryItem = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryListItemView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderRepositoryListItemView = () => {
    const {repositoriesData} = this.state
    // console.log(repositoriesData)

    return (
      <ul className="repository-list-cont">
        {repositoriesData.map(eachRepositoryData => (
          <RepositoryItem
            key={eachRepositoryData.id}
            repositoriesData={eachRepositoryData}
          />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="error-msg">Something went wrong</h1>
    </div>
  )

  render() {
    return (
      <div className="app-container">
        <div className="github-repositories-cont">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageFilteredList()}
          {this.renderRepositoryItem()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
