

import React, { useEffect, useState } from 'react'
import { GalleryComponent } from '../components/Gallery/GalleryComponent';
import { searchPhotosDataSelect, searchPhotosErrorSelect, searchPhotosStatusSelect } from '../features/searchPhotos/searchPhotosSlice';
import { searchPhotosThunk } from '../features/searchPhotos/searchPhotosThunk';
import { SearchBarComponent } from '../components/SearchBar/SearchBarComponent';

export const SearchPhotos = () => {

  const [searchTerm, setSearchTerm] = useState('')  
  const [hasChangedSearchTerm, setHasChangedSearchTerm] = useState(false);

  const watchSearchTerm = (newSearchTerm) => {
    setHasChangedSearchTerm(!(newSearchTerm === searchTerm));
    setSearchTerm(newSearchTerm);
  }
  

  return (
    <>
      <SearchBarComponent watchSearchTerm={watchSearchTerm}/>
      <GalleryComponent 
        searchTerm={searchTerm}
        hasChangedSearchTerm={hasChangedSearchTerm}
        dataSelect={searchPhotosDataSelect}
        errorSelect={searchPhotosErrorSelect}
        statusSelect={searchPhotosStatusSelect}
        getPhotos={searchPhotosThunk}
      />
    </>
  )
}
