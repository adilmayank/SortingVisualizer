import { useContext, memo } from 'react'
import { Context } from '../../Context/AppContext'
import InsertionSort from '../../Algorithms/InsertionSort'
import MergeSortAlgorithm from '../../Algorithms/MergeSort'
import { Factory } from '../../Factories/Factory'
import HeapSort from '../../Algorithms/HeapSort'

const SortButton = () => {
  const {
    sortingSpeed,
    setIsSortingComplete,
    selectedAlgorithm,
    setSortingProps,
    setInputArray,
    inputArray,
  } = useContext(Context)

  const handleSort = () => {
    let result

    setIsSortingComplete(false)

    if (selectedAlgorithm === 'insertionSort') {
      result = InsertionSort(inputArray)
      animateSort(result, 0)
    } else if (selectedAlgorithm === 'mergeSort') {
      result = MergeSortAlgorithm(inputArray)
      animateSort(result, 0)
    } else if(selectedAlgorithm === "heapSort") {
      result = HeapSort(inputArray)
      animateSort(result, 0)
    }
    console.log(result.length)
  }

  const animateSort = (result, index) => {
    if (index < result.length) {
      setTimeout(() => {
        let renderProps

        const interimArray = result[index].interimArray

        if (selectedAlgorithm === 'insertionSort') {
          const initial = result[index].initial
          const final = result[index].final
          const compareIndex = result[index].compareIndex
          renderProps = Factory.createInsertionSortProps(
            initial,
            final,
            compareIndex
          )
        } else if (selectedAlgorithm === 'mergeSort') {
          const leftIndex = result[index].leftIndex
          const midIndex = result[index].midIndex
          const rightIndex = result[index].rightIndex
          const compareIndex = result[index].compareIndex
          renderProps = Factory.createMergeSortProps(
            leftIndex,
            midIndex,
            rightIndex,
            compareIndex
          )
        } else if(selectedAlgorithm === "heapSort") {
          const {heapSize, parentIndex, childIndex1, childIndex2, largest, finalIndex1, finalIndex2, isSortingComplete} = result[index]
          renderProps = Factory.createHeapSortProps(heapSize, parentIndex, childIndex1, childIndex2, largest, finalIndex1, finalIndex2, isSortingComplete)
        }
        setSortingProps(renderProps)
        setInputArray([...interimArray])
        animateSort(result, index + 1)
      }, sortingSpeed)
    }
    if (index === result.length) {
      setIsSortingComplete(true)
    }
  }

  return (
    <div className="sort-button">
      <div className="button" onClick={handleSort}>
        Sort
      </div>
    </div>
  )
}
export default memo(SortButton)
