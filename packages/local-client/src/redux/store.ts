import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistMiddleware } from './middlewares/persistMiddleware';
import reducers from './reducers';
export const store = createStore(
	reducers,
	{},
	composeWithDevTools(applyMiddleware(thunk, persistMiddleware))
);
