import { ActionType } from '../action-types';
import {
	DeleteCellAction,
	Direction,
	InsertBeforeCellAction,
	MoveCellAction,
	UpdateCellAction,
	BundleCompleteAction,
	BundleStartAction,
	Actions,
} from '../actions';
import { build } from '../../bundle';
import { CellTypes } from '../cell';
import { Dispatch } from 'redux';

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

export const insertCellBefore = (id: string | null, type: CellTypes): InsertBeforeCellAction => ({
	type: ActionType.INSERT_CELL_BEFORE,
	payload: {
		id,
		type,
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
