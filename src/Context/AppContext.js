import { createContext, useState } from 'react'
import { Factory } from '../Factories/Factory'
import { SortingSpeedOptions } from '../StaticLists/SortingSpeedOptionsArray'

export const Context = createContext(null)

export const ContextProvider = ({ children }) => {
  let initialSortingSpeedValue
  let initialSortingSpeed
  Object.keys(SortingSpeedOptions).map((item) => {
    if (SortingSpeedOptions[item].active) {
      initialSortingSpeedValue = SortingSpeedOptions[item].value
      initialSortingSpeed = SortingSpeedOptions[item].name
    }
  })


  const [barHeights, setBarHeights] = useState([])
  const [barWidth, setBarWidth] = useState(0)
  const [inputArray, setInputArray] = useState([])
  const [arraySize, setArraySize] = useState(50)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)
  const [sortingSpeed, setSortingSpeed] = useState(initialSortingSpeedValue)
  const [isSortingComplete, setIsSortingComplete] = useState(false)
  const [sortingProps, setSortingProps] = useState({})

  const resetBarStyles = () => {
    if (selectedAlgorithm === 'insertionSort') {
      setSortingProps(Factory.createInsertionSortProps())
    } else if (selectedAlgorithm === 'mergeSort') {
      setSortingProps(Factory.createMergeSortProps())
    }
  }

  function getRandomArray() {
    const randomArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 100) + 1
    )
    return randomArray
  }

  const handleRandomize = () => {
    const tempArray = getRandomArray()
    resetBarStyles()
    setInputArray(tempArray)
    setIsSortingComplete(false)
  }

  const contextValues = {
    barHeights,
    setBarHeights,
    barWidth,
    setBarWidth,
    inputArray,
    setInputArray,
    selectedAlgorithm,
    setSelectedAlgorithm,
    sortingSpeed,
    setSortingSpeed,
    arraySize,
    setArraySize,
    isSortingComplete,
    setIsSortingComplete,
    sortingProps,
    setSortingProps,
    resetBarStyles,
    getRandomArray,
    handleRandomize,
    initialSortingSpeed,
  }
  return <Context.Provider value={contextValues}>{children}</Context.Provider>
}
