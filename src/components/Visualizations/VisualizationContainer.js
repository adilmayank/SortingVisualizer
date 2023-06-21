import AdditionalVisualizationArea from './AdditionalVisualizationArea'
import BarsArea from './BarsArea'

const VisualizationContainer = () => {
  return (
    <div className="visuzalization-container grid grid-cols-12 my-14 w-5/6 h-full">
      <BarsArea />
      <AdditionalVisualizationArea />
    </div>
  )
}
export default VisualizationContainer
