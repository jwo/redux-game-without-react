export const emptyGrid = (gridSize) => {
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
export const initialGrid = () => {
  const grid = emptyGrid(10)
  grid[1][grid.length-1].filled = true
  return grid
}

export const canMoveTo = ({state,x,y} )=> {
  if ((x < 0) || (y < 0)){
    return false
  }
  if ((x >= state.length) || (y >= state.length)){
    return false
  }

  if (state[x][y].color === 'dragon'){
    return true;
  }

  return state[x][y].filled !== true && !state[x][y].color
}
