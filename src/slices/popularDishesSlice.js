import { createSlice } from '@reduxjs/toolkit';

const popularDishesSlice = createSlice({
    name: 'popularDishes',
    initialState: [],
    reducers: {
        setPopularDishes: (state, action) => {
            return action.payload;
        },
        resetPopularDishes: () => {
            return [];
        }
    }
});

export const { setPopularDishes, resetPopularDishes } = popularDishesSlice.actions;
export default popularDishesSlice.reducer;
