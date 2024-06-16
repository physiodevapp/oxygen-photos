

import React, { useContext, useEffect, useRef, useState } from 'react'
import "./SearchPhotosPage.scss";
import { searchPhotosDataSelect, searchPhotosStatusSelect } from '../../features/searchPhotos/searchPhotosSlice';
import { searchPhotosThunk } from '../../features/searchPhotos/searchPhotosThunk';
import { NavBarComponent } from '../../components/NavBar/NavBarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { DetailPhotoContext } from '../../contexts/DetailPhotoContext';
import { CardImageComponent } from '../../components/CardImage/CardImageComponent';
import { DetailModalComponent } from '../../components/DetailModal/DetailModalComponent';
import { SkeletonComponent } from '../../components/Skeleton/SkeletonComponent';
import { ImageNotFoundComponent } from '../../components/ImageNotFound/ImageNotFoundComponent';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export const SearchPhotosPage = () => {

  const { detailPhoto, modalStatus } = useContext(DetailPhotoContext);

  const [searchTerm, setSearchTerm] = useState('');  
  const [hasSearchTermChanged, setHasSearchTermChanged] = useState(false);

  const loadRef = useRef(null); 

  const dispatch = useDispatch();
  const searchPhotosData = useSelector(searchPhotosDataSelect);
  const searchPhotosStatus = useSelector(searchPhotosStatusSelect);

  const [isLoadingData, setIsLoadingData] = useState(true);

  const [page, setPage] = useState(1);

  const watchSearchTerm = (newSearchTerm) => {
    setHasSearchTermChanged(newSearchTerm !== searchTerm);

    setSearchTerm(newSearchTerm);

    if (newSearchTerm === '') 
      dispatch(searchPhotosThunk({page: 1, per_page: 20}))
    else if (newSearchTerm !== "" && newSearchTerm !== searchTerm) 
      dispatch(searchPhotosThunk({page: 1, per_page: 20, term: newSearchTerm}))
  }

  useEffect(() => {
    switch (searchPhotosStatus) {
      case 'idle': 
        dispatch(searchPhotosThunk({page: 1, per_page: 20}))
        break;

      case 'pending':
        setIsLoadingData(true);
        break;
    
      case 'fulfilled':      
        setTimeout(() => setIsLoadingData(false), 1500);
        break;
      
      case 'rejected':
        setTimeout(() => setIsLoadingData(false), 1500);
        break;

      default:
        break;
    }

  }, [searchPhotosStatus])


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting && window.scrollY && !isLoadingData) {
        dispatch(searchPhotosThunk({page: page + 1, per_page: 20, term: searchTerm, isNewTerm: false}));
        setPage((prevPage) => prevPage + 1);
        setHasSearchTermChanged(false);
      }
    },
    { 
      threshold: 0.9,
      rootMargin: window.innerWidth > 1200 && page === 1 ? "500px" : "1200px"
    }
  )

    if (loadRef.current)
      observer.observe(loadRef.current)

    return () => {
      if (loadRef.current)
        observer.unobserve(loadRef.current)
    }

  }, [loadRef, page, isLoadingData])  

  useEffect(() => {
    if (hasSearchTermChanged || searchTerm === '')
      window.scrollTo({
        top: 0,
        left: 0
      })
  }, [hasSearchTermChanged, searchTerm])

  return (
    <>
      <NavBarComponent watchSearchTerm={watchSearchTerm} />

      <main className={`gallery${modalStatus === 'open' ? ' freeze' : ''}${isLoadingData && (searchTerm === '' || hasSearchTermChanged) ? ' hide' : ''}`}>
      <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200: 4}}>
        <Masonry gutter={"0.6em"}>
        { searchPhotosData.map((photo) => <CardImageComponent photo={photo} key={photo.id} />) }
        </Masonry>
      </ResponsiveMasonry>
      </main>

      { (!isLoadingData && searchTerm !== '' && !!searchPhotosData.length) && 
        <div ref={loadRef} className='load-more'>Load more...</div> 
      }

      { !isLoadingData && !searchPhotosData.length &&
        <ImageNotFoundComponent/>
      }

      { (isLoadingData) && (searchTerm === '' || hasSearchTermChanged) &&
        <SkeletonComponent quantity={10}/>
      }

      { detailPhoto && <DetailModalComponent canEdit={true}/> }
    </>
  )
}
