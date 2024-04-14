
import {createReducer} from '@reduxjs/toolkit'

const initialState = {
    isOrderLoading:true,
}

export const orderReducer = createReducer(initialState,{
    // get all orders of an user
    getAllOrdersUserRequest:(state)=>{
        state.isOrderLoading=true;
    },
    getAllOrdersUserSuccess:(state,action)=>{
        state.isOrderLoading=false;
        state.orders = action.payload;
    },
    getAllOrdersUserFail:(state,action)=>{
        state.isOrderLoading=false;
        state.error = action.payload;
    },
    
    // get all orders by shop
    getAllOrdersSellerRequest:(state)=>{
        state.isOrderLoading=true;
    },
    getAllOrdersSellerSuccess:(state,action)=>{
        state.isOrderLoading=false;
        state.shopOrders = action.payload;
    },
    getAllOrdersSellerFail:(state,action)=>{
        state.isOrderLoading=false;
        state.error = action.payload;
    },


    clearErrors:(state)=>{
        state.error=null
    },
    clearMessages:(state)=>{
        state.message=null
    },
})