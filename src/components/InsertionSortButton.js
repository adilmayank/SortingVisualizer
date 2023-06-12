import InsertionSort from '../Algorithms/InsertionSort'

const InsertionSortButton = ({ setArray, array }) => {
  const handleClick = () => {
    const result = InsertionSort(array)
    animateSort(result, 0)
  }

  const animateSort = (result, index) => {
    if (index < result.length) {
      setTimeout(() => {
        setArray(result[index]);
        animateSort(result, index + 1);
      }, 30);
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Insertion Sort</button>
    </div>
  )
}
export default InsertionSortButton
