import { combineReducers } from 'redux';
import cellReducers from './cellReducer';
import bundleReducers from './bundlerReducer';

const reducers = combineReducers({
	cells: cellReducers,
	bundle: bundleReducers,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
