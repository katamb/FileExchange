import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import modalReducer from './reducers/modalReducer'

const rootReducer = (history) => combineReducers({
    modals: modalReducer,
    router: connectRouter(history)
});

export default rootReducer