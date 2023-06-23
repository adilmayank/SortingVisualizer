import { useEffect, useRef, useContext } from 'react'
import { Context } from '../../Context/AppContext'

const HeapViz = () => {
  const svgRef = useRef(null)
  const { inputArray, isSortingComplete, sortingProps } = useContext(Context)

  let { heapSize, parentIndex, leftChildIndex, rightChildIndex } = sortingProps

  function getLeftChildIndex(parentIndex, arraySize) {
    return 2 * parentIndex + 1 < arraySize && 2 * parentIndex + 1
  }

  function getRightChildIndex(parentIndex, arraySize) {
    return 2 * parentIndex + 2 < arraySize && 2 * parentIndex + 2
  }

  function animateCircles(circlesArray, index) {
    if (index < circlesArray.length) {
      setTimeout(() => {
        circlesArray[index].setAttribute('class', 'sorted')
        animateCircles(circlesArray, index + 1)
      }, Math.pow((circlesArray.length - (index + 1)) / circlesArray.length, 3))
    } else {
    }
  }

  useEffect(() => {
    const circles = document.querySelectorAll('circle')
    if (isSortingComplete) {
      console.log('Sorting complete')
      animateCircles(circles, 0)
    } else {
      console.log('Sorting incomplete')
      circles.forEach((circle) => {
        circle.setAttribute('class', '') // Remove the "sorted" class
      })
    }
  }, [isSortingComplete])

  useEffect(() => {
    if (!isSortingComplete) {
      console.log('Setting Heap')
      const svg = svgRef.current
      const svgHeight = svg.clientHeight
      const svgWidth = svg.clientWidth
      const radius = (svgHeight * svgWidth) / 0.6 / inputArray.length / 1000
      const nodeCoordinates = []
      const heapNodeCount = Math.min(
        inputArray.length,
        Math.pow(2, Math.floor(Math.log2(inputArray.length)) + 1) - 1
      )
      let heapNodeIndex = 0

      const rows = Math.floor(Math.log2(heapNodeCount)) + 1

      while (svg.lastChild) {
        svg.removeChild(svg.lastChild)
      }

      for (let row = 1; row <= rows; row++) {
        const y_pos = (svgHeight / (rows + 1)) * row + 1 / 2
        const columns = Math.pow(2, row - 1)
        for (let column = 1; column <= columns; column++) {
          if (heapNodeIndex >= heapNodeCount) {
            break
          }
          const x_pos = (svgWidth / (columns + 1)) * column
          nodeCoordinates.push([x_pos, y_pos])
          heapNodeIndex++
        }
      }

      heapNodeIndex = 0

      nodeCoordinates.map((item, index) => {
        if (index < Math.floor(nodeCoordinates.length / 2)) {
          const leftChildIndex = getLeftChildIndex(
            index,
            nodeCoordinates.length
          )

          if (leftChildIndex) {
            const leftChildLine = document.createElementNS(
              'http://www.w3.org/2000/svg',
              'line'
            )
            leftChildLine.setAttribute('x1', item[0])
            leftChildLine.setAttribute('y1', item[1])
            leftChildLine.setAttribute('x2', nodeCoordinates[leftChildIndex][0])
            leftChildLine.setAttribute('y2', nodeCoordinates[leftChildIndex][1])
            leftChildLine.setAttribute('stroke', 'black')
            leftChildLine.setAttribute('stroke-width', '2')
            svg.appendChild(leftChildLine)

            heapNodeIndex++
          }

          const rightChildIndex = getRightChildIndex(
            index,
            nodeCoordinates.length
          )

          if (rightChildIndex) {
            const rightChildLine = document.createElementNS(
              'http://www.w3.org/2000/svg',
              'line'
            )
            rightChildLine.setAttribute('x1', item[0])
            rightChildLine.setAttribute('y1', item[1])
            rightChildLine.setAttribute(
              'x2',
              nodeCoordinates[rightChildIndex][0]
            )
            rightChildLine.setAttribute(
              'y2',
              nodeCoordinates[rightChildIndex][1]
            )
            rightChildLine.setAttribute('stroke', 'black')
            rightChildLine.setAttribute('stroke-width', '2')
            svg.appendChild(rightChildLine)

            heapNodeIndex++
          }
        }
      })

      // creating heap nodes and containing texts
      nodeCoordinates.map((item, index) => {
        const circle = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'circle'
        )
        let isInHeapSizeRange = heapSize && index >= heapSize
        let isParentIndex = parentIndex === index
        let isLeftChildIndex = leftChildIndex === index
        let isRightChildIndex = rightChildIndex === index
        circle.setAttribute('key', index)
        circle.setAttribute('cx', item[0])
        circle.setAttribute('cy', item[1])
        circle.setAttribute('r', radius)
        if (isInHeapSizeRange) {
          circle.setAttribute('class', 'heap-out-of-bound')
        }
        if (isParentIndex) {
          circle.setAttribute('class', 'heap-parent')
        } else if (isLeftChildIndex) {
          circle.setAttribute('class', 'heap-left-child')
        } else if (isRightChildIndex) {
          circle.setAttribute('class', 'heap-right-child')
        }
        svg.appendChild(circle)

        const text = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'text'
        )
        text.setAttribute('x', item[0])
        text.setAttribute('y', item[1])
        text.setAttribute('text-anchor', 'middle')
        text.setAttribute('dominant-baseline', 'middle')
        text.setAttribute('fill', 'white')
        text.setAttribute('font-size', `${radius * 0.9}`)
        text.textContent = inputArray[index].toString()
        svg.appendChild(text)
      })
    }
  }, [inputArray])
  return (
    <div className="additional-visualization-container col-span-4 ml-3 frosted h-full rounded-lg">
      <div className="additional-visualization flex flex-col justify-center items-center h-full w-full p-2">
        <div className="h-full w-full flex justify-center items-center">
          <svg className="h-full w-full" ref={svgRef}></svg>
        </div>
      </div>
    </div>
  )
}
export default HeapViz
