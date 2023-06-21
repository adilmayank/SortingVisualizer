import { useEffect, useState, useMemo, useContext, memo } from 'react'
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

  const [initialBarAreaWidth, setInitialBarAreaWidth] = useState(0)

  useEffect(() => {
    const barAreaContainer = document.querySelector('.bar-area');
    setInitialBarAreaWidth(barAreaContainer?.clientWidth || 0);
  }, []);

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
        initialBarAreaWidth={initialBarAreaWidth}
        setInitialBarAreaWidth={setInitialBarAreaWidth}
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
      initialBarAreaWidth,
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
  initialBarAreaWidth,
  setInitialBarAreaWidth,
}) => {
  console.log('Bars Area')

  const handleSortingCompletion = () => {
    console.log('Handle sorting completion')
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
    console.log('Animate bars')
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
