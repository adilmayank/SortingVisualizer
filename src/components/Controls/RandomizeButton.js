import { memo, useContext } from 'react'
import { Context } from '../../Context/AppContext'

const RandomizeButton = () => {
  const { handleRandomize } = useContext(Context)
  return (
    <div
      className="randomize-button-container control-button-container"
      onClick={handleRandomize}
    >
      <div className="randomize-button control-button">
        <span>Randomize</span>
      </div>
    </div>
  )
}
export default memo(RandomizeButton)
