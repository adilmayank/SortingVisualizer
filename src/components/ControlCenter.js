import { useEffect, useState } from 'react'
import InsertionSort from '../Algorithms/InsertionSort'

const ControlCenter = ({
  array,
  setArray,
  setInitialIndex,
  setFinalIndex,
  handleRandomize,
  setArraySize,
  setIsSortingComplete,
}) => {
  const initialSortingAlgorithms = [
    { name: 'insertionSort', text: 'Insertion Sort', active: true },
    { name: 'heapSort', text: 'Heap Sort', active: false },
    { name: 'quickSort', text: 'Quick Sort', active: false },
  ]
  const sortingSpeedOptions = [
    { name: 'fast', text: 'Fast' },
    { name: 'slow', text: 'Slow' },
  ]

  const [sortingAlgorithms, setSortingAlgorithms] = useState([
    ...initialSortingAlgorithms,
  ])
  const [sortingSpeed, setSortingSpeed] = useState(300)

  const handleChangeSpeed = (speed) => {
    if (speed === 'fast') {
      setSortingSpeed(400)
    } else if (speed === 'slow') {
      setSortingSpeed(600)
    }
  }

  const handleClick = (algorithm) => {
    const tempSortingAlgorithms = sortingAlgorithms.map((item) => {
      if (item.name === algorithm) {
        item.active = true
      } else {
        item.active = false
      }
      return item
    })
    setSortingAlgorithms([...tempSortingAlgorithms])
  }

  const handleSort = () => {
    let algorithm
    let result

    setIsSortingComplete(false)
    sortingAlgorithms.map((item) => {
      if (item.active) {
        algorithm = item.name
      }
    })

    if (algorithm === 'insertionSort') {
      result = InsertionSort(array)
      animateSort(result, 0)
    }
  }

  const animateSort = (result, index) => {
    if (index < result.length) {
      setTimeout(() => {
        const initial = result[index].initial
        const final = result[index].final
        const snapshotArray = result[index].tempArray
        setInitialIndex(initial)
        setFinalIndex(final)
        setArray(snapshotArray)
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
        {sortingAlgorithms.map((item, index) => {
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
          defaultValue={30}
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
