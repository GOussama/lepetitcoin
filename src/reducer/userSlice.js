import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name:'rakoto',
        firstname: 'mamy',
        email: 'rakoto@gmail.com',
        sex: 'male',
        dateOfBirth: ''
    },
    reducers: {
        addUser: (state, action) => {
            state.name = action.payload.name;
            state.firstname = action.payload.firstname;
            state.email = action.payload.email;
            state.sex = action.payload.sex;
            state.dateOfBirth = action.payload.dateOfBirth;
        },
        connection: (state, action) => {
            state.name = action.payload.name;
            state.firstname = action.payload.firstname;
            state.email = action.payload.email;
            state.sex = action.payload.sex;
            state.dateOfBirth = action.payload.dateOfBirth;
        },
        logout: state => {
            state = {};
        }
    }
});

export const { addUser, connection } = userSlice.actions;

export const selectLogin = state => state.user.email;

export default userSlice.reducer;