import { useDispatch } from "react-redux";
import { SearchPhotosPage } from "./pages/SearchPhotos/SearchPhotosPage";
import { useEffect } from "react";
import { loadFromStorage } from "./features/favouritesPhotos/favouritePhotosSlice"
import { DetailPhotoProvider } from "./contexts/DetailPhotoProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FavouritePhotosPage } from "./pages/FavouritesPhotos/FavouritePhotos";
import { HeaderComponent } from "./components/Header/HeaderComponent";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStorage());

    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      const stickyHeight = navbar.offsetTop;

      if (window.scrollY > stickyHeight)
        navbar.classList.add("sticky")
      else
        navbar.classList.remove("sticky")

    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])


  return (
    <>
      <DetailPhotoProvider>
        <HeaderComponent/>
        <BrowserRouter>
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
