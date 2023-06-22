import { useEffect, useMemo, useContext } from 'react'
import { Context } from '../../Context/AppContext'
import Bar from '../Bars'
import Legends from '../Legends'

const BarAreaWrapper = () => {
  const {
    barHeights,
    barWidth,
    isSortingComplete,
    inputArray,
    setBarHeights,
    setBarWidth,
    setInputArray,
    getRandomArray,
    arraySize,
  } = useContext(Context)

  return useMemo(
    () => (
      <BarsArea
        barHeights={barHeights}
        barWidth={barWidth}
        isSortingComplete={isSortingComplete}
        inputArray={inputArray}
        setBarHeights={setBarHeights}
        setBarWidth={setBarWidth}
        setInputArray={setInputArray}
        getRandomArray={getRandomArray}
        arraySize={arraySize}
      />
    ),
    [
      barHeights,
      barWidth,
      isSortingComplete,
      inputArray,
      setBarHeights,
      setBarWidth,
      setInputArray,
      getRandomArray,
      arraySize,
    ]
  )
}

const BarsArea = ({
  barHeights,
  barWidth,
  isSortingComplete,
  inputArray,
  setBarHeights,
  setBarWidth,
  setInputArray,
  getRandomArray,
  arraySize,
}) => {

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
      }, Math.pow((barsArray.length - (index + 1)) / barsArray.length, 3))
    }
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

    const max = Math.max(...inputArray)

    const calculatedBarHeights = inputArray.map((num) => {
      return (num / max) * barAreaHeight * 0.9
    })

    const calculatedBarWidth = (barAreaContainer.clientWidth / arraySize) * 0.8
    setBarHeights(calculatedBarHeights)
    setBarWidth(calculatedBarWidth)
  }, [inputArray])

  return (
    <div className="sorting-box-container col-span-8 flex flex-col frosted mr-3 h-full rounded-lg">
      <Legends />
      <div className="bar-area-container overflow-auto h-5/6 w-full flex flex-col p-3">
        <div className="bar-area">
          {barHeights.map((item, index) => {
            return (
              <Bar height={item} width={barWidth} key={index} index={index} />
            )
          })}
        </div>
        <div className="bars-base h-2 bg-white w-full rounded-sm"></div>
      </div>
    </div>
  )
}

export default BarAreaWrapper
