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
  checkAllBlocksForPossibleMatches();
};

const checkMatchingDirections = (board, r, c) => {
  // defines direction and set undefined for blocks placed up on the edges
  const top = board[r - 1] !== undefined && { row: r - 1, column: c };
  const bottom = board[r + 1] !== undefined && { row: r + 1, column: c };
  const left = board[r][c - 1] !== undefined && { row: r, column: c - 1 };
  const right = board[r][c + 1] !== undefined && { row: r, column: c + 1 };

  // filter for edge blocks and find match color
  const directionsWithMatches = [top, bottom, left, right]
    .filter(dir => dir instanceof Object)
    .filter(({ row, column }) => board[row][column].color === board[r][c].color);

  return directionsWithMatches;
};
export const checkAllBlocksForPossibleMatches = () => (dispatch, getState) => {
  const {
    BlocksReducer: { blocks },
  } = getState();

  let isPossibleMatches = false;

  const checkDirectionsToFindAnyPossibleMatches = () => {
    // iteration after each block to check if it contains any matches
    for (let j = 0; j < rows; j += 1) {
      for (let i = 0; i < columns; i += 1) {
        if (checkMatchingDirections(blocks, j, i).length > 0) {
          isPossibleMatches = true;
        }
      }
    }
  };

  checkDirectionsToFindAnyPossibleMatches();
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
  let allMatchingBlocks = [];

  const findMatchingAndTouching = (board, r, c) => {
    // first check after every function call that allMatchingBlocks contains already all matches
    if (allMatchingBlocks.filter(({ row, column }) => row === r && column === c).length) return;

    // define currentblock and get matching directions
    const blockCurrentlyBeingChecked = { row: r, column: c };
    const directionsWithMatches = checkMatchingDirections(board, r, c);

    // when current checking block has matches then add to allMatchingBlocks.
    // map matches to find another matches by recursive function
    if (directionsWithMatches.length) {
      allMatchingBlocks.push(blockCurrentlyBeingChecked);
      directionsWithMatches.map(({ row, column }) => findMatchingAndTouching(board, row, column));
    }
  };

  const {
    BlocksReducer: { blocks },
  } = getState();

  findMatchingAndTouching(blocks, y, x);

  // remove duplicates
  allMatchingBlocks = allMatchingBlocks.filter(
    (v, i, a) => a.findIndex(t => t.row === v.row && t.column === v.column) === i,
  );
  dispatch({
    type: POINT_TRIGGER,
    payload: allMatchingBlocks,
  });

  const boardWithUpdatedBlocks = updateBlocksWithColors(blocks, allMatchingBlocks);

  checkAllBlocksForPossibleMatches();

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
