import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/userSlice';
import annoncesReducer from '../reducer/annoncesSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        annonces: annoncesReducer,
    }
});