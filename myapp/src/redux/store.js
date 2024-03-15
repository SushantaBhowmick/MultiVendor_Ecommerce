import { configureStore } from '@reduxjs/toolkit'
import { userReducers } from './reducers/user';
import { sellerReducers } from './reducers/seller';
import { productReducer } from './reducers/product';
import { eventReducer } from './reducers/event';
import { cartReducer } from './reducers/cart';
import { wishlistReducer } from './reducers/wishlist';

const Store = configureStore({
    reducer:{
        user:userReducers,
        seller:sellerReducers,
        product:productReducer,
        event:eventReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
    }
});


export default Store;