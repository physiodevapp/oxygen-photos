import "./GalleryComponent.scss";

import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { CardImageComponent } from "../CardImage/CardImageComponent";
import { DetailModalComponent } from "../DetailModal/DetailModalComponent";
import { DetailPhotoContext } from "../../contexts/DetailPhotoContext";

export const GalleryComponent = ({searchTerm, dataSelect, errorSelect, statusSelect, getPhotos}) => {

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const searchPhotosData = useSelector(dataSelect);
  const searchPhotosError = useSelector(errorSelect);
  const searchPhotosStatus = useSelector(statusSelect);

  const loadRef = useRef(null);  

  const {detailPhoto, modalStatus } = useContext(DetailPhotoContext)
  
  useEffect(() => {

    switch (searchPhotosStatus) {
      case 'idle': 
        dispatch(getPhotos({page: 1, per_page: 20, words: searchTerm}))
        break;

      case 'pending':
        setIsLoadingData(true);
        break;
    
      case 'fulfilled':
        setIsLoadingData(false);
        break;
      
      case 'rejected':
        setIsLoadingData(false);
        break;

      default:
        break;
    }

  }, [searchPhotosStatus])

  
  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting && window.scrollY && !isLoadingData) {
        console.log('intersected!');
        dispatch(getPhotos({page: page + 1, per_page: 20, words: searchTerm}))
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
      {/* <div className="page">{page}</div> */}
      <div className={`gallery ${modalStatus === 'open' ? 'freeze' : ''}`}>
      {
        searchPhotosData.map((photo) => (
          <CardImageComponent photo={photo} key={photo.id} />
        ))
      }
      </div>
      { !!searchTerm.trim().length && !isLoadingData && <div ref={loadRef} className='load-more'>Load more...</div> }
      { detailPhoto && <DetailModalComponent photo={detailPhoto} canEdit={false}/> }
    </>
  )
}

GalleryComponent.propTypes = {
  searchTerm: PropTypes.string,
  getPhotos: PropTypes.func,
  dataSelect: PropTypes.func,
  statusSelect: PropTypes.func,
  errorSelect: PropTypes.func
}