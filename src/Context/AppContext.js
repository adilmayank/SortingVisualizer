import { createContext, useState } from 'react'
import { Factory } from '../Factories/Factory'
import { SortingSpeedOptions } from '../StaticLists/SortingSpeedOptionsArray'
import { AlgorithmOptions } from '../StaticLists/AlgorithmOptionsArray'

export const Context = createContext(null)

export const ContextProvider = ({ children }) => {
  let initialSortingSpeedValue
  let initialSortingSpeed
  let initialAlgorithm
  Object.keys(SortingSpeedOptions).map((item) => {
    if (SortingSpeedOptions[item].active) {
      initialSortingSpeedValue = SortingSpeedOptions[item].value
      initialSortingSpeed = SortingSpeedOptions[item].name
    }
  })

  Object.keys(AlgorithmOptions).map((item) => {
    if (AlgorithmOptions[item].active) {
      initialAlgorithm = item
    }
  })

  const [barHeights, setBarHeights] = useState([])
  const [barWidth, setBarWidth] = useState(0)
  const [inputArray, setInputArray] = useState([])
  const [arraySize, setArraySize] = useState(25)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(initialAlgorithm)
  const [sortingSpeed, setSortingSpeed] = useState(initialSortingSpeedValue)
  const [isSortingComplete, setIsSortingComplete] = useState(false)
  const [sortingProps, setSortingProps] = useState({})
  const [isSortingHappening, setIsSortingHappening] = useState(false)

  const resetBarStyles = () => {
    if (selectedAlgorithm === 'insertionSort') {
      setSortingProps(Factory.createInsertionSortProps())
    } else if (selectedAlgorithm === 'mergeSort') {
      setSortingProps(Factory.createMergeSortProps())
    } else if (selectedAlgorithm === 'heapSort') {
      setSortingProps(Factory.createHeapSortProps())
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
    initialAlgorithm,
    isSortingHappening,
    setIsSortingHappening,
  }
  return <Context.Provider value={contextValues}>{children}</Context.Provider>
}
