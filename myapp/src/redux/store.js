import { configureStore } from '@reduxjs/toolkit'
import { userReducers } from './reducers/user';
import { sellerReducers } from './reducers/seller';

const Store = configureStore({
    reducer:{
        user:userReducers,
        seller:sellerReducers
    }
});


export default Store;