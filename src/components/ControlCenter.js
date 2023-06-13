import { useState } from 'react'
import InsertionSort from '../Algorithms/InsertionSort'
import MergeSortAlgorithm from '../Algorithms/MergeSort'

const ControlCenter = ({
  array,
  setArray,
  setLeftIndex,
  setMidIndex,
  setRightIndex,
  setInitialIndex,
  setFinalIndex,
  setCompareIndex,
  handleRandomize,
  setArraySize,
  setIsSortingComplete,
  setSelectedAlgorithm,
}) => {
  const sortingSpeedOptions = [
    { name: 'superfast', text: 'Super Fast' },
    { name: 'fast', text: 'Fast' },
    { name: 'slow', text: 'Slow' },
  ]

  const initialSortingAlgorithmOptions = [
    { name: 'insertionSort', text: 'Insertion Sort', active: true },
    { name: 'mergeSort', text: 'Merge Sort', active: false },
    { name: 'quickSort', text: 'Quick Sort', active: false },
  ]

  const [sortingAlgorithmOptions, setSortingAlgorithmOptions] = useState([
    ...initialSortingAlgorithmOptions,
  ])
  const [sortingSpeed, setSortingSpeed] = useState(20)

  const handleChangeSpeed = (speed) => {
    if (speed === 'superfast') {
      setSortingSpeed(10)
    } else if (speed === 'fast') {
      setSortingSpeed(200)
    } else if (speed === 'slow') {
      setSortingSpeed(300)
    }
  }

  const handleClick = (algorithm) => {
    setLeftIndex(false)
    setMidIndex(false)
    setRightIndex(false)
    setInitialIndex(false)
    setFinalIndex(false)
    setCompareIndex(false)
    const tempSortingAlgorithms = sortingAlgorithmOptions.map((item) => {
      if (item.name === algorithm) {
        item.active = true
      } else {
        item.active = false
      }
      return item
    })
    setSelectedAlgorithm(algorithm)
    setSortingAlgorithmOptions([...tempSortingAlgorithms])
  }

  const handleSort = () => {
    let algorithm
    let result

    setIsSortingComplete(false)
    sortingAlgorithmOptions.map((item) => {
      if (item.active) {
        algorithm = item.name
      }
    })

    if (algorithm === 'insertionSort') {
      result = InsertionSort(array)
    } else if (algorithm === 'mergeSort') {
      result = MergeSortAlgorithm(array)
    }
    animateSort(result, 0)
  }

  const animateSort = (result, index) => {
    if (index < result.length) {
      setTimeout(() => {
        const initial = result[index].initial
        const final = result[index].final
        const compareIndex = result[index].compareIndex
        const interimArray = result[index].interimArray
        const leftIndex = result[index].leftIndex
        const midIndex = result[index].midIndex
        const rightIndex = result[index].rightIndex
        setInitialIndex(initial)
        setFinalIndex(final)
        setCompareIndex(compareIndex)
        setLeftIndex(leftIndex)
        setMidIndex(midIndex)
        setRightIndex(rightIndex)
        setArray(interimArray)
        console.log("recusrsively calling animate sort")
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
        {sortingAlgorithmOptions.map((item, index) => {
          return (
            <div
              className={`algorithm-button button ${item.active && 'active'}`}
              key={index}
              id={item.name}
              onClick={() => handleClick(item.name)}
            >
              {item.text}
            </div>
          )
        })}
      </div>
      <div className="array-controls">
        <label htmlFor="array-size">Array Size</label>
        <input
          type="number"
          id="array-size"
          defaultValue={array.length}
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
          {sortingSpeedOptions.map((item, index) => {
            return (
              <option value={item.name} key={index}>
                {item.text}
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
