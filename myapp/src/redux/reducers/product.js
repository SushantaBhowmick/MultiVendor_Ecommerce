
import {createReducer} from '@reduxjs/toolkit'

const initialState = {
    isLoading:true,
}

export const productReducer = createReducer(initialState,{
    // Create product
    productCreateRequest:(state)=>{
        state.isLoading=true;
    },
    productCreateSuccess:(state,action)=>{
        state.isLoading=false;
        state.product = action.payload;
        state.success= true;
    },
    productCreateFail:(state,action)=>{
        state.isLoading=false;
        state.error = action.payload;
        state.success= false;
    },

    // Get all products shop
    getAllProductShopRequest:(state)=>{
        state.isLoading=true;
    },
    getAllProductShopSuccess:(state,action)=>{
        state.isLoading=false;
        state.products = action.payload;
        state.success= true;
    },
    getAllProductShopFail:(state,action)=>{
        state.isLoading=false;
        state.error = action.payload;
        state.success= false;
    },



    clearErrors:(state)=>{
        state.error=null
    },
    clearMessages:(state)=>{
        state.message=null
    },
})