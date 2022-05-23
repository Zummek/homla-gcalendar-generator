/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from '@reduxjs/toolkit';

import creatorSlice from '../page/HomePage/creatorSlice';
import themeSlice from '../styles/theme/slice';

const rootReducer = combineReducers({
  creatorSlice,
  themeSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
