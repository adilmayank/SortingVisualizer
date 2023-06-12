
const HeapSortButton = ({ setArray, array }) => {
  const handleClick = () => {
    // const result = HeapSort(array)
    const result = []
    animateSort(result, 0)
  }

  const animateSort = (result, index) => {
    if (index < result.length) {
      setTimeout(() => {
        setArray(result[index]);
        animateSort(result, index + 1);
      }, 40);
    }
  }

  return (
    <div>
      <button onClick={handleClick} disabled>Heap Sort</button>
    </div>
  )
}
export default HeapSortButton
