import AppTitle from './components/AppTitle'
import ControlCenter from './components/Controls/ControlCenter'
import VisualizationContainer from './components/Visualizations/VisualizationContainer'
import { ContextProvider } from './Context/AppContext'

function App() {
  return (
    <ContextProvider>
      <div className="app-bg min-h-[700px] min-w-[1150px] h-screen backdrop-blur-md font-sans">
        <div className="main-container py-2 w-full h-full flex flex-col">
          <AppTitle />
          <div className="content-container my-3 p-3 flex flex-col h-full w-full items-center">
            <ControlCenter />
            <div className="visuzalization-container grid grid-cols-12 my-14 w-5/6 h-full">
              <VisualizationContainer />
            </div>
          </div>
        </div>
      </div>
    </ContextProvider>
  )
}

export default App
