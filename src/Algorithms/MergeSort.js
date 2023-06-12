const MergeSortAlgorithm = (array) => {
  let result = []
  const initialResult = getInterimResult(null, null, null, null, [...array])
  result.push(initialResult)

  MergeSort(array, 0, array.length - 1)

  // Merge subroutine
  function MergeSort(A, p, r) {
    if (p >= r) {
      return
    }
    const q = Math.floor((p + r) / 2)
    const newInterimResult = getInterimResult(p, q, r, null, [...A])
    result.push(newInterimResult)
    MergeSort(A, p, q)
    MergeSort(A, q + 1, r)
    MergeSubRoutine(A, p, q, r)
  }

  function MergeSubRoutine(A, p, q, r) {
    const nL = q - p + 1
    const nR = r - q
    const tempLeft = [...A.slice(p, q + 1)]
    const tempRight = [...A.slice(q + 1, r + 1)]

    let i = 0
    let j = 0
    let k = p

    while (i < nL && j < nR) {
      if (tempLeft[i] <= tempRight[j]) {
        A[k] = tempLeft[i]
        i++
      } else {
        A[k] = tempRight[j]
        j++
      }
      const newInterimResult = getInterimResult(p, q, r, k, [...A])
      result.push(newInterimResult)
      k++
    }
    while (i < nL) {
      A[k] = tempLeft[i]
      const newInterimResult = getInterimResult(p, q, r, k, [...A])
      result.push(newInterimResult)

      i++
      k++
    }
    while (j < nR) {
      A[k] = tempRight[j]
      const newInterimResult = getInterimResult(p, q, r, k, [...A])
      result.push(newInterimResult)
      j++
      k++
    }
  }
  console.log(result)
  return result
}

function getInterimResult(
  leftIndex = null,
  midIndex = null,
  rightIndex = null,
  compareIndex = null,
  interimArray = null
) {
  return {
    leftIndex: leftIndex,
    midIndex: midIndex,
    rightIndex: rightIndex,
    compareIndex: compareIndex,
    interimArray: interimArray,
  }
}

export default MergeSortAlgorithm
