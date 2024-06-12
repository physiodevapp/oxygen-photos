import React, { useState } from "react";
import { DetailPhotoContext } from "./DetailPhotoContext";

export const DetailPhotoProvider = ({children}) => {
  const [detailPhoto, setDetailPhoto] = useState(null);

  return (
    <DetailPhotoContext.Provider value={{detailPhoto, setDetailPhoto}}>
      {children}
    </DetailPhotoContext.Provider>
  )
};
