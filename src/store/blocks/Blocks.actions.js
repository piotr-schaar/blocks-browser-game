import uuid from 'uuid';
import {
  CREATE_BLOCKS_BOARD,
  RESET_BLOCKS_BOARD,
  CHECK_POSSIBILITY,
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
  const top = board[r - 1] === undefined ? null : board[r - 1][c].color;
  const bottom = board[r + 1] === undefined ? null : board[r + 1][c].color;
  const left = board[r][c - 1] === undefined ? null : board[r][c - 1].color;
  const right = board[r][c + 1] === undefined ? null : board[r][c + 1].color;

  const directionsWithMatches = [top, bottom, left, right].filter(dir => dir === board[r][c].color);
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

export const checkBoxesMatches = clickedBlock => (dispatch, getState) => {
  const {
    BlocksReducer: { blocks },
  } = getState();
};

// };
