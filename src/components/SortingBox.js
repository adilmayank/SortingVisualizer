import { useEffect, useState, useContext, memo } from 'react'
import { Context } from '../Context/AppContext'
import ControlCenter from './ControlCenter'
import Bar from './Bars'
import Legends from './Legends'


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
    <div className="content-container my-3 p-3 flex flex-col h-full w-full items-center">
      <ControlCenter handleRandomize={handleRandomize} />
      <div className="visuzalization-container grid grid-cols-12 my-14 w-5/6 h-full">
        <div className="sorting-box-container col-span-8 flex flex-col frosted mr-3 h-full rounded-lg">
        <Legends  />
          <div className="bar-area-container overflow-auto h-5/6 w-full flex flex-col p-3">
            <div className="bar-area">
              {barHeights.map((item, index) => {
                return (
                  <Bar
                    height={item}
                    width={barWidth}
                    key={index}
                    index={index}
                  />
                )
              })}
            </div>
            <div className="bars-base h-2 bg-white w-full rounded-sm"></div>
          </div>
        </div>
        <div className="additional-visualization-container col-span-4 ml-3 frosted h-full rounded-lg">
          <div className="additional-visualization flex flex-col justify-center items-center h-full w-full">
            <p className='text-2xl font-bold uppercase my-1'>Additional Visualizations</p>
            <p className='text-2xl uppercase my-1'>👀 Coming Soon 👀</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(SortingBox)
