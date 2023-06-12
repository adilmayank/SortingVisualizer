const InsertionSort = (array) => {
  const tempArray = [...array]
  const sortingSteps = []
  let key
  let j
  for (let i = 1; i <= tempArray.length - 1; i++) {
    const initalIterationObject = getInterimResult(i, null, null, [
      ...tempArray,
    ])
    sortingSteps.push(initalIterationObject)
    const tempTempArray = [...tempArray]
    key = tempArray[i]
    j = i - 1
    while (j >= 0 && tempArray[j] > key) {
      tempArray[j + 1] = tempArray[j]
      const interimIterationObject = getInterimResult(i, j, null, tempTempArray)
      sortingSteps.push(interimIterationObject)
      j--
    }
    const preFinalIterationObject = getInterimResult(
      i,
      null,
      j + 1,
      tempTempArray
    )
    sortingSteps.push(preFinalIterationObject)
    tempArray[j + 1] = key
    const finalIterationObject = getInterimResult(i, null, j + 1, [
      ...tempArray,
    ])
    sortingSteps.push(finalIterationObject)
  }
  const finishedInterationObject = getInterimResult(null, null, null, [
    ...tempArray,
  ])
  sortingSteps.push(finishedInterationObject)
  return sortingSteps
}

function getInterimResult(
  initial = null,
  comparing = null,
  final = null,
  interimArray = null
) {
  return {
    initial: initial,
    compareIndex: comparing,
    final: final,
    interimArray: interimArray,
  }
}

export default InsertionSort
