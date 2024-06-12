import { createAsyncThunk } from "@reduxjs/toolkit";
import { listPhotos } from "../../app/store";



export const searchPhotosThunk = createAsyncThunk("searchPhotos", async ({page, per_page}) => {

  const jsonData = await listPhotos(page, per_page);

  return jsonData.results.map((photo) => (
    {
      alt_description: photo.alt_description,
      id: photo.id,
      description: photo.description,
      created_at: photo.created_at,
      likes: photo.likes,
      urls: photo.urls,
      width: photo.width,
      height: photo.height
    }
  ))
  
})