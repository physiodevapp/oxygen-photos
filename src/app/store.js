
import { configureStore } from "@reduxjs/toolkit";
import { searchPhotosSlice } from "../features/searchPhotos/searchPhotosSlice";
import { favouritePhotosSlice } from "../features/favouritesPhotos/favouritePhotosSlice";


export const store = configureStore({
  reducer: {
    searchPhotos: searchPhotosSlice.reducer,
    favouritePhotos: favouritePhotosSlice.reducer
  }
})
