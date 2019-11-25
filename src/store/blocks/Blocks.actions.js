import uuid from 'uuid';
import {
  CREATE_BLOCKS_BOARD,
  RESET_BLOCKS_BOARD,
  CHECK_POSSIBILITY,
} from 'store/blocks/Blocks.types';
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

export const blockClicked = (arrIndex, elIndex) => (dispatch, getState) => {
  const {
    BlocksReducer: { blocks },
  } = getState();

  const currentColor = blocks[arrIndex][elIndex].color;

  const checkMatches = () => {
    const checkDirections = () => {
      let matchedDirections = [];
      const blockTop = {
        row: arrIndex - 1,
        column: elIndex,
        getColor() {
          return blocks[this.row] === undefined ? null : blocks[this.row][this.column].color;
        },
      };
      const blockBottom = {
        row: arrIndex + 1,
        column: elIndex,
        getColor() {
          return blocks[this.row] === undefined ? null : blocks[this.row][this.column].color;
        },
      };
      const blockLeft = {
        row: arrIndex,
        column: elIndex - 1,
        getColor() {
          return blocks[this.row][this.column] === undefined
            ? null
            : blocks[this.row][this.column].color;
        },
      };

      const blockRight = {
        row: arrIndex,
        column: elIndex + 1,
        getColor() {
          return blocks[this.row][this.column] === undefined
            ? null
            : blocks[this.row][this.column].color;
        },
      };

      const blocksDirections = [blockTop, blockBottom, blockLeft, blockRight];

      const newMatch = (rowIdx, columnIdx) => {
        return {
          rowIdx,
          columnIdx,
        };
      };

      blocksDirections.forEach(({ getColor, row, column }) => {
        if (getColor() === currentColor) {
          matchedDirections = [...matchedDirections, newMatch(row, column)];
        }
      });

      return matchedDirections;
    };

    checkDirections();
  };

  checkMatches();
  //   dispatch({
  //     type: CHECK_POSSIBILITY,
  //     payload: {
  //       arrIndex,
  //       elIndex,
  //     },
  //   });
};
