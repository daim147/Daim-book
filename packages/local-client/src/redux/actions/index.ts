import { Cell, CellTypes } from '../cell';
import { ActionType } from '../action-types';

export type Direction = 'up' | 'down';
export interface MoveCellAction {
	type: ActionType.MOVE_CELL;
	payload: {
		id: string;
		direction: Direction;
	};
}
export interface DeleteCellAction {
	type: ActionType.DELETE_CELL;
	payload: string;
}
export interface UpdateCellAction {
	type: ActionType.UPDATE_CELL;
	payload: {
		id: string;
		content: string;
	};
}
export interface InsertBeforeCellAction {
	type: ActionType.INSERT_CELL_BEFORE;
	payload: {
		id: string | null;
		type: CellTypes;
	};
}
export interface BundleStartAction {
	type: ActionType.BUNDLE_START;
	payload: {
		cellId: string;
	};
}
export interface BundleCompleteAction {
	type: ActionType.BUNDLE_COMPLETE;
	payload: {
		cellId: string;
		bundle: {
			code: string;
			error: string;
		};
	};
}
export interface FetchCellAction {
	type: ActionType.FETCH_CELLS;
}
export interface FetchCellCompleteAction {
	type: ActionType.FETCH_CELLS_COMPLETE;
	payload: Cell[];
}
export interface FetchCellCompleteError {
	type: ActionType.FETCH_CELLS_ERROR;
	payload: string;
}
export interface SaveCellsErrorAction {
	type: ActionType.SAVE_CELLS_ERROR;
	payload: string;
}

export type Actions =
	| MoveCellAction
	| DeleteCellAction
	| UpdateCellAction
	| InsertBeforeCellAction
	| BundleStartAction
	| BundleCompleteAction
	| FetchCellAction
	| FetchCellCompleteAction
	| FetchCellCompleteError
	| SaveCellsErrorAction;
