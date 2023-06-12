import { memo, useEffect, useState } from 'react'
import ControlCenter from './ControlCenter'

const SortingBox = () => {
  const [arraySize, setArraySize] = useState(30)
  const [array, setArray] = useState(getRandomArray())
  const [barHeights, setBarHeights] = useState([])
  const [barWidth, setBarWidth] = useState(0)
  const [initialIndex, setInitialIndex] = useState(false)
  const [finalIndex, setFinalIndex] = useState(false)
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

  useEffect(() => {
    handleSortingCompletion()
  }, [isSortingComplete])

  useEffect(() => {
    const barAreaContainer = document.querySelector('.bar-area')
    const barAreaHeight = barAreaContainer.clientHeight
    const barAreaWidth = barAreaContainer.clientWidth

    const max = Math.max(...array)

    const calculatedBarHeights = array.map(num => {
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
        bar.classList.remove('sorted')
      })
    }
  }

  const animateBars = (barsArray, index) => {
    if (index < barsArray.length) {
      barsArray[index].classList.add('sorted')
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
        setInitialIndex={setInitialIndex}
        setFinalIndex={setFinalIndex}
        handleRandomize={handleRandomize}
        setArraySize={setArraySize}
        setIsSortingComplete={setIsSortingComplete}
      />
      <div className="sorting-box">
        <div className="bar-area">
          {barHeights.map((item, index) => {
            if (index === 0) {
              {
                /* console.log(`index: ${index}`, `finalIndex: ${finalIndex}`,`index === finalIndex: ${index === finalIndex}`, `index === finalIndex && finalIndex ${index === finalIndex && finalIndex}`) */
              }
            }
            return (
              <Bar
                height={item}
                width={barWidth}
                key={index}
                initialIndex={index === initialIndex && initialIndex}
                finalIndex={index === finalIndex && finalIndex}
              />
            )
          })}
        </div>
        <div className="base"></div>
      </div>
    </div>
  )
}

const Bar = memo(({ height, width, initialIndex, finalIndex }) => {
  return (
    <div
      className={`bar ${initialIndex || initialIndex === 0 ? 'initial' : ''} ${
        finalIndex || finalIndex === 0 ? 'final' : ''
      }`}
      style={{ height: `${height}px`, width: `${width}px` }}
    ></div>
  )
})

export default SortingBox
