

// import { GalleryComponent } from '../../components/Gallery/GalleryComponent';
import React, { useContext, useEffect, useRef, useState } from 'react'
import "./SearchPhotosPage.scss";
import { searchPhotosDataSelect, searchPhotosErrorSelect, searchPhotosStatusSelect } from '../../features/searchPhotos/searchPhotosSlice';
import { searchPhotosThunk } from '../../features/searchPhotos/searchPhotosThunk';
import { NavBarComponent } from '../../components/NavBar/NavBarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { DetailPhotoContext } from '../../contexts/DetailPhotoContext';
import { CardImageComponent } from '../../components/CardImage/CardImageComponent';
import { DetailModalComponent } from '../../components/DetailModal/DetailModalComponent';

export const SearchPhotosPage = () => {

  const { detailPhoto, modalStatus } = useContext(DetailPhotoContext);

  const [searchTerm, setSearchTerm] = useState('');  

  const loadRef = useRef(null); 

  const dispatch = useDispatch();
  const searchPhotosData = useSelector(searchPhotosDataSelect);
  const searchPhotosError = useSelector(searchPhotosErrorSelect);
  const searchPhotosStatus = useSelector(searchPhotosStatusSelect);

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [page, setPage] = useState(1);

  const watchSearchTerm = (newSearchTerm) => {
    if (searchTerm === 'random' && newSearchTerm === 'random')
      setSearchTerm('random again')
    else 
      setSearchTerm(newSearchTerm)
  }

  useEffect(() => {
    switch (searchPhotosStatus) {
      case 'idle': 
        dispatch(searchPhotosThunk({page: 1, per_page: 20, term: searchTerm}))
        break;

      case 'pending':
        setIsLoadingData(true);
        break;
    
      case 'fulfilled':
      
        setTimeout(() => {
          
          setIsLoadingData(false);
        }, 1000);

        if (!isLoadingData && searchTerm.length) {
          
          if (searchTerm === 'random' || searchTerm == 'random again')
            dispatch(searchPhotosThunk({page: 1, per_page: 20, term: ""}))
          else 
            dispatch(searchPhotosThunk({page: 1, per_page: 20, term: searchTerm}))          
        }
        break;
      
      case 'rejected':
        setIsLoadingData(false);
        break;

      default:
        break;
    }

  }, [searchPhotosStatus, searchTerm])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting && window.scrollY && !isLoadingData) {
        console.log('intersected!');
        dispatch(searchPhotosThunk({page: page + 1, per_page: 20, term: searchTerm, isNewTerm: false}))
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

  }, [loadRef, page, isLoadingData, searchTerm])

  return ( 
    <>
      {
        (!detailPhoto || modalStatus !== 'open') && 
        <NavBarComponent path={"/favourites"} watchSearchTerm={watchSearchTerm} />
      }

      {/* <div className="page">{page}</div> */}
      <main className={`gallery${modalStatus === 'open' ? ' freeze' : ''}${(!searchTerm.trim().length && isLoadingData) ? ' hide' : ''}`}>
      { searchPhotosData.map((photo) => <CardImageComponent photo={photo} key={photo.id} />) }
      </main>

      { !!searchTerm.trim().length && !isLoadingData && 
        <div ref={loadRef} className='load-more'>Load more...</div> 
      }

      { isLoadingData && 
        <div className='isLoading'>IS LOADING...</div> 
      }

      { detailPhoto && <DetailModalComponent canEdit={true}/> }
    </>
  )
}
