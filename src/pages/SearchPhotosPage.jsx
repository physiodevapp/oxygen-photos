

import React, { useState } from 'react'
import { GalleryComponent } from '../components/Gallery/GalleryComponent';
import { searchPhotosDataSelect, searchPhotosErrorSelect, searchPhotosStatusSelect } from '../features/searchPhotos/searchPhotosSlice';
import { searchPhotosThunk } from '../features/searchPhotos/searchPhotosThunk';

export const SearchPhotos = () => {

  const [searchTerm, setSearchTerm] = useState('')


  return (
    <>
      <GalleryComponent 
        searchTerm={searchTerm}
        dataSelect={searchPhotosDataSelect}
        errorSelect={searchPhotosErrorSelect}
        statusSelect={searchPhotosStatusSelect}
        getPhotos={searchPhotosThunk}
      />
    </>
  )
}
