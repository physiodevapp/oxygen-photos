import { createAsyncThunk } from "@reduxjs/toolkit";
import { listPhotos } from "../../app/store";



export const searchPhotosThunk = createAsyncThunk("searchPhotos", async ({page, per_page}) => {

  const jsonData = await listPhotos(page, per_page);

  return jsonData;
  
})