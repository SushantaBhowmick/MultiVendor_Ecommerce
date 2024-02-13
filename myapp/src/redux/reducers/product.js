
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
    },
    getAllProductShopFail:(state,action)=>{
        state.isLoading=false;
        state.error = action.payload;
    },

    // delete products shop
    deleteProductShopRequest:(state)=>{
        state.isLoading=true;
    },
    deleteProductShopSuccess:(state,action)=>{
        state.isLoading=false;
        state.message = action.payload;
    },
    deleteProductShopFail:(state,action)=>{
        state.isLoading=false;
        state.error = action.payload;
    },



    clearErrors:(state)=>{
        state.error=null
    },
    clearMessages:(state)=>{
        state.message=null
    },
})