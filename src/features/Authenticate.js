import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isAuthenticated : false,
    session_id: ''
}

const authSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUser : (state,action)=> {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.session_id = localStorage.getItem('session_id');
            localStorage.setItem('accoundId', action.payload.id)
         },

    }
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer;
export const userSelector = (state) => state.user;