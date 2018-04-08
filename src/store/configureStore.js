import { createStore, combineReducers } from 'redux';

import gameReducer from '../reducers/GameReducer';
import userReducer from '../reducers/UserReducer';



export default () => {
    const store = createStore(combineReducers({
        game: gameReducer,
        user: userReducer        
    }), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return store;
};
