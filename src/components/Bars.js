import { memo, useContext } from 'react'
import { Context } from '../Context/AppContext'

const Bar = ({ height, width, index }) => {
  const { selectedAlgorithm, sortingProps } = useContext(Context)
  if (selectedAlgorithm === 'insertionSort') {
    let { initialIndex, finalIndex, compareIndex } = sortingProps
    initialIndex = index === initialIndex
    finalIndex = index === finalIndex
    compareIndex = index === compareIndex
    return (
      <div
        className={`bar ${initialIndex ? 'initial' : ''} ${
          finalIndex ? 'final' : ''
        } ${compareIndex ? 'comparing' : ''}`}
        style={{ height: `${height}px`, width: `${width}px` }}
      ></div>
    )
  } else if (selectedAlgorithm === 'mergeSort') {
    let { leftIndex, midIndex, rightIndex, compareIndex, inMergeRange } =
      sortingProps
    inMergeRange = index > rightIndex && rightIndex
    leftIndex = index === leftIndex
    midIndex = index === midIndex
    rightIndex = index === rightIndex
    compareIndex = index === compareIndex
    //render logic
    return (
      <div
        className={`bar ${
          leftIndex || leftIndex === 0 ? 'left-index-merge' : ''
        } ${rightIndex || rightIndex === 0 ? 'right-index-merge' : ''} ${
          inMergeRange || inMergeRange === 0 ? 'not-in-merge-range' : ''
        } 
          ${compareIndex || compareIndex === 0 ? 'comparing' : ''}`}
        style={{ height: `${height}px`, width: `${width}px` }}
      ></div>
    )
  } else if (selectedAlgorithm === 'heapSort') {
    let {
      heapSize,
      parentIndex,
      leftChildIndex,
      rightChildIndex,
    } = sortingProps
    const isInHeapSizeRange = heapSize && index >= heapSize
    const isParentIndex = parentIndex === index
    const isLeftChildIndex = leftChildIndex === index 
    const isRightChildIndex = rightChildIndex === index 
    return (
      <div
        className={`bar${
          isInHeapSizeRange ? ' not-in-merge-range' : ''
        }${isParentIndex ? ' heap-sort-parent' : ""}${isLeftChildIndex ? " heap-sort-left": ""}${isRightChildIndex ? " heap-sort-right": ""}`}
        style={{ height: `${height}px`, width: `${width}px` }}
      ></div>
    )
  }
}

export default memo(Bar)
