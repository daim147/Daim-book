import { ActionType } from '../action-types';
import { Actions } from '../actions';
import { Cell } from '../cell';
import produce from 'immer';
export interface CellState {
	loading: boolean;
	error: null | string;
	data: {
		[key: string]: Cell;
	};
	order: string[];
}

const initialState = {
	loading: false,
	error: null,
	data: {},
	order: [],
};

const reducer = produce((state: CellState = initialState, action: Actions): CellState => {
	switch (action.type) {
		case ActionType.FETCH_CELLS:
			state.loading = true;
			state.error = '';
			return state;
		case ActionType.SAVE_CELLS_ERROR:
			state.error = action.payload;
			return state;
		case ActionType.FETCH_CELLS_COMPLETE:
			state.order = action.payload.map((cell) => cell.id);
			state.data = action.payload.reduce((acc, val) => {
				acc[val.id] = val;
				return acc;
			}, {} as CellState['data']);
			state.loading = false;
			state.error = '';
			return state;
		case ActionType.FETCH_CELLS_ERROR:
			state.loading = false;
			state.error = action.payload;
			return state;
		case ActionType.DELETE_CELL:
			delete state.data[action.payload];
			state.order = state.order.filter((id) => id !== action.payload);
			return state;
		case ActionType.UPDATE_CELL:
			const { id, content } = action.payload;
			state.data[id].content = content;
			return state;
		case ActionType.MOVE_CELL:
			const { direction } = action.payload;
			const index = state.order.findIndex((ind) => ind === action.payload.id);
			const targetIndex = direction === 'up' ? index - 1 : index + 1;
			if (targetIndex < 0 || targetIndex > state.order.length - 1) {
				return state;
			}
			[state.order[index], state.order[targetIndex]] = [
				state.order[targetIndex],
				action.payload.id,
			];
			return state;
		case ActionType.INSERT_CELL_BEFORE:
			const { type, id: _id, content: _content } = action.payload;
			const cell: Cell = {
				content: _content,
				type,
				id: randomId(),
			};
			state.data[cell.id] = cell;
			const indexFound = state.order.findIndex((id) => id === _id);
			if (indexFound < 0) {
				state.order.push(cell.id);
			} else {
				state.order.splice(indexFound + 1, 0, cell.id);
			}
			return state;
		default:
			return state;
	}
});
const randomId = () => Math.random().toString(36).substr(2, 5);
export default reducer;
