import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { ActionType } from './action-types';
import reducers from './reducers';

export const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch({ type: ActionType.INSERT_CELL_BEFORE, payload: { id: null, type: 'text' } });
store.dispatch({ type: ActionType.INSERT_CELL_BEFORE, payload: { id: null, type: 'code' } });
