import { useContext, useEffect } from 'react'
import { AlgorithmOptions } from '../../StaticLists/AlgorithmOptionsArray'
import { Context } from '../../Context/AppContext'

const AlgorithmSelector = ({ classes }) => {
  const {
    intialAlgorithm,
    resetBarStyles,
    selectedAlgorithm,
    setSelectedAlgorithm,
  } = useContext(Context)

  useEffect(() => {
    setSelectedAlgorithm(Object.keys(AlgorithmOptions)[0])
  }, [])

  const handleChange = (algorithm) => {
    console.log(algorithm)
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
          defaultValue={intialAlgorithm}
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
export default AlgorithmSelector
