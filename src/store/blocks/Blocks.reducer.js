import {
  CREATE_BLOCKS_BOARD,
  RESET_BLOCKS_BOARD,
  CHECK_POSSIBILITY,
  INCREASE_SCORE_POINTS,
  UPDATE_BOARD,
  POINT_TRIGGER,
} from './Blocks.types';

const INITIAL_STATE = {
  possiblesMoves: true,
  blocks: [],
  score: 0,
  matches: [],
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
        possiblesMoves: action.payload,
      };
    case POINT_TRIGGER:
      return {
        ...state,
        matches: action.payload,
      };

    case INCREASE_SCORE_POINTS:
      return {
        ...state,
        score: state.score + action.payload,
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
