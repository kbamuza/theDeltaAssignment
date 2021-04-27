import {createStore, combineReducers} from 'redux'
// import {userRouter} from './user'
import {storeReducer} from '../Reducers/StoreReducers';
  
const rootReducer = combineReducers({
    storeReducer: storeReducer
})

export const applicationStateStore = createStore(rootReducer)
