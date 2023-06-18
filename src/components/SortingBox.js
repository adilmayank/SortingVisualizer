import { useEffect, useState, useContext, memo } from 'react'
import { Context } from '../Context/AppContext'
import ControlCenter from './ControlCenter'
import Bar from './Bars'

const SortingBox = () => {
  const {
    barHeights,
    setBarHeights,
    barWidth,
    setBarWidth,
    isSortingComplete,
    inputArray,
    setInputArray,
    arraySize,
    getRandomArray,
    handleRandomize,
  } = useContext(Context)

  const [initialBarAreaWidth, setInitialBarAreaWidth] = useState(0)

  useEffect(() => {
    const barAreaContainer = document.querySelector('.bar-area')
    setInitialBarAreaWidth(barAreaContainer.clientWidth)
    setInputArray(getRandomArray())
  }, [])

  // only fires when isSortingComplete state is changed i.e. when inputArray is reset or when sorting completes
  useEffect(() => {
    handleSortingCompletion()
  }, [isSortingComplete])

  // only fires when underlying inputArray changes
  useEffect(() => {
    const barAreaContainer = document.querySelector('.bar-area')
    const barAreaHeight = barAreaContainer.clientHeight

    const max = Math.max(...inputArray)

    const calculatedBarHeights = inputArray.map((num) => {
      return (num / max) * barAreaHeight * 0.9
    })

    const calculatedBarWidth = (initialBarAreaWidth / arraySize) * 0.8
    setBarHeights(calculatedBarHeights)
    setBarWidth(calculatedBarWidth)
  }, [inputArray])

  const handleSortingCompletion = () => {
    const bars = document.querySelectorAll('.bar')
    if (isSortingComplete) {
      animateBars(bars, 0)
    } else {
      bars.forEach((bar) => {
        const classesToRemove = Array.from(bar.classList).filter(
          (className) => className !== 'bar'
        )
        classesToRemove.forEach((className) => {
          bar.classList.remove(className)
        })
      })
    }
  }

  const animateBars = (barsArray, index) => {
    if (index < barsArray.length) {
      const classesToRemove = Array.from(barsArray[index].classList).filter(
        (className) => className !== 'bar'
      )
      classesToRemove.forEach((className) => {
        barsArray[index].classList.remove(className)
      })
      barsArray[index].classList.add('sorted')
      setTimeout(() => {
        animateBars(barsArray, index + 1)
      }, (((barsArray.length - (index + 1)) * 20) / barsArray.length) * 1.5)
    }
  }

  return (
    <div className="sorting-box-container grid">
      <ControlCenter handleRandomize={handleRandomize} />
      <div className="sorting-box frosted-texture">
        <div className="bar-area controlled-width">
          {barHeights.map((item, index) => {
            return (
              <Bar height={item} width={barWidth} key={index} index={index} />
            )
          })}
        </div>
        <div className="base controlled-width"></div>
      </div>
    </div>
  )
}

export default memo(SortingBox)
