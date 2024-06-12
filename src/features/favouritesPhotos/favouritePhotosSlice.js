import { createSlice } from "@reduxjs/toolkit";


export const favouritePhotosSlice = createSlice({
  name: "favouritePhotos",
  initialState: {
    data: []
  },
  reducers: {
    load: (state, action) => {
      const localStorageFavourites = JSON.parse(localStorage.getItem("favouritesPhotos"));
      if (localStorageFavourites)
        state.data = localStorageFavourites
    },
    addRemove: (state, action) => {
      if (!state.data.find((photo) => photo.id === action.payload.id)) {
        state.data.push(action.payload)
      } else {
        state.data = state.data.filter((photo) => photo.id !== action.payload.id)
      }
      localStorage.setItem("favouritesPhotos", JSON.stringify(state.data))
    },
    updateDescription: (state, action) => {
      console.log({action});
      state.data.map((photo) => {
        if (photo.id === action.payload.id)
          photo.description = action.payload.description;
      })
      localStorage.setItem("favouritesPhotos", JSON.stringify(state.data))
    },
    search: (state, action) => {
      state
    },
    download: (state, action) => {
      state
    }
  }
})

export const { load, addRemove, updateDescription, search, download } = favouritePhotosSlice.actions;

export const favouritePhotosDataSelect = (state) => state.favouritePhotos.data