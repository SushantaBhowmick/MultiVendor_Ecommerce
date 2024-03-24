import { createReducer } from "@reduxjs/toolkit";

const initialState={
    isAuthenticated:false,
}

export const userReducers = createReducer(initialState,{
    LoadUserRequest:(state)=>{
        state.loading=true;
    },
    LoadUserSuccess:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.user=action.payload;
    },
    LoadUserFail:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.error=action.payload;
    },

    // update user info
    updateUserInfoRequest:(state)=>{
        state.infoLoading=true;
    },
    updateUserInfoSuccess:(state,action)=>{
        state.infoLoading=false;
        state.user=action.payload.user;
        state.message=action.payload.message;
    },
    updateUserInfoFail:(state,action)=>{
        state.infoLoading=false;
        state.error=action.payload;
    },


    // update user address
    updateUserAddressRequest:(state)=>{
        state.addressLoading=true;
    },
    updateUserAddressSuccess:(state,action)=>{
        state.addressLoading=false;
        state.user=action.payload.user;
        state.message=action.payload.message;
    },
    updateUserAddressFail:(state,action)=>{
        state.addressLoading=false;
        state.error=action.payload;
    },

    // update user address
    deleteUserAddressRequest:(state)=>{
        state.addressLoading=true;
    },
    deleteUserAddressSuccess:(state,action)=>{
        state.addressLoading=false;
        state.user=action.payload.user;
        state.message=action.payload.message;
    },
    deleteUserAddressFail:(state,action)=>{
        state.addressLoading=false;
        state.error=action.payload;
    },



    clearErrors:(state)=>{
        state.error=null;
    },
    clearMessages:(state)=>{
        state.message=null;
    }
});