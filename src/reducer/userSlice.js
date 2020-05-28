import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name:'',
        firstname: '',
        email: '',
        sex: '',
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
            state.name = '';
            state.firstname = '';
            state.email = '';
            state.sex = '';
            state.dateOfBirth = '';
        }
    }
});

export const { addUser, connection, logout } = userSlice.actions;

export const selectLogin = state => state.user.email;

export default userSlice.reducer;