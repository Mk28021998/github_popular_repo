// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {
    isSelected,
    languageFilter,
    setSelectedLanguageFilterAndRepositoryItem,
  } = props
  const {id, language} = languageFilter
  const btnClass = isSelected
    ? 'language-btn selected-language-btn'
    : 'language-btn'

  const onClickBtnLanguageFilter = () => {
    setSelectedLanguageFilterAndRepositoryItem(id)
  }
  return (
    <li>
      <button
        type="button"
        className={btnClass}
        onClick={onClickBtnLanguageFilter}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
