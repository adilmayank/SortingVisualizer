import { useContext } from 'react'
import { Context } from '../../Context/AppContext'

const ArraySizeSelector = () => {
  const { arraySize, setArraySize } = useContext(Context)
  return (
    <div className="array-controls">
      <label htmlFor="array-size">Array Size</label>
      <input
        type="number"
        id="array-size"
        defaultValue={arraySize}
        max={200}
        min={20}
        onChange={(e) => setArraySize(e.target.value)}
      />
    </div>
  )
}
export default ArraySizeSelector
