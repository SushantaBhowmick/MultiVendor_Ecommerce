import { createReducer } from "@reduxjs/toolkit";

const initialState={
    isSeller:false,
}

export const sellerReducers = createReducer(initialState,{
    LoadSellerRequest:(state)=>{
        state.isLoading=true;
    },
    LoadSellerSuccess:(state,action)=>{
        state.isLoading=false;
        state.isSeller=true;
        state.seller=action.payload;
    },
    LoadSellerFail:(state,action)=>{
        state.isLoading=false;
        state.isSeller=false;
        state.error=action.payload;
    },

    clearErrors:(state)=>{
        state.error=null;
    },
    clearMessages:(state)=>{
        state.message=null;
    }
});