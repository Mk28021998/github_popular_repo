// Write your code here
import './index.css'

const ReponsitoryItem = props => {
  const {repositoriesData} = props
  return (
    <li className="repository-card-item-cont">
      <img
        src={repositoriesData.avatarUrl}
        alt={repositoriesData.name}
        className="github-img"
      />
      <h1 className="repositary-name">{repositoriesData.name}</h1>
      <div className="stats-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stats-img"
        />
        <p className="stats-count">{repositoriesData.starsCount} stars</p>
      </div>
      <div className="stats-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stats-img"
        />
        <p className="stats-count">{repositoriesData.forksCount} forks</p>
      </div>
      <div className="stats-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stats-img"
        />
        <p className="stats-count">
          {repositoriesData.issuesCount} open issues
        </p>
      </div>
    </li>
  )
}

export default ReponsitoryItem
