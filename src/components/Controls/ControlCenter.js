import AlgorithmSelector from './AlgorithmSelector'
import ArraySizeSelector from './ArraySizeSelector'
import SortingSpeedSelector from './SortingSpeedSelector'
import RandomizeButton from './RandomizeButton'
import SortButton from './SortButton'

const ControlCenter = () => {
  return (
    <div className="control-center-container px-2 py-2 frosted justify-center rounded-lg flex w-5/6">
      <div className="control-center p-4 grid grid-cols-4 w-full">
        <AlgorithmSelector />
        <ArraySizeSelector />
        <SortingSpeedSelector />
        <div
          className="action-buttons-container justify-evenly items-end
               grid grid-cols-2 gap-2 w-full"
        >
          <RandomizeButton />
          <SortButton />
        </div>
      </div>
    </div>
  )
}
export default ControlCenter
