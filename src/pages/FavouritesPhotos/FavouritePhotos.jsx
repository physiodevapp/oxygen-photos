
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
  const [hasSearchTermChanged, setHasSearchTermChanged] = useState(false);

  const favouritePhotosData = useSelector(favouritePhotosDataSelect);
  const [filteredPhotos, setFilteredPhotos] = useState(favouritePhotosData);

  const [isLoadingData, setIsLoadingData] = useState(true);

  const [sortByField, setSortByField] = useState(null);

  const watchSearchTerm = (newSearchTerm) => {

    setSearchTerm(newSearchTerm);

    if (newSearchTerm === searchTerm)
      setHasSearchTermChanged(false)
    else
      setHasSearchTermChanged(true)

  }

  useEffect(() => {
    setIsLoadingData(true)
    setTimeout(() => {
      setIsLoadingData(false)

      setFilteredPhotos(() => {
        let filteredPhotos;
        if (searchTerm === ""  || searchTerm === "random") {
          filteredPhotos = [...favouritePhotosData]
        } else {
          filteredPhotos = [...favouritePhotosData].filter((photo) => photo.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
        }
      
        return filteredPhotos

      })
      
    }, 1500);


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

    setIsLoadingData(true)
    setTimeout(() => {
      setIsLoadingData(false)
      
      setFilteredPhotos(() => [...filteredPhotos.sort(compareFunction)])

    }, 1500);

  }, [sortByField, favouritePhotosData])
  
  
  return (
    <>
    { (!detailPhoto || modalStatus !== 'open') && 
      <NavBarComponent sortBySelected={sortByField} watchSearchTerm={watchSearchTerm} watchSortBy={(field) => setSortByField(field)}/>
    }

    <main className={`gallery${modalStatus === 'open' ? ' freeze' : ''}${isLoadingData ? ' hide' : ''}`}>
    { filteredPhotos.map((photo) => <CardImageComponent photo={photo} key={photo.id} />) }
    </main>

    { (isLoadingData) &&
      <div className='isLoading'>IS LOADING...</div> 
    }

    { detailPhoto && <DetailModalComponent canEdit={true}/> }
    </>
  )
}

