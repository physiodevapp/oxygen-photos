
import { createAsyncThunk } from "@reduxjs/toolkit";


export const searchPhotosThunk = createAsyncThunk("searchPhotos", async ({page, per_page, words = ""}) => {

  // let url = `https://api.unsplash.com/photos?page=${page}&per_page=${per_page}`;
  let url = `https://api.unsplash.com/photos/random?count=${per_page}`
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

  const photos = hasQuery ? jsonData : { results: jsonData }

  console.log(photos);

  return photos.results.map((photo) => (
    {
      alt_description: photo.alt_description,
      id: photo.id,
      description: photo.description || "This photo has no description yet. Add it to your favourites and create one!",
      created_at: photo.created_at,
      likes: photo.likes,
      urls: photo.urls,
      width: photo.width,
      height: photo.height
    }

  ))
  
})