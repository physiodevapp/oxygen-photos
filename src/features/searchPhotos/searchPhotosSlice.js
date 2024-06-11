import { createSlice } from "@reduxjs/toolkit";
import { searchPhotosThunk } from "./searchPhotosThunk";


export const searchPhotosSlice = createSlice({
  name: "searchPhotos",
  initialState: {
    status: 'idle',
    data: [],
    error: null

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchPhotosThunk.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(searchPhotosThunk.fulfilled, (state, action) => {
        // console.log({action});
        const newData = [...action.payload].filter((jsonPhoto) => JSON.stringify(state.data).search(jsonPhoto.id) === -1); 
        state.data.push(...newData)
        state.status = "fulfilled";
      })
      .addCase(searchPhotosThunk.rejected, (state, action) => {
        console.log('rejected --> ',  action);
        state.status = "rejected"
        state.error = action.error.message;
      })
  }

})

export const searchPhotosStatusSelect = (state) => state.searchPhotos.status;
export const searchPhotosDataSelect = (state) => state.searchPhotos.data;
export const searchPhotosErrorSelect = (state) => state.searchPhotos.error;