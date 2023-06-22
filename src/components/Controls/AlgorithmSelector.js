import { memo, useContext } from 'react'
import { AlgorithmOptions } from '../../StaticLists/AlgorithmOptionsArray'
import { Context } from '../../Context/AppContext'

const AlgorithmSelector = () => {
  const {
    initialAlgorithm,
    resetBarStyles,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isSortingHappening
  } = useContext(Context)

  const handleChange = (algorithm) => {
    resetBarStyles()
    setSelectedAlgorithm(algorithm)
  }

  return (
    <div className="algorithm-selector-container w-full">
      <div className="algorithm-selector w-4/6 flex flex-col">
        <div className="label">
          <span>Algorithm</span>
        </div>

        <select
          className="control-input"
          name="algorithm"
          id="algorithm"
          placeholder="select an algorithm"
          onChange={(e) => handleChange(e.currentTarget.value)}
          defaultValue={initialAlgorithm}
          disabled = {isSortingHappening}
        >
          <option value="mergeSort" hidden aria-readonly>
            Select an Algorithm
          </option>
          {Object.keys(AlgorithmOptions).map((item, index) => {
            return (
              <option
                className={`algorithm-button button ${
                  item === selectedAlgorithm && 'active'
                }`}
                key={index}
                value={item}
                id={item}
              >
                {AlgorithmOptions[item].text}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}
export default memo(AlgorithmSelector)
