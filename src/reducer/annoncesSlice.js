import { createSlice } from '@reduxjs/toolkit';

export const annoncesSlice = createSlice({
    name: 'annonces',
    initialState: {
        value: [
            { id:0 , title:'Ecran Samsung', description:"Très bon écran samsung", prix:"100$" }, 
            { id:1 , title:'Ecran Sony', description:"Très bon écran Sony", prix:"110$"},
            { id:2 , title:'MacBook air', description:"Très bon écran Sony", prix:"1110$"}
        ]
    },
    reducers: {
        add: (state, action) => {
            state.value = [...state.value, action.payload]
        }
    }
});

export const { add } = annoncesSlice.actions;

export const selectValue = state => state.annonces.value;

export default annoncesSlice.reducer;