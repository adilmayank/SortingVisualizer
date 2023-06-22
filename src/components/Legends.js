import { memo, useContext } from 'react'
import { Context } from '../Context/AppContext'

const LegendsWrapper = () => {
  const { selectedAlgorithm } = useContext(Context)
  return <Legends selectedAlgorithm={selectedAlgorithm} />
}

const Legends = memo(({ selectedAlgorithm }) => {
  let legendNames = []
  if (selectedAlgorithm === 'insertionSort') {
    legendNames = [
      { name: 'Initial', className: 'insertion-initial' },
      { name: 'Final', className: 'insertion-final' },
      { name: 'Comparing', className: 'insertion-comparing' },
    ]
  } else if (selectedAlgorithm === 'mergeSort') {
    legendNames = [
      { name: 'Left', className: 'merge-left' },
      { name: 'Right', className: 'merge-right' },
      { name: 'Comparing', className: 'merge-comparing' },
      { name: 'Inactive Range', className: 'merge-out-of-bound' },
    ]
  } else if (selectedAlgorithm === 'heapSort') {
    legendNames = [
      { name: 'Parent', className: 'heap-parent' },
      { name: 'Left Child', className: 'heap-left-child' },
      { name: 'Right Child', className: 'heap-right-child' },
      { name: 'Inactive Range', className: 'heap-out-of-bound' },
    ]
  }
  return (
    <div className="legends-area-container h-1/6 w-full p-3 flex flex-col">
      <div className="legends-area grid items-center grid-flow-col w-full h-full bg-slate-600/50 rounded-lg text-white font-semibold text-xs">
        {legendNames.map((item, index) => {
          return (
            <div
              className="legend-item flex justify-start items-center rounded-md bg-slate-800/80 h-5/6 m-1 px-3"
              key={index}
            >
              <div className="px-1 flex-1">
                <span>{item.name}</span>
              </div>
              <div className={`flex-1 flex justify-center`}>
                <div className={`p-2 w-4/6 rounded-md ${item.className}`}></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
export default LegendsWrapper
