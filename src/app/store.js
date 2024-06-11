
import { configureStore } from "@reduxjs/toolkit";
import { searchPhotosSlice } from "../features/searchPhotos/searchPhotosSlice";


export const store = configureStore({
  reducer: {
    searchPhotos: searchPhotosSlice.reducer
  }
})


export const listPhotos = async (page, per_page) => {
  
  const response = await fetch(`https://api.unsplash.com/photos?page=${page}&per_page=${per_page}`, {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`
    }
  });

  const jsonData = await response.json();

  return jsonData;

}