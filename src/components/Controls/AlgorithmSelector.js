import { useContext, useEffect } from 'react'
import { AlgorithmOptions } from '../../StaticLists/AlgorithmOptionsArray'
import { Context } from '../../Context/AppContext'

const AlgorithmSelector = () => {
  const { resetBarStyles, selectedAlgorithm, setSelectedAlgorithm } =
    useContext(Context)

  useEffect(() => {
    setSelectedAlgorithm(Object.keys(AlgorithmOptions)[0])
  }, [])

  const handleClick = (algorithm) => {
    resetBarStyles()
    setSelectedAlgorithm(algorithm)
  }

  return (
    <div className="algorithms">
      {Object.keys(AlgorithmOptions).map((item, index) => {
        return (
          <div
            className={`algorithm-button button ${
              item === selectedAlgorithm && 'active'
            }`}
            key={index}
            id={AlgorithmOptions[item].name}
            onClick={() => handleClick(item)}
          >
            {AlgorithmOptions[item].text}
          </div>
        )
      })}
    </div>
  )
}
export default AlgorithmSelector
