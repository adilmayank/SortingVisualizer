import { memo } from 'react'

const Bar = ({ height, width, algorithm = null, algorithmData = null }) => {
  if (algorithm === 'insertionSort') {
    const { initialIndex, finalIndex, compareIndex } = algorithmData
    return (
      <div
        className={`bar ${
          initialIndex || initialIndex === 0 ? 'initial' : ''
        } ${finalIndex || finalIndex === 0 ? 'final' : ''} ${
          compareIndex || compareIndex === 0 ? 'comparing' : ''
        }`}
        style={{ height: `${height}px`, width: `${width}px` }}
      ></div>
    )
  } else if (algorithm === 'mergeSort') {
    const { leftIndex, midIndex, rightIndex, compareIndex, inMergeRange } =
      algorithmData
    //render logic
    return (
      <div
        className={`bar ${
          leftIndex || leftIndex === 0 ? 'left-index-merge' : ''
        } ${rightIndex || rightIndex === 0 ? 'right-index-merge' : ''} ${
          inMergeRange || inMergeRange === 0 ? 'in-merge-range' : ''
        } 
          ${compareIndex || compareIndex === 0 ? 'comparing' : ''}`}
        style={{ height: `${height}px`, width: `${width}px` }}
      ></div>
    )
  }
}

export default memo(Bar)
