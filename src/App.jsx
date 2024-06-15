import { useDispatch } from "react-redux";
import { SearchPhotosPage } from "./pages/SearchPhotos/SearchPhotosPage";
import { useEffect } from "react";
import { loadFromStorage } from "./features/favouritesPhotos/favouritePhotosSlice"
import { DetailPhotoProvider } from "./contexts/DetailPhotoProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FavouritePhotosPage } from "./pages/FavouritesPhotos/FavouritePhotos";
import { HeaderComponent } from "./components/Header/HeaderComponent";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [])


  return (
    <>
      <DetailPhotoProvider>
        <BrowserRouter>
          <HeaderComponent/>
          <ToastContainer/>
          <Routes>
            <Route path="/" element={<SearchPhotosPage/>}/>
            <Route path="/favourites" element={<FavouritePhotosPage/>}/> 
          </Routes>
        </BrowserRouter> 
      </DetailPhotoProvider>
    </>
  )
  
}

export default App
