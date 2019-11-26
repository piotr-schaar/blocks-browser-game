import {
  CREATE_BLOCKS_BOARD,
  RESET_BLOCKS_BOARD,
  CHECK_POSSIBILITY,
} from 'store/blocks/Blocks.types';

const INITIAL_STATE = {
  possiblesMovies: false,
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
    case CHECK_POSSIBILITY:
      return {
        ...state,
        possiblesMovies: action.payload,
      };
    default:
      return state;
  }
};

export default blocksReducer;
