import { useContext, memo } from 'react'
import { Context } from '../../Context/AppContext'

const ArraySizeSelector = () => {
  const { arraySize, setArraySize } = useContext(Context)
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
          max={200}
          defaultValue={arraySize}
          onChange={(e) => setArraySize(e.target.value)}
        />
      </div>
    </div>
  )
}
export default memo(ArraySizeSelector)
