import { createSlice } from "@reduxjs/toolkit";

const editorSlice = createSlice({
    name:"editor",
    initialState:{
        content:""
    },
    reducers:{
        setContent:(state,action)=>{
            state.content=action.payload
        }
    }
})

export const {setContent} = editorSlice.actions;
export default editorSlice.reducer;

