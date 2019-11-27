import uuid from 'uuid';
import {
  CREATE_BLOCKS_BOARD,
  RESET_BLOCKS_BOARD,
  CHECK_POSSIBILITY,
  DELETE_CLICKED_BLOCKS,
} from 'store/blocks/Blocks.types';
import colors from 'utils/boxColors';

const getRandomColor = colorsArr => colorsArr[Math.floor(Math.random() * colorsArr.length)];

const columns = 12;
const rows = 6;

export const createBlocks = (startGame = true) => dispatch => {
  const generateBlocks = () => {
    const boxColors = Object.values(colors);
    let board = [];
    for (let j = 0; j < rows; j += 1) {
      let blocksRow = [];
      for (let i = 0; i < columns; i += 1) {
        const newColor = {
          id: uuid(),
          color: getRandomColor(boxColors),
        };
        blocksRow = [...blocksRow, newColor];
      }
      board = [...board, blocksRow];
    }
    return board;
  };

  // generating blocks based on startGame condition
  if (startGame) {
    dispatch({ type: RESET_BLOCKS_BOARD });
    dispatch({ type: CREATE_BLOCKS_BOARD, payload: generateBlocks() });
  }
};
const checkDirections = (board, r, c) => {
  const top = board[r - 1] !== undefined && { row: r - 1, column: c };
  const bottom = board[r + 1] !== undefined && { row: r + 1, column: c };
  const left = board[r][c - 1] !== undefined && { row: r, column: c - 1 };
  const right = board[r][c + 1] !== undefined && { row: r, column: c + 1 };

  const directionsWithMatches = [top, bottom, left, right]
    .filter(dir => dir instanceof Object)
    .filter(({ row, column }) => board[row][column].color === board[r][c].color);

  return directionsWithMatches;
};
export const checkAllBocksForPossibleMatches = () => (dispatch, getState) => {
  const {
    BlocksReducer: { blocks },
  } = getState();

  let isPossibleMatches = false;

  const getDirections = () => {
    for (let j = 0; j < rows; j += 1) {
      for (let i = 0; i < columns; i += 1) {
        if (checkDirections(blocks, j, i).length > 0) {
          isPossibleMatches = true;
        }
      }
    }
  };

  getDirections();

  dispatch({ type: CHECK_POSSIBILITY, payload: isPossibleMatches });
};

const fillEmptyBlocksFrom = blocks => {
  const board = blocks;

  const getUpperColor = () => {
    for (let j = 1; j < rows; j += 1) {
      for (let i = 0; i < columns; i += 1) {
        if (board[j][i].color === 'white') {
          board[j][i].color = blocks[j - 1][i].color;
          board[j - 1][i].color = 'white';
        }
      }
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const element of board[0]) {
      if (element.color === 'white') {
        const boxColors = Object.values(colors);
        element.color = getRandomColor(boxColors);
      }
    }
  };

  for (let j = 1; j < rows; j += 1) {
    getUpperColor();
  }
};

export const checkBoxesMatches = (arrayIndex, elementIndex) => (dispatch, getState) => {
  const {
    BlocksReducer: { blocks },
  } = getState();

  const matches = checkDirections(blocks, arrayIndex, elementIndex);

  let allMatches = [];
  for (let i = 0; i < matches.length; i += 1) {
    const { row, column } = matches[i];
    allMatches = [...matches, ...allMatches, ...checkDirections(blocks, row, column)];
  }

  // remove duplicates
  allMatches = allMatches.filter(
    (v, i, a) => a.findIndex(t => t.row === v.row && t.column === v.column) === i,
  );

  for (let i = 0; i < allMatches.length; i += 1) {
    const { row, column } = allMatches[i];
    blocks[row][column].color = 'white';
    fillEmptyBlocksFrom(blocks);
  }

  dispatch({ type: DELETE_CLICKED_BLOCKS, payload: allMatches });
};

// };
