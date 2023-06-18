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
        className={`bar ${initialIndex ? 'insertion-initial' : ''} ${
          finalIndex ? 'insertion-final' : ''
        } ${compareIndex ? 'insertion-comparing' : ''}`}
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
          leftIndex || leftIndex === 0 ? 'merge-left' : ''
        } ${rightIndex || rightIndex === 0 ? 'merge-right' : ''} ${
          inMergeRange || inMergeRange === 0 ? 'merge-out-of-bound' : ''
        } 
          ${compareIndex || compareIndex === 0 ? 'merge-comparing' : ''}`}
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
          isInHeapSizeRange ? ' heap-out-of-bound' : ''
        }${isParentIndex ? ' heap-parent' : ""}${isLeftChildIndex ? " heap-left-child": ""}${isRightChildIndex ? " heap-right-child": ""}`}
        style={{ height: `${height}px`, width: `${width}px` }}
      ></div>
    )
  }
}

export default memo(Bar)
