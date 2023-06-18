export class Factory {
  static createInsertionSortProps(
    initialIndex = null,
    finalIndex = null,
    compareIndex = null
  ) {
    return {
      initialIndex: initialIndex,
      finalIndex: finalIndex,
      compareIndex: compareIndex,
    }
  }

  static createMergeSortProps(
    leftIndex = null,
    midIndex = null,
    rightIndex = null,
    compareIndex = null
  ) {
    return {
      leftIndex: leftIndex,
      midIndex: midIndex,
      rightIndex: rightIndex,
      compareIndex: compareIndex,
      inMergeRange: null,
    }
  }

  static createHeapSortProps(
    heapSize=null,
    parentIndex = null,
    leftChildIndex = null,
    rightChildIndex = null,
  ) {
    return {
      heapSize,
      parentIndex,
      leftChildIndex,
      rightChildIndex,
    }
  }
}
