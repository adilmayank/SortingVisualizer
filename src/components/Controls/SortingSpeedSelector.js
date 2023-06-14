import { useContext } from 'react'
import { Context } from '../../Context/AppContext'
import { SortingSpeedOptions } from '../../StaticLists/SortingSpeedOptionsArray'

const SortingSpeedSelector = () => {
  const { setSortingSpeed, initialSortingSpeed } = useContext(Context)

  const handleChangeSpeed = (speed) => {
    setSortingSpeed(SortingSpeedOptions[speed].value)
  }

  return (
    <div className="sorting-speed">
      <label htmlFor="sorting-speed">Sorting Speed</label>
      <select
        name="sorting-speed"
        id="sorting-speed"
        defaultValue={initialSortingSpeed}
        onChange={(e) => handleChangeSpeed(e.target.value)}
      >
        {Object.keys(SortingSpeedOptions).map((item, index) => {
          return (
            <option value={SortingSpeedOptions[item].name} key={index}>
              {SortingSpeedOptions[item].text}
            </option>
          )
        })}
      </select>
    </div>
  )
}
export default SortingSpeedSelector
