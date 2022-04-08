import { CellTypes } from '../cell';
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

export type Actions =
	| MoveCellAction
	| DeleteCellAction
	| UpdateCellAction
	| InsertBeforeCellAction
	| BundleStartAction
	| BundleCompleteAction;
