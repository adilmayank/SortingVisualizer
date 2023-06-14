import SortingBox from './components/SortingBox'
import { ContextProvider } from './Context/AppContext'

function App() {
  return (
    <ContextProvider>
      <SortingBox />
    </ContextProvider>
  )
}

export default App
