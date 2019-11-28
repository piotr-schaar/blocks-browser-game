import React, { useState, useEffect } from 'react';
import uuid from 'uuid';
import { getRandomColor } from 'helpers/functions';
import { columns, rows } from 'helpers/constants';
import colors from 'utils/boxColors';

const useCreateBlocks = () => {
  const [blocks, setBlocks] = useState([]);

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
    setBlocks(board);
  };

  useEffect(() => {
    generateBlocksBoard();
  }, []);

  return [blocks];
};

export default useCreateBlocks;
