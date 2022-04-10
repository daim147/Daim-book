import { Middleware } from 'redux';
import { saveCells } from '../action-creator';
import { ActionType } from '../action-types';
import { Actions } from '../actions';
import { RootState } from '../reducers';
//this store is not same like redux store so we are dispatching action like this
export const persistMiddleware: Middleware<{}, RootState> = ({
	dispatch,
	getState,
}) => {
	let timer: any;
	return (next) => {
		return (action: Actions) => {
			next(action);
			if (
				[
					ActionType.MOVE_CELL,
					ActionType.DELETE_CELL,
					ActionType.INSERT_CELL_BEFORE,
					ActionType.UPDATE_CELL,
				].includes(action.type)
			) {
				if (timer) {
					clearTimeout(timer);
				}
				timer = setTimeout(() => {
					saveCells()(dispatch, getState);
				}, 1000);
			}
		};
	};
};
