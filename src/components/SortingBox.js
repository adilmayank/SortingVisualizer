import { memo, useEffect, useState } from 'react'
import ControlCenter from './ControlCenter'
import Bar from './Bars'

const SortingBox = () => {
  const [arraySize, setArraySize] = useState(50)
  const [array, setArray] = useState(getRandomArray())

  // Bar dimension states
  const [barHeights, setBarHeights] = useState([])
  const [barWidth, setBarWidth] = useState(0)

  const [selectedAlgorithm, setSelectedAlgorithm] = useState('insertionSort')

  //insertion sort metadata
  // can we combine these three states into one?
  const [initialIndex, setInitialIndex] = useState(false)
  const [finalIndex, setFinalIndex] = useState(false)
  const [compareIndex, setCompareIndex] = useState(false)

  //merge sort metadata
    // can we combine these three states into one?
  const [leftIndex, setLeftIndex] = useState(false)
  const [midIndex, setMidIndex] = useState(false)
  const [rightIndex, setRightIndex] = useState(false)
  // one state for active comparison element

  const [isSortingComplete, setIsSortingComplete] = useState(false)

  const handleRandomize = () => {
    const tempArray = getRandomArray()
    setInitialIndex(null)
    setFinalIndex(null)
    setArray(tempArray)
    setIsSortingComplete(false)
  }

  function getRandomArray() {
    const randomArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 100) + 1
    )
    return randomArray
  }

  // only fires when isSortingComplete state is changed i.e. when array is reset or when sorting completes
  useEffect(() => {
    handleSortingCompletion()
  }, [isSortingComplete])

  // only fires when underlying array changes
  useEffect(() => {
    const barAreaContainer = document.querySelector('.bar-area')
    const barAreaHeight = barAreaContainer.clientHeight
    const barAreaWidth = barAreaContainer.clientWidth

    const max = Math.max(...array)

    const calculatedBarHeights = array.map((num) => {
      return (num / max) * barAreaHeight * 0.9
    })

    const calculatedBarWidth = (barAreaWidth / array.length) * 0.8
    setBarHeights(calculatedBarHeights)
    setBarWidth(calculatedBarWidth)
  }, [array])

  const handleSortingCompletion = () => {
    const bars = document.querySelectorAll('.bar')
    if (isSortingComplete) {
      animateBars(bars, 0)
    } else {
      bars.forEach((bar) => {
        const classesToRemove = Array.from(bar.classList).filter(className => className !== "bar")
      classesToRemove.forEach(className => {bar.classList.remove(className)})
      })
    }
  }

  const animateBars = (barsArray, index) => {
    if (index < barsArray.length) {
      // barsArray[index].classList.add('sorted')
      const classesToRemove = Array.from(barsArray[index].classList).filter(className => className !== "bar")
      classesToRemove.forEach(className => {barsArray[index].classList.remove(className)})
      barsArray[index].classList.add("sorted")
      setTimeout(() => {
        animateBars(barsArray, index + 1)
      }, 20)
    }
  }

  return (
    <div className="sorting-box-container">
      <ControlCenter
        array={array}
        setArray={setArray}
        setLeftIndex={setLeftIndex}
        setMidIndex={setMidIndex}
        setRightIndex={setRightIndex}
        setInitialIndex={setInitialIndex}
        setFinalIndex={setFinalIndex}
        setCompareIndex={setCompareIndex}
        handleRandomize={handleRandomize}
        setArraySize={setArraySize}
        setIsSortingComplete={setIsSortingComplete}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
      />
      <div className="sorting-box">
        <div className="bar-area">
          {barHeights.map((item, index) => {
            return (
              <Bar
                height={item}
                width={barWidth}
                key={index}
                algorithm={selectedAlgorithm}
                algorithmData={{
                  initialIndex: index === initialIndex && initialIndex,
                  finalIndex: index === finalIndex && finalIndex,
                  compareIndex: index === compareIndex && compareIndex,
                  leftIndex:index === leftIndex && leftIndex,
                  midIndex:  index ===midIndex && midIndex,
                  rightIndex: index === rightIndex && rightIndex,
                  inMergeRange: index > rightIndex && rightIndex
                }}
              />
            )
          })}
        </div>
        <div className="base"></div>
      </div>
    </div>
  )
}


export default SortingBox
