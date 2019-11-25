import { CREATE_BLOCKS_BOARD, RESET_BLOCKS_BOARD } from 'store/blocks/Blocks.types';

const INITIAL_STATE = {
  blocks: [],
};

const blocksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_BLOCKS_BOARD:
      return {
        ...state,
        blocks: [],
      };
    case CREATE_BLOCKS_BOARD:
      return {
        ...state,
        blocks: [...state.blocks, ...action.payload],
      };
    default:
      return state;
  }
};

export default blocksReducer;
