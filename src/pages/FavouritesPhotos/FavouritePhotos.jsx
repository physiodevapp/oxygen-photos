
// import { GalleryComponent } from '../../components/Gallery/GalleryComponent';
import React, { useContext, useEffect, useState } from 'react'
import { NavBarComponent } from '../../components/NavBar/NavBarComponent';
import { DetailPhotoContext } from '../../contexts/DetailPhotoContext';
import { useSelector } from 'react-redux';
import { favouritePhotosDataSelect } from '../../features/favouritesPhotos/favouritePhotosSlice';
import { CardImageComponent } from '../../components/CardImage/CardImageComponent';
import { DetailModalComponent } from '../../components/DetailModal/DetailModalComponent';
import { SkeletonComponent } from '../../components/Skeleton/SkeletonComponent';
import { ImageNotFoundComponent } from '../../components/ImageNotFound/ImageNotFoundComponent';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export const FavouritePhotosPage = () => {

  const { detailPhoto, modalStatus } = useContext(DetailPhotoContext);

  const [searchTerm, setSearchTerm] = useState('');  
  const [hasSearchTermChanged, setHasSearchTermChanged] = useState(false);

  const favouritePhotosData = useSelector(favouritePhotosDataSelect);
  const [filteredPhotos, setFilteredPhotos] = useState(favouritePhotosData);

  const [isLoadingData, setIsLoadingData] = useState(true);

  const [sortByField, setSortByField] = useState('');

  const watchSearchTerm = (newSearchTerm) => {
    setHasSearchTermChanged(newSearchTerm !== searchTerm);

    setSearchTerm(newSearchTerm);

    setIsLoadingData(true);

    setFilteredPhotos(() => {
      let filteredPhotos;
      if (newSearchTerm === "")
        filteredPhotos = [...favouritePhotosData]
      else
        filteredPhotos = [...favouritePhotosData].filter((photo) => photo.description.toLowerCase().indexOf(newSearchTerm.toLowerCase()) !== -1)
    
      return filteredPhotos;
    })

    setTimeout(() => setIsLoadingData(false), 1000);
  }

  useEffect(() => {
    if (sortByField) {
      setIsLoadingData(true);
      const  compareFunction = (photo, nextPhoto) => {
        if (photo[sortByField] - nextPhoto[sortByField] < 0)
          return 1
        else if (photo[sortByField] - nextPhoto[sortByField] > 0)
          return -1
        
        return 0
      }

      setFilteredPhotos(() => [...filteredPhotos].sort(compareFunction));

    } else {
      setFilteredPhotos(favouritePhotosData);
    }

    setTimeout(() => setIsLoadingData(false), 1000);
  }, [sortByField, favouritePhotosData])
  
  
  return (
    <>
    <NavBarComponent 
      filteredPhotos={filteredPhotos} 
      sortBySelected={sortByField} 
      watchSearchTerm={watchSearchTerm} 
      watchSortBy={(field) => setSortByField(field)}
      />

    <main className={`gallery${modalStatus === 'open' ? ' freeze' : ''}${isLoadingData ? ' hide' : ''}`}>
      <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200: 4}}>
        <Masonry gutter={"0.6em"}>
        { filteredPhotos.map((photo) => <CardImageComponent photo={photo} key={photo.id} />) }
        </Masonry>
      </ResponsiveMasonry>         
    </main>

    { !isLoadingData && !filteredPhotos.length &&
      <ImageNotFoundComponent/>
    }

    { isLoadingData && <SkeletonComponent quantity={10}/> }

    { detailPhoto && <DetailModalComponent canEdit={true}/> }
    </>
  )
}

