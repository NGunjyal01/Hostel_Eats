import { createSlice } from '@reduxjs/toolkit';

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState: [],
    reducers: {
        toggleFavourite: (state, action) => {
            const item = action.payload;
            const index = state.findIndex(fav => fav.itemid === item.itemid);
            if (index !== -1) {
                return state.filter(fav => fav.itemid !== item.itemid);
            } else {
                return [...state, item];
            }
        }
    }
});

export const { toggleFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;
