import produce from 'immer';
import { ActionType } from '../action-types';
import { Actions } from '../actions';

interface BundleState {
	[key: string]: {
		loading: boolean;
		error: string;
		code: string;
	};
}

const initialState: BundleState = {};

const reducer = produce(
	(state: BundleState = initialState, action: Actions): BundleState => {
		switch (action.type) {
			case ActionType.BUNDLE_START:
				state[action.payload.cellId] = {
					loading: true,
					error: '',
					code: '',
				};
				return state;
			case ActionType.BUNDLE_COMPLETE:
				const { code, error } = action.payload.bundle;
				state[action.payload.cellId] = {
					loading: false,
					error,
					code,
				};
				return state;
			default:
				return state;
		}
	}
);
export default reducer;
