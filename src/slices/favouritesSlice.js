import { createSlice } from '@reduxjs/toolkit';

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState: localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [],
    reducers: {
        setFavouriteItems: (state, action) => {
            return action.payload;
        },
        resetFavouriteItems: (state, action) => {
            return [];
        }
    }
});

export const { setFavouriteItems, resetFavouriteItems } = favouritesSlice.actions;

export default favouritesSlice.reducer;
