import AlgorithmSelector from './Controls/AlgorithmSelector'
import ArraySizeSelector from './Controls/ArraySizeSelector'
import SortingSpeedSelector from './Controls/SortingSpeedSelector'
import RandomizeButton from './Controls/RandomizeButton'
import SortButton from './Controls/SortButton'

const ControlCenter = () => {
  return (
    <div className="control-center frosted">
      <AlgorithmSelector />
      <ArraySizeSelector />
      <SortingSpeedSelector />
      <RandomizeButton />
      <SortButton />
    </div>
  )
}
export default ControlCenter
