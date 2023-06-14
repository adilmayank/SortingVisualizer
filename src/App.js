import SortingBox from './components/SortingBox'
import { ContextProvider } from './Context/AppContext'

function App() {
  return (
    <ContextProvider>
    <div className="app-title">
      <p>A Sorting Visualizer</p>
    </div>
      <SortingBox />
    </ContextProvider>
  )
}

export default App
