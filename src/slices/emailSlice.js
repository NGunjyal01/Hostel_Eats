import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    canProceed: false,
};

const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setCanProceed: (state, action) => {
            state.canProceed = action.payload;
        },
        clearEmail: (state) => {
            state.email = '';
        },
    },
});

export const { setEmail, setCanProceed, clearEmail } = emailSlice.actions;
export default emailSlice.reducer;
