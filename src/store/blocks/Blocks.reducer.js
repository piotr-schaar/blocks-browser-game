import {
  CREATE_BLOCKS_BOARD,
  RESET_BLOCKS_BOARD,
  CHECK_POSSIBILITY,
  DELETE_CLICKED_BLOCKS,
  UPDATE_COLOR_CLICKED_BLOCKS,
  INCREASE_SCORE_POINTS,
  UPDATE_BOARD,
} from 'store/blocks/Blocks.types';

const INITIAL_STATE = {
  possiblesMovies: false,
  blocks: [],
  score: 0,
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
    case INCREASE_SCORE_POINTS:
      return {
        ...state,
        score: state.score + 1,
      };

    case UPDATE_BOARD:
      return {
        ...state,
        blocks: action.payload,
      };
    default:
      return state;
  }
};

export default blocksReducer;
