import { createSlice } from '@reduxjs/toolkit';

export const annoncesSlice = createSlice({
    name: 'annonces',
    initialState: {
        value: []
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