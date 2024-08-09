import { createSlice } from "@reduxjs/toolkit";

const paginationData = localStorage.getItem('pagination') ? JSON.parse(localStorage.getItem('pagination')) : null ;

const paginationSlice =  createSlice({
    name: 'Pagination',
    initialState: {
        allItems: paginationData ? paginationData.allItems : [],
        currentItems: paginationData ? paginationData.currentItems : [],
        itemsPerPage: paginationData ? paginationData.itemsPerPage : null,
        currentPageNo: paginationData ? paginationData.currentPageNo : 1,
        scrollTo: paginationData ? paginationData.scrollTo : null,
    },
    reducers:{
        setPagination: (state,action)=>{
            state.allItems = action.payload.allItems;
            state.currentItems = action.payload.currentItems;
            state.itemsPerPage = action.payload.itemsPerPage;
            state.currentPageNo = action.payload.currentPageNo;
            state.scrollTo = action.payload.scrollTo;
        },
        resetPagination: (state,action)=>{
            state.allItems = [];
            state.currentItems = [];
            state.itemsPerPage = null;
            state.currentPageNo = 1;
            state.scrollTo = null;
        }
    }
});

export const { setPagination,resetPagination } = paginationSlice.actions;
export default paginationSlice.reducer;