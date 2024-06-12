import { useDispatch } from "react-redux";
import { SearchPhotos } from "./pages/SearchPhotosPage";
import { useEffect } from "react";
import { load } from "./features/favouritesPhotos/favouritePhotosSlice"
import { DetailPhotoProvider } from "./contexts/DetailPhotoProvider";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(load())
  }, [])

  return (
    <>
      <DetailPhotoProvider>
        <SearchPhotos/>
      </DetailPhotoProvider>
    </>
  )
  
}

export default App
