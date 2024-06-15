import { createSlice } from "@reduxjs/toolkit";
import { Bounce, Slide, toast } from "react-toastify";

export const favouritePhotosSlice = createSlice({
  name: "favouritePhotos",
  initialState: {
    data: []
  },
  reducers: {
    loadFromStorage: (state) => {
      const localStorageFavourites = JSON.parse(localStorage.getItem("favouritesPhotos"));
      if (localStorageFavourites)
        state.data = localStorageFavourites
    },
    addRemove: (state, action) => {
      if (!state.data.find((photo) => photo.id === action.payload.id)) {
        state.data.push(action.payload);
        toast('Added to your favourites!', {
          position: `${window.innerWidth > "480" ? "top-right" : "top-center"}`,
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          style: window.innerWidth > "480" ? {top: "0em", left: "0%", width: "100%", borderRadius: "0.8em", background: "#000000a8", filter: "drop-shadow(2px 4px 6px black)", border: "0px solid #ffffff80", fontSize: "1.4rem", paddingLeft: "1em"} : {top: "0.7em", left: "2.5%", width: "95%", borderRadius: "0.8em", background: "#000000a8", filter: "drop-shadow(2px 4px 6px black)", border: "0px solid #ffffff80", fontSize: "1.4rem", paddingLeft: "1em"}
        })
      } else {
        state.data = state.data.filter((photo) => photo.id !== action.payload.id);
      }
      localStorage.setItem("favouritesPhotos", JSON.stringify(state.data))
    },
    updateDescription: (state, action) => {
      state.data.map((photo) => {
        if (photo.id === action.payload.id)
          photo.description = action.payload.description;
      })
      localStorage.setItem("favouritesPhotos", JSON.stringify(state.data))
    }
  }
})

export const { loadFromStorage, addRemove, updateDescription } = favouritePhotosSlice.actions;

export const favouritePhotosDataSelect = (state) => state.favouritePhotos.data