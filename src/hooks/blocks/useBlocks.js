import { useState, useEffect } from 'react';
import uuid from 'uuid';

import { columns, rows } from 'helpers/constants';
import { getRandomColor } from 'helpers/functions';
import colors from 'utils/boxColors';

const generateBlocksBoard = () => {
  const boxColors = Object.values(colors);
  let board = [];
  for (let j = 0; j < rows; j += 1) {
    let blocksRow = [];
    for (let i = 0; i < columns; i += 1) {
      const newBlock = {
        id: uuid(),
        color: getRandomColor(boxColors),
      };
      blocksRow = [...blocksRow, newBlock];
    }
    board = [...board, blocksRow];
  }

  return board;
};

const checkMatchingDirections = (board, r, c) => {
  console.log('row', r);
  console.log('column', c);

  console.log(board);
  console.log(board[r][c]);

  const top = board[r - 1] !== undefined && { row: r - 1, column: c };
  const bottom = board[r + 1] !== undefined && { row: r + 1, column: c };
  const left = board[r][c - 1] !== undefined && { row: r, column: c - 1 };
  const right = board[r][c + 1] !== undefined && { row: r, column: c + 1 };

  const directionsWithMatches = [top, bottom, left, right]
    .filter(dir => dir instanceof Object)
    .filter(({ row, column }) => board[row][column].color === board[r][c].color);

  return directionsWithMatches;
};

const checkAllBlocksForPossibleMatches = board => {
  let isPossibleMatches;
  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < columns; i += 1) {
      if (checkMatchingDirections(board, j, i).length > 0) {
        isPossibleMatches = true;
      }
    }
  }
  return isPossibleMatches;
};

const fillEmptyBlocksFromTop = blocks => {
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

const useBlocks = () => {
  const [possibleMove, setPossibleMove] = useState(false);
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    setBlocks(generateBlocksBoard());
  }, []);

  useEffect(() => {}, []);

  const handleClickOnBlock = (arrayIndex, elementIndex) => {
    console.log('array', arrayIndex);
    console.log('element', elementIndex);

    const blockMatches = checkMatchingDirections(blocks, arrayIndex, elementIndex);

    let allMatchingBlocks = [];

    // for (let i = 0; i < blockMatches.length; i += 1) {
    //   const { row, column } = blockMatches[i];
    //   allMatchingBlocks = [
    //     ...blockMatches,
    //     ...allMatchingBlocks,
    //     ...checkMatchingDirections(blocks, row, column),
    //   ];
    // }

    // for (let i = 0; i < allMatchingBlocks.length; i += 1) {
    //   const { row, column } = allMatchingBlocks[i];
    //   blocks[row][column].color = 'white';
    //   fillEmptyBlocksFromTop(blocks);
    // }
  };

  return [blocks, possibleMove, handleClickOnBlock];
};
export default useBlocks;
