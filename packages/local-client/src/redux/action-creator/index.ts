import { Dispatch } from 'redux';
import axios from 'axios';
// import localforage from 'localforage';
import {
	DeleteCellAction,
	Direction,
	InsertBeforeCellAction,
	MoveCellAction,
	UpdateCellAction,
	Actions,
} from '../actions';
import { ActionType } from '../action-types';
import { build } from '../../bundle';
import { Cell, CellTypes } from '../cell';
import { RootState } from '../reducers';
import localforage from 'localforage';
import { codeText, text } from '../dummyText';

export const updateCell = (id: string, content: string): UpdateCellAction => ({
	type: ActionType.UPDATE_CELL,
	payload: {
		id,
		content,
	},
});

export const deleteCell = (id: string): DeleteCellAction => ({
	type: ActionType.DELETE_CELL,
	payload: id,
});

export const insertCellBefore = (
	id: string | null,
	type: CellTypes,
	content: string
): InsertBeforeCellAction => ({
	type: ActionType.INSERT_CELL_BEFORE,
	payload: {
		id,
		type,
		content,
	},
});

export const moveCell = (id: string, direction: Direction): MoveCellAction => ({
	type: ActionType.MOVE_CELL,
	payload: {
		id,
		direction,
	},
});

export const createBundle =
	(cellId: string, rawCode: string) => async (dispatch: Dispatch<Actions>) => {
		dispatch({
			type: ActionType.BUNDLE_START,
			payload: {
				cellId,
			},
		});

		const result = await build(rawCode);
		dispatch({
			type: ActionType.BUNDLE_COMPLETE,
			payload: {
				cellId,
				bundle: result || { code: '', error: '' },
			},
		});
	};

export const fetchCells = () => async (dispatch: Dispatch<Actions>) => {
	dispatch({
		type: ActionType.FETCH_CELLS,
	});
	try {
		const data = await localforage.getItem<Cell[]>('cells');
		// const { data }: { data: Cell[] } = await axios.get('/cells');
		if (!data?.length) {
			dispatch(insertCellBefore(null, 'text', text));
			dispatch(insertCellBefore(null, 'code', codeText));
			return;
		}
		dispatch({
			type: ActionType.FETCH_CELLS_COMPLETE,
			payload: data,
		});
	} catch (error: any) {
		console.error(error);
		dispatch({
			type: ActionType.FETCH_CELLS_COMPLETE,
			payload: error.message,
		});
	}
};

export const saveCells = () => async (dispatch: Dispatch<Actions>, getState: () => RootState) => {
	const { cells: cellsArray } = getState();
	if (cellsArray) {
		const { data, order } = cellsArray;
		const cells = order.map((id) => data[id]);
		try {
			// await axios.post('/cells', { cells });
			await localforage.setItem('cells', cells);
		} catch (error: any) {
			dispatch({
				type: ActionType.SAVE_CELLS_ERROR,
				payload: error.message,
			});
		}
	}
};
