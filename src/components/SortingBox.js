import { useEffect, useState, useContext } from 'react'
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
    setIsSortingComplete,
    inputArray,
    setInputArray,
    arraySize,
    resetBarStyles,
  } = useContext(Context)

  const handleRandomize = () => {
    const tempArray = getRandomArray()
    resetBarStyles()
    setInputArray(tempArray)
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
    const barAreaWidth = barAreaContainer.clientWidth

    const max = Math.max(...inputArray)

    const calculatedBarHeights = inputArray.map((num) => {
      return (num / max) * barAreaHeight * 0.9
    })

    const calculatedBarWidth = (barAreaWidth / arraySize) * 0.8
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
      }, 20)
    }
  }

  return (
    <div className="sorting-box-container">
      <ControlCenter handleRandomize={handleRandomize} />
      <div className="sorting-box">
        <div className="bar-area">
          {barHeights.map((item, index) => {
            return (
              <Bar height={item} width={barWidth} key={index} index={index} />
            )
          })}
        </div>
        <div className="base"></div>
      </div>
    </div>
  )
}

export default SortingBox
