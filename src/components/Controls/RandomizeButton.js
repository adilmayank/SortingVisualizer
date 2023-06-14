import { useContext } from 'react'
import { Context } from '../../Context/AppContext'

const RandomizeButton = () => {
  const { handleRandomize } = useContext(Context)
  return (
    <div className="randomize">
      <div className="randomize-button button" onClick={handleRandomize}>
        Randomize
      </div>
    </div>
  )
}
export default RandomizeButton
