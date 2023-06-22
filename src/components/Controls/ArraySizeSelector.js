import { useContext, memo } from 'react'
import { Context } from '../../Context/AppContext'

const ArraySizeSelector = () => {
  const { arraySize, setArraySize,isSortingHappening } = useContext(Context)
  
  const handleChange = (value) => {
    const userInput = value
    if(userInput < 10) {
      setArraySize(10)
    } else if(userInput > 250) {
      setArraySize(250)
    } 
    else {
      setArraySize(userInput)
    }
  }
  
  return (
    <div className="array-length-selector-container w-full">
      <div className="array-length-selector w-4/6 flex flex-col">
        <label htmlFor="array-size" className="label">
          <span>Array Size</span>
        </label>
        <input
          name="array-size"
          className="control-input"
          type="number"
          min={10}
          max={25 0}
          value={arraySize}
          onBlur={(e) => handleChange(e.target.value)}
          onChange={(e) => setArraySize(e.target.value)}
          disabled={isSortingHappening}
        />
      </div>
    </div>
  )
}
export default memo(ArraySizeSelector)
