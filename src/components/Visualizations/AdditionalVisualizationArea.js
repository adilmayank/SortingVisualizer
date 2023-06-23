import { useContext } from 'react'
import { Context } from '../../Context/AppContext'
import HeapViz from './HeapViz'
const AdditionalVisualizationArea = () => {
  const { inputArray, selectedAlgorithm } = useContext(Context)

  if (selectedAlgorithm === 'heapSort') {
    if (inputArray.length < 30) {
      return <HeapViz />
    }
    return (
      <div className="additional-visualization-container col-span-4 ml-3 frosted h-full rounded-lg">
        <div className="additional-visualization flex flex-col justify-center items-center h-full w-full">
          <p className="font-bold uppercase my-1 flex justify-center p-1 text-center lg:text-lg sm:text-md xl:text-xl ">
            ❌ Heap Too Big ❌
          </p>
          <p className="text-md uppercase flex justify-center p-1 text-center my-1">
            Input array must be less than 50
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="additional-visualization-container col-span-4 ml-3 frosted h-full rounded-lg">
      <div className="additional-visualization flex flex-col justify-center items-center h-full w-full">
        <p className="font-bold uppercase my-1 flex justify-center p-1 text-center lg:text-lg sm:text-md xl:text-xl ">
          Additional Visualizations
        </p>
        <p className="text-2xl uppercase my-1">👀 Coming Soon 👀</p>
      </div>
    </div>
  )
}
export default AdditionalVisualizationArea
