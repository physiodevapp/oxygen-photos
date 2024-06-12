import React, { useState } from "react";
import { DetailPhotoContext } from "./DetailPhotoContext";
import { useSelector } from "react-redux";
import { favouritePhotosDataSelect } from "../features/favouritesPhotos/favouritePhotosSlice";

export const DetailPhotoProvider = ({children}) => {
  const [detailPhoto, setDetailPhoto] = useState(null);
  const [modalStatus, setModalStatus] = useState(null);

  const favouritePhotosData = useSelector(favouritePhotosDataSelect);

  if (detailPhoto)
    document.body.style.setProperty("overflow", "hidden");
  else
    document.body.style.setProperty("overflow", "auto");

  const toggleModal = (mode, photo) => {
    
    if (mode === 'open') {
      setDetailPhoto(photo)
      setTimeout(() => {
        setModalStatus(mode)
      }, 100);
    } else if (mode === 'close') {
      setModalStatus(mode)
      setTimeout(() => {
        setModalStatus(null)
        setDetailPhoto(null)
      }, 500);
    }

  }

  return (
    <DetailPhotoContext.Provider value={{detailPhoto, modalStatus, toggleModal}}>
      {children}
    </DetailPhotoContext.Provider>
  )
};
