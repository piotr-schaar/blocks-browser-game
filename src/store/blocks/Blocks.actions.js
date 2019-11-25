import uuid from 'uuid';
import { CREATE_BLOCKS_BOARD, RESET_BLOCKS_BOARD } from 'store/blocks/Blocks.types';
import colors from 'utils/boxColors';

const getRandomColor = colorsArr => colorsArr[Math.floor(Math.random() * colorsArr.length)];

export const createBlocks = (startGame = true) => dispatch => {
  const generateBlocks = (rows, columns) => {
    const boxColors = Object.values(colors);
    let blocksArr = [];
    for (let j = 0; j < rows; j += 1) {
      let blocksRow = [];
      for (let i = 0; i < columns; i += 1) {
        const newColor = {
          id: uuid(),
          color: getRandomColor(boxColors),
        };
        blocksRow = [...blocksRow, newColor];
      }
      blocksArr = [...blocksArr, blocksRow];
    }
    return blocksArr;
  };

  const columns = 12;
  const rows = startGame ? 6 : 1;

  // generating blocks based on startGame condition

  if (startGame) {
    dispatch({ type: RESET_BLOCKS_BOARD });
    dispatch({ type: CREATE_BLOCKS_BOARD, payload: generateBlocks(rows, columns) });
  } else {
    dispatch({
      type: CREATE_BLOCKS_BOARD,
      payload: generateBlocks(rows, columns),
    });
  }
};
