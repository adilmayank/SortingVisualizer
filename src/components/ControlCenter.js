import AlgorithmSelector from './Controls/AlgorithmSelector'
import ArraySizeSelector from './Controls/ArraySizeSelector'
import SortingSpeedSelector from './Controls/SortingSpeedSelector'
import RandomizeButton from './Controls/RandomizeButton'
import SortButton from './Controls/SortButton'

const ControlCenter = () => {
  return (
    <div className="control-center-container px-2 py-2 frosted justify-center rounded-lg flex w-5/6">
      <div className="control-center py-4 grid grid-cols-4 2xl:w-5/6">
        <AlgorithmSelector />
        <ArraySizeSelector />
        <SortingSpeedSelector />
        <div
          className="action-buttons-container justify-evenly items-end
               grid grid-cols-2 gap-2 mx-2 w-full"
        >
          <RandomizeButton />
          <SortButton />
        </div>
      </div>
    </div>
  )
}
export default ControlCenter
