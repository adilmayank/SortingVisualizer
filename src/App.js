import SortingBox from './components/SortingBox'
import { ContextProvider } from './Context/AppContext'

function App() {
  return (
    <ContextProvider>
      <div className="app-bg min-h-[700px] min-w-[1150px] h-screen backdrop-blur-md font-sans">
        <div className="main-container py-2 w-full h-full flex flex-col">
          <div className="title-container heading m-3 h-20 flex justify-center items-center">
            <p className="text-2xl font-bold uppercase text-black p-3 border-2 border-black">
              Sorting Visuazlier
            </p>
          </div>
          <SortingBox />
        </div>
      </div>
    </ContextProvider>
  )
}

export default App
