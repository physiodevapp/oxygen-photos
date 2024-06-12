import { useDispatch } from "react-redux";
import { SearchPhotos } from "./pages/SearchPhotosPage";
import { useEffect } from "react";
import { load } from "./features/favouritesPhotos/favouritePhotosSlice"

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(load())
  }, [])

  return (
    <>
      <SearchPhotos/>
    </>
  )
  
}

export default App
