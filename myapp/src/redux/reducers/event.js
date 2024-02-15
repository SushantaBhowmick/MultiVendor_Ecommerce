
import {createReducer} from '@reduxjs/toolkit'

const initialState = {
    isLoading:true,
}

export const eventReducer = createReducer(initialState,{
    // Create event
    eventCreateRequest:(state)=>{
        state.isLoading=true;
    },
    eventCreateSuccess:(state,action)=>{
        state.isLoading=false;
        state.event = action.payload;
        state.message = action.payload;
        state.success= true;
    },
    eventCreateFail:(state,action)=>{
        state.isLoading=false;
        state.error = action.payload;
        state.success= false;
    },

    // Get all events shop
    getAlleventShopRequest:(state)=>{
        state.isLoading=true;
    },
    getAlleventShopSuccess:(state,action)=>{
        state.isLoading=false;
        state.events = action.payload;
    },
    getAlleventShopFail:(state,action)=>{
        state.isLoading=false;
        state.error = action.payload;
    },

    // delete events shop
    deleteeventShopRequest:(state)=>{
        state.isLoading=true;
    },
    deleteeventShopSuccess:(state,action)=>{
        state.isLoading=false;
        state.message = action.payload;
    },
    deleteeventShopFail:(state,action)=>{
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