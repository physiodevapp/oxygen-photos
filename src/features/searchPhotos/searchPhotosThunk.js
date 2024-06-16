
import { createAsyncThunk } from "@reduxjs/toolkit";


export const searchPhotosThunk = createAsyncThunk("searchPhotos", async ({page, per_page, term = "", isNewTerm = true}) => {
  console.log('request to API');
  let url = `https://api.unsplash.com/photos/random?count=${per_page}`
  const hasQuery = term.trim().length;

  if (hasQuery)
    url = `https://api.unsplash.com/search/photos?page=${page}&per_page=${per_page}&query=${term}`
  
  let response;
  let jsonData;
  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`
      }
    });
  } catch (error) {
    throw new Error(`Error while trying to fetch data from API ${error}`)
  }

  try {
    jsonData = await response.json();
  } catch (error) {
    throw new Error(`Error while trying to convert the response to json format ${error}`)
  }

  const photos = hasQuery ? { ...jsonData, isNewTerm } : { results: jsonData, isNewTerm }

  console.log('photos --> ', photos);

  return {
    isNewTerm: isNewTerm,
    photos: photos.results.map((photo) => (
      {
        alt_description: photo.alt_description,
        id: photo.id,
        description: photo.description || "This photo has no description yet. Add it to your favourites and create one!",
        created_at: new Date(photo.created_at).getTime(),
        likes: photo.likes,
        urls: photo.urls,
        width: photo.width,
        height: photo.height
      }
  
    ))

  }
  
})