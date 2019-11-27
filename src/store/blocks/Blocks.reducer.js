// import {
//   CREATE_BLOCKS_BOARD,
//   RESET_BLOCKS_BOARD,
//   CHECK_POSSIBILITY,
//   DELETE_CLICKED_BLOCKS,
// } from 'store/blocks/Blocks.types';

// const INITIAL_STATE = {
//   possiblesMovies: false,
//   blocks: [],
// };

// const blocksReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case RESET_BLOCKS_BOARD:
//       return {
//         ...state,
//         blocks: [],
//       };
//     case CREATE_BLOCKS_BOARD:
//       return {
//         ...state,
//         blocks: [...state.blocks, ...action.payload],
//       };
//     case CHECK_POSSIBILITY:
//       return {
//         ...state,
//         possiblesMovies: action.payload,
//       };
//     case DELETE_CLICKED_BLOCKS:
//       return {
//         ...state,
//       };
//     default:
//       return state;
//   }
// };

// export default blocksReducer;
