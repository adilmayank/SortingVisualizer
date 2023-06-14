import { createContext, useState } from 'react'
import { Factory } from '../Factories/Factory'

export const Context = createContext(null)

export const ContextProvider = ({ children }) => {
  const [barHeights, setBarHeights] = useState([])
  const [barWidth, setBarWidth] = useState(0)
  const [inputArray, setInputArray] = useState([])
  const [arraySize, setArraySize] = useState(50)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)
  const [sortingSpeed, setSortingSpeed] = useState(null)
  const [isSortingComplete, setIsSortingComplete] = useState(false)
  const [sortingProps, setSortingProps] = useState({})

  const resetBarStyles = () => {
    if (selectedAlgorithm === 'insertionSort') {
      setSortingProps(Factory.createInsertionSortProps())
    } else if (selectedAlgorithm === 'mergeSort') {
      setSortingProps(Factory.createMergeSortProps())
    }
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
  }
  return <Context.Provider value={contextValues}>{children}</Context.Provider>
}
