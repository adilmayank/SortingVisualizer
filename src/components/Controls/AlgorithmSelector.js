import { memo, useContext, useEffect } from 'react'
import { AlgorithmOptions } from '../../StaticLists/AlgorithmOptionsArray'
import { Context } from '../../Context/AppContext'

const AlgorithmSelector = () => {
  const {
    initialAlgorithm,
    resetBarStyles,
    selectedAlgorithm,
    setSelectedAlgorithm,
  } = useContext(Context)

  const handleChange = (algorithm) => {
    resetBarStyles()
    setSelectedAlgorithm(algorithm)
  }

  return (
    <div>
      <div >
        <label
          htmlFor="algorithm"
        >
          <span>Algorithm</span>
        </label>
        <select
          name="algorithm"
          id="algorithm"
          onChange={(e) => handleChange(e.currentTarget.value)}
          defaultValue={initialAlgorithm}
        >
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
