import { configureStore } from '@reduxjs/toolkit'
import { userReducers } from './reducers/user';
import { sellerReducers } from './reducers/seller';
import { productReducer } from './reducers/product';
import { eventReducer } from './reducers/event';

const Store = configureStore({
    reducer:{
        user:userReducers,
        seller:sellerReducers,
        product:productReducer,
        event:eventReducer,
    }
});


export default Store;