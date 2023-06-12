const InsertionSort = (array) => {
  const tempArray = [...array]
  const sortingSteps = []
  let key
  let j
  for (let i = 1; i <= tempArray.length - 1; i++) {
    const initalIterationObject = { initial: i,final :null, tempArray: [...tempArray] }
    key = tempArray[i]
    j = i - 1
    while (j >= 0 && tempArray[j] > key) {
      tempArray[j + 1] = tempArray[j]
      j--
    }
    tempArray[j + 1] = key
    const finalIterationObject = { initial: null, final: j + 1, tempArray: [...tempArray] }
    sortingSteps.push(initalIterationObject)
    sortingSteps.push(finalIterationObject)
  }
  const finishedInterationObject = { initial: null, final: null, tempArray: [...tempArray] }
  sortingSteps.push(finishedInterationObject)
  return sortingSteps
}

export default InsertionSort
