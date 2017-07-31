// import redux
import {createStore} from 'redux';
// create a store with default grid

const emptyGrid = (gridSize) => {
  const rows = []
  for (var i = 0; i < gridSize; i++) {
    const columns = []
    for (var k = 0; k < gridSize; k++) {
      columns[k] = {filled: false}
    }
    rows[i] = columns
  }
  return rows;
}
const initialGrid = () => {
  const grid = emptyGrid(10)
  grid[1][grid.length-1].filled = true
  return grid
}
const reducer = (state=initialGrid(), action) => {

  let currentPosition = false;
  state.forEach( (row, rowIndex) => {
    const column = row.find( (i) => i.filled === true )
    if (column){
      const indexOfCurrent = row.indexOf(column)
      currentPosition = [rowIndex, indexOfCurrent]
    }
  })
  let originalY = currentPosition[1]
  let originalX = currentPosition[0]
  let newX = originalX
  let newY = originalY

  switch (action.type) {
    case 'ADD':
      if (action.name === 'TREE'){
        state[5][state.length-1].color = 'brown'
        state[5][state.length-2].color = 'brown'
        state[5][state.length-3].color = 'brown'
        state[4][state.length-3].color = 'green'
        state[6][state.length-3].color = 'green'
        state[4][state.length-4].color = 'green'
        state[5][state.length-4].color = 'green'
        state[6][state.length-4].color = 'green'

      } else if (action.name === 'CLOUD'){
        state[1][0].color = 'cloud'
        state[2][0].color = 'cloud'
        state[3][0].color = 'cloud'
        state[4][0].color = 'cloud'
        state[2][1].color = 'cloud'
        state[3][1].color = 'cloud'
      } else if (action.name === 'SUN'){
        state[state.length-1][0].color = 'yellow'
        state[state.length-2][0].color = 'yellow'
        state[state.length-1][1].color = 'yellow'
        state[state.length-3][0].color = 'yellow'
        state[state.length-2][1].color = 'yellow'
        state[state.length-1][2].color = 'yellow'
      }

    break
    case 'MOVE':
      if (action.direction === 'LEFT') {
        newX--
      } else if (action.direction === 'RIGHT'){
        newX++
      } else if (action.direction === 'UP'){
        newY--
      } else if (action.direction === 'DOWN'){
        newY++
      }
      if (canMoveTo({state,x:newX,y:newY})){
        state[originalX][originalY].filled = false
        state[newX][newY].filled = true
      }
    break
  }

  return state
}

const canMoveTo = ({state,x,y} )=> {
  if ((x < 0) || (y < 0)){
    return false
  }
  if ((x >= state.length) || (y >= state.length)){
    return false
  }
  return state[x][y].filled !== true && !state[x][y].color
}
var store = createStore(reducer)

// have a render function to show the grid
const root = document.querySelector("#root")
const render = () => {

  let html = store.getState().map( (row) => {
    let rowHtml = row.map( (c) => {
      if (c.filled === true) {
        return '<div class="filled"></div>'
      } else if (c.color) {
        return `<div class="scenary ${c.color}"></div>`
      } else {
        return '<div class="empty"></div>'
      }
    })
    return `<div class="row">${rowHtml.join(' ')}</div>`
  })
  html = `<div class="rows">${html.join(' ')}</div>`
  root.textContent = ''
  root.insertAdjacentHTML('beforeEnd', html)
}

store.subscribe(render)
render()
store.dispatch({ type: 'ADD', name: 'TREE' })
store.dispatch({ type: 'ADD', name: 'CLOUD' })
store.dispatch({ type: 'ADD', name: 'SUN' })


// setup the up/right/left/down keystroke
document.body.addEventListener('keydown', function(event){
  const up = 38
  const down= 40
  const right= 39
  const left= 37
  switch(event.keyCode) {
    case right:
    store.dispatch({ type: 'MOVE', direction: 'RIGHT' })
    break;

    case left:
    store.dispatch({ type: 'MOVE', direction: 'LEFT' })
    break;

    case up:
    store.dispatch({ type: 'MOVE', direction: 'UP' })
    break;

    case down:
    store.dispatch({ type: 'MOVE', direction: 'DOWN' })
    break;
  }


})
