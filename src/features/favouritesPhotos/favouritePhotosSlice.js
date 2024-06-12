import { createSlice } from "@reduxjs/toolkit";


export const favouritePhotosSlice = createSlice({
  name: "favouritePhotos",
  initialState: {
    data: []
  },
  reducers: {
    load: (state, action) => {
      if (JSON.parse(localStorage.getItem("favouritesPhotos")))
        state.data = JSON.parse(localStorage.getItem("favouritesPhotos"))
    },
    add: (state, action) => {
      if (!state.data.find((photo) => photo.id === action.payload.id)) {
        state.data.push(action.payload)
        localStorage.setItem("favouritesPhotos", JSON.stringify(state.data))
      }
    },
    remove: (state, action) => {
      state
    },
    isFavourite: (state, action) => {
      return false
    },
    updateDescription: (state, action) => {
      state
    },
    search: (state, action) => {
      state
    },
    download: (state, action) => {
      state
    }
  }
})

export const { load, add, remove, isFavourite, updateDescription, search, download } = favouritePhotosSlice.actions;

export const favouritePhotosDataSelect = (state) => state.favouritePhotos.data