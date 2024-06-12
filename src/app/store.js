
import { configureStore } from "@reduxjs/toolkit";
import { searchPhotosSlice } from "../features/searchPhotos/searchPhotosSlice";
import { favouritePhotosSlice } from "../features/favouritesPhotos/favouritePhotosSlice";


export const store = configureStore({
  reducer: {
    searchPhotos: searchPhotosSlice.reducer,
    favouritePhotos: favouritePhotosSlice.reducer
  }
})


export const listPhotos = async (page, per_page, words = "") => {

  let url = `https://api.unsplash.com/photos?page=${page}&per_page=${per_page}`;
  const hasQuery = words.trim().length;

  if (hasQuery)
    url = `https://api.unsplash.com/search/photos?page=${page}&per_page=${per_page}&query=${words}`


  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`
    }
  });

  const jsonData = await response.json();

  return hasQuery ? jsonData : { results: jsonData };

}