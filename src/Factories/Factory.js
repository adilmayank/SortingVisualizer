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
    console.log(leftIndex, rightIndex)
    return {
      leftIndex: leftIndex,
      midIndex: midIndex,
      rightIndex: rightIndex,
      compareIndex: compareIndex,
      inMergeRange: null,
    }
  }
}
