import uuid from 'uuid';
import {
  CREATE_BLOCKS_BOARD,
  RESET_BLOCKS_BOARD,
  CHECK_POSSIBILITY,
  DELETE_CLICKED_BLOCKS,
  UPDATE_BOARD,
  INCREASE_SCORE_POINTS,
  POINT_TRIGGER,
} from './Blocks.types';

import colors from '../../utils/boxColors';

import { columns, rows } from '../../helpers/constants';
import { getRandomColor } from '../../helpers/functions';

export const createBlocks = () => dispatch => {
  const generateBlocksBoard = () => {
    let board = [];
    for (let j = 0; j < rows; j += 1) {
      let blocksRow = [];
      for (let i = 0; i < columns; i += 1) {
        const newColor = {
          id: uuid(),
          color: getRandomColor(colors),
        };
        blocksRow = [...blocksRow, newColor];
      }
      board = [...board, blocksRow];
    }
    return board;
  };

  dispatch({ type: RESET_BLOCKS_BOARD });
  dispatch({ type: CREATE_BLOCKS_BOARD, payload: generateBlocksBoard() });
};
const checkMatchingDirections = (board, r, c) => {
  const top = board[r - 1] !== undefined && { row: r - 1, column: c };
  const bottom = board[r + 1] !== undefined && { row: r + 1, column: c };
  const left = board[r][c - 1] !== undefined && { row: r, column: c - 1 };
  const right = board[r][c + 1] !== undefined && { row: r, column: c + 1 };

  // filter for edge blocks and finding match color
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
        if (checkMatchingDirections(blocks, j, i).length > 0) {
          isPossibleMatches = true;
        }
      }
    }
  };

  getDirections();
  dispatch({ type: CHECK_POSSIBILITY, payload: isPossibleMatches });
};

const updateBlocksWithColors = (blocks, allMatches) => {
  const board = [...blocks];
  const [firstRow] = board;

  // coloring all matched blocks to white
  allMatches.map(({ row, column }) => {
    board[row][column].color = 'white';
  });

  const getUpperColor = () => {
    // getting upper color for matched blocks
    for (let j = 1; j < rows; j += 1) {
      for (let i = 0; i < columns; i += 1) {
        if (board[j][i].color === 'white') {
          board[j][i].color = blocks[j - 1][i].color;
          board[j - 1][i].color = 'white';
        }
      }
    }
    // generating new colors for first row in board
    firstRow.map(block => {
      if (block.color === 'white') {
        block.color = getRandomColor(colors);
      }
    });
  };

  // loop above function for all blocks
  for (let j = 1; j < rows; j += 1) {
    getUpperColor();
  }
  return board;
};

export const checkBoxesMatches = (y, x) => (dispatch, getState) => {
  const {
    BlocksReducer: { blocks },
  } = getState();

  let allMatchingBlocks = [];

  const matches = checkMatchingDirections(blocks, y, x);

  matches.map(({ row, column }) => {
    const restMatches = checkMatchingDirections(blocks, row, column);
    allMatchingBlocks = [...matches, ...allMatchingBlocks, ...restMatches];
  });

  allMatchingBlocks = allMatchingBlocks.filter(
    (v, i, a) => a.findIndex(t => t.row === v.row && t.column === v.column) === i,
  );

  dispatch({
    type: POINT_TRIGGER,
    payload: allMatchingBlocks,
  });

  const boardWithUpdatedBlocks = updateBlocksWithColors(blocks, allMatchingBlocks);

  dispatch({
    type: INCREASE_SCORE_POINTS,
    payload: allMatchingBlocks.length,
  });
  dispatch({
    type: UPDATE_BOARD,
    payload: boardWithUpdatedBlocks,
  });

  dispatch({
    type: DELETE_CLICKED_BLOCKS,
    payload: allMatchingBlocks,
  });
};
