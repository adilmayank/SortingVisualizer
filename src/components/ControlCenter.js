import { useContext, useEffect } from 'react'
import InsertionSort from '../Algorithms/InsertionSort'
import MergeSortAlgorithm from '../Algorithms/MergeSort'
import { Context } from '../Context/AppContext'
import { AlgorithmOptions } from '../StaticLists/AlgorithmOptionsArray'
import { SortingSpeedOptions } from '../StaticLists/SortingSpeedOptionsArray'
import { Factory } from '../Factories/Factory'

const ControlCenter = ({ handleRandomize }) => {
  const {
    inputArray,
    setInputArray,
    arraySize,
    setArraySize,
    setIsSortingComplete,
    selectedAlgorithm,
    setSelectedAlgorithm,
    sortingSpeed,
    setSortingSpeed,
    setSortingProps,
    resetBarStyles,
  } = useContext(Context)

  useEffect(() => {
    setSelectedAlgorithm(Object.keys(AlgorithmOptions)[0])
  }, [])

  const handleChangeSpeed = (speed) => {
    setSortingSpeed(SortingSpeedOptions[speed].value)
  }

  const handleClick = (algorithm) => {
    resetBarStyles()
    setSelectedAlgorithm(algorithm)
  }

  const handleSort = () => {
    let result

    setIsSortingComplete(false)
    
    if (selectedAlgorithm === 'insertionSort') {
      result = InsertionSort(inputArray)
    } else if (selectedAlgorithm === 'mergeSort') {
      result = MergeSortAlgorithm(inputArray)
    }
    animateSort(result, 0)
  }

  const animateSort = (result, index) => {
    if (index < result.length) {
      setTimeout(() => {
        let renderProps

        const interimArray = result[index].interimArray

        if (selectedAlgorithm === 'insertionSort') {
          const initial = result[index].initial
          const final = result[index].final
          const compareIndex = result[index].compareIndex
          renderProps = Factory.createInsertionSortProps(
            initial,
            final,
            compareIndex
          )
        } else if (selectedAlgorithm === 'mergeSort') {
          const leftIndex = result[index].leftIndex
          const midIndex = result[index].midIndex
          const rightIndex = result[index].rightIndex
          const compareIndex = result[index].compareIndex
          renderProps = Factory.createMergeSortProps(
            leftIndex,
            midIndex,
            rightIndex,
            compareIndex
          )
        }
        setSortingProps(renderProps)
        setInputArray([...interimArray])
        animateSort(result, index + 1)
      }, sortingSpeed)
    }
    if (index === result.length) {
      setIsSortingComplete(true)
    }
  }

  return (
    <div className="control-center">
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
      <div className="sorting-speed">
        <label htmlFor="sorting-speed">Sorting Speed</label>
        <select
          name="sorting-speed"
          id="sorting-speed"
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
      <div className="randomize">
        <div className="button" onClick={handleRandomize}>
          Randomize
        </div>
        <div className="button sort-button" onClick={() => handleSort()}>
          Sort
        </div>
      </div>
    </div>
  )
}
export default ControlCenter
