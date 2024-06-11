import "./GalleryComponent.scss";

import React, { useEffect, useRef, useState } from 'react'
import { listPhotos } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { searchPhotosDataSelect, searchPhotosErrorSelect, searchPhotosStatusSelect } from '../../features/searchPhotos/searchPhotosSlice';
import { searchPhotosThunk } from '../../features/searchPhotos/searchPhotosThunk';
import { CardImageComponent } from "../CardImage/CardImageComponent";

const Gallery = () => {

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [page, setPage] = useState(1);
  // const [canLoadMoreData, setCanLoadMoreData] = useState(true);

  const dispatch = useDispatch();
  const searchPhotosData = useSelector(searchPhotosDataSelect);
  const searchPhotosError = useSelector(searchPhotosErrorSelect)
  const searchPhotosStatus = useSelector(searchPhotosStatusSelect)

  const loadRef = useRef(null);

  const updateGallery = async (page, per_page) => {

    setIsLoadingData(true);

    try {
      
      const jsonData = await listPhotos(page, per_page);

      jsonData && setPhotos((prevPhotos) => {    
        let nextPhotos;    
        const newPhotos = [...jsonData].filter((jsonPhoto) => JSON.stringify(prevPhotos).search(jsonPhoto.id) === -1);    
        nextPhotos = [...prevPhotos, ...newPhotos];    
        return nextPhotos;    
      });

      !jsonData && setCanLoadMoreData(false);

      jsonData && setPage((prevPage) => prevPage + 1); 

      setIsLoadingData(false)

    } catch (error) {
      console.log(error);

      setIsLoadingData(false)
    }

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
        setIsLoadingData(false);
        break;
      
      case 'rejected':
        setIsLoadingData(false)
        break;

      default:
        break;
    }

  }, [searchPhotosStatus])

  
  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting && window.scrollY) {
        console.log('intersected!');
        dispatch(searchPhotosThunk({page: page + 1, per_page: 20}))
        setPage((prevPage) => prevPage + 1)

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
  

  return (
    <>
      {
        searchPhotosData.map((photo, index) => (
          <CardImageComponent photo={photo} key={photo.id}/>
        ))
      }
      {
        !isLoadingData && <div ref={loadRef} className='load-more'>Load more...</div>
      }
    </>
  )
}

export default Gallery