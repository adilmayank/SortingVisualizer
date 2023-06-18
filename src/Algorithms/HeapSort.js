function HeapSort(array) {
  const inputArrayObject = { array: array, heapSize: null }
  const interimResultArray = []

  heapSort(inputArrayObject, inputArrayObject.array.length)

  function heapSort(A, n) {
    // creating a max heap for the first time
    buildMaxHeap(A, n)
    for (let i = n - 1; i > 0; i--) {
      // exchanging the top element of the heap with the last element
      // last element in the array, that represents the heap, is the largest element.
      exchangeElements(A, 0, i)

      // decrease the heap size so that further operations can be operated with the smaller array
      A.heapSize = A.heapSize - 1

      // max heapify from the start (till heap size)
      maxHeapify(A, 0)
    }
    return A.array
  }

  function maxHeapify(A, i) {
    // left child index of ith node, at which we wish to establish a max heapify
    const L = Left(i)
    // right child index of ith node, at which we wish to establish a max heapify
    const R = Right(i)
    // largest index of i, L or R.
    let largest
    let interimResult

    // interimResult = getInterimResult(A, i, L, R)
    // interimResultArray.push(interimResult)

    // if L child index of i is less than current heap's size and element on Lth index is greater than element at ith index
    // then set largest index to be equal to L
    if (L <= A.heapSize - 1 && A.array[L] > A.array[i]) {
      largest = L
      interimResult = getInterimResult(A, i, L, R)
      interimResultArray.push(interimResult)
    } else {
      // other wise largest index is i
      largest = i
      interimResult = getInterimResult(A, i, L, R)
      interimResultArray.push(interimResult)
    }

    // we now know which element out of ith or Lth position is the largest
    // if R child of i is less than current heap's size and Rth index's element is greater than element at largest index
    // then set largest = R
    if (R <= A.heapSize - 1 && A.array[R] > A.array[largest]) {
      largest = R
      interimResult = getInterimResult(A, i, L, R)
      interimResultArray.push(interimResult)
    }

    // if largest is not equal to the ith element, i.e. if the largest element is not equal to the parent element
    // then exchange the elements at parent(ith) and largest position
    // now may be the element which is at the new largest index, may disturb the max-heap property of its children, so we call maxHeapify on largest index again
    if (largest !== i) {
      exchangeElements(A, i, largest)

      interimResult = getInterimResult(
        A,
        largest,
        largest === L ? i : L,
        largest === R ? i : R,
      )
      // interimResult = getInterimResult(A, i, L, R, largest, i, largest)
      interimResultArray.push(interimResult)
      maxHeapify(A, largest)
    }
  }

  // initial maxHeap built from bottom to non-leaf nodes from bottom to root.
  function buildMaxHeap(A, n) {
    A.heapSize = n
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      maxHeapify(A, i)
    }
  }

  function Left(i) {
    return 2 * i + 1
  }

  function Right(i) {
    return 2 * i + 2
  }

  // in-place array exchange
  function exchangeElements(A, a, b) {
    // -- snapshot here
    const tempFirstElement = A.array[a]
    A.array[a] = A.array[b]
    A.array[b] = tempFirstElement
  }

  // returns a single snapshot of each iteration of sorting
  function getInterimResult(
    A,
    parentIndex = null,
    childIndex1 = null,
    childIndex2 = null,
  ) {
    return {
      heapSize: A.heapSize,
      interimArray: [...A.array],
      parentIndex: parentIndex,
      childIndex1: childIndex1 < A.heapSize ? childIndex1 : null,
      childIndex2: childIndex2 < A.heapSize ? childIndex2 : null,
    }
  }

  interimResultArray.push(
    getInterimResult(inputArrayObject, null, null, null)
  )
  return interimResultArray
}

export default HeapSort
