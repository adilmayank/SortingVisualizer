import { useContext, memo } from 'react'
import { Context } from '../../Context/AppContext'
import { SortingSpeedOptions } from '../../StaticLists/SortingSpeedOptionsArray'

const SortingSpeedSelector = () => {
  const { setSortingSpeed, initialSortingSpeed, isSortingHappening } =
    useContext(Context)

  const handleChangeSpeed = (speed) => {
    setSortingSpeed(SortingSpeedOptions[speed].value)
  }

  return (
    <div className="sorting-speed-selector-container w-full">
      <div className="sorting-speed-selector w-4/6 flex flex-col">
        <div className="label">
          <span>Sorting Speed</span>
        </div>
        <select
          name="sorting-speed"
          className="control-input"
          id="sorting-speed"
          defaultValue={initialSortingSpeed}
          onChange={(e) => handleChangeSpeed(e.target.value)}
          disabled={isSortingHappening}
        >
          <option value="" hidden aria-readonly>
            Select a Speed
          </option>
          {Object.keys(SortingSpeedOptions).map((item, index) => {
            return (
              <option value={SortingSpeedOptions[item].name} key={index}>
                {SortingSpeedOptions[item].text}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}
export default memo(SortingSpeedSelector)
