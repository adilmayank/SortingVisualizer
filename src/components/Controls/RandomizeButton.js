import { memo, useContext } from 'react'
import { Context } from '../../Context/AppContext'

const RandomizeButton = () => {
  const { handleRandomize,isSortingHappening } = useContext(Context)
  const handleClick = () => {
    if (!isSortingHappening) {
      handleRandomize()
    }
  }
  return (
    <div
      className="randomize-button-container control-button-container"
      onClick={() => handleClick()}
      aria-disabled={isSortingHappening}
    >
      <div className="randomize-button control-button">
        <span>Randomize</span>
      </div>
    </div>
  )
}
export default memo(RandomizeButton)
