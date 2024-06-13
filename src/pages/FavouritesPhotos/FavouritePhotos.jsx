
// import { GalleryComponent } from '../../components/Gallery/GalleryComponent';
import React, { useContext, useEffect, useState } from 'react'
import { NavBarComponent } from '../../components/NavBar/NavBarComponent';
import { DetailPhotoContext } from '../../contexts/DetailPhotoContext';
import { useSelector } from 'react-redux';
import { favouritePhotosDataSelect } from '../../features/favouritesPhotos/favouritePhotosSlice';
import { CardImageComponent } from '../../components/CardImage/CardImageComponent';
import { DetailModalComponent } from '../../components/DetailModal/DetailModalComponent';

export const FavouritePhotosPage = () => {

  const { detailPhoto, modalStatus } = useContext(DetailPhotoContext);

  const [searchTerm, setSearchTerm] = useState('');  

  const favouritePhotosData = useSelector(favouritePhotosDataSelect);
  const [filteredPhotos, setFilteredPhotos] = useState(favouritePhotosData);

  const [sortByField, setSortByField] = useState(null);

  useEffect(() => {
    setFilteredPhotos(() => (
      [...favouritePhotosData].filter((photo) => photo.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
    ))
  }, [searchTerm, favouritePhotosData])

  useEffect(() => {
    if (!sortByField)
      return 

    const  compareFunction = (photo, nextPhoto) => {
      if (photo[sortByField] - nextPhoto[sortByField] < 0)
        return 1
      else if (photo[sortByField] - nextPhoto[sortByField] > 0)
        return -1
      
      return 0
    }

    setFilteredPhotos(() => [...filteredPhotos.sort(compareFunction)])
  }, [sortByField, favouritePhotosData])
  
  
  return (
    <>
    {
      (!detailPhoto || modalStatus !== 'open') && 
      <NavBarComponent sortBySelected={sortByField} watchSearchTerm={(newSearchTerm) => setSearchTerm(newSearchTerm)} watchSortBy={(field) => setSortByField(field)}/>
    }
    <main className={`gallery ${modalStatus === 'open' ? 'freeze' : ''}`}>
    { filteredPhotos.map((photo) => <CardImageComponent photo={photo} key={photo.id} />) }
    </main>
    { detailPhoto && <DetailModalComponent canEdit={true}/> }
    </>
  )
}

