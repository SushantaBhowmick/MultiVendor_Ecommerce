import { configureStore } from '@reduxjs/toolkit'
import { userReducers } from './reducers/user';

const Store = configureStore({
    reducer:{
        user:userReducers,
    }
});


export default Store;