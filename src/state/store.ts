import { applyMiddleware, combineReducers, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import queryBrowser, {
  initialState as queryBrowserState,
} from './queryBrowser';

const rootReducer = combineReducers({
  queryBrowser,
});

export type RootState = ReturnType<typeof rootReducer>;

const initialState: RootState = {
  queryBrowser: queryBrowserState,
};

const enhancer = applyMiddleware(reduxThunk);

export const configureStore = () => {
  return createStore(rootReducer, initialState, enhancer);
};
