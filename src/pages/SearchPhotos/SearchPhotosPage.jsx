

// import { GalleryComponent } from '../../components/Gallery/GalleryComponent';
import React, { useContext, useEffect, useRef, useState } from 'react'
import "./SearchPhotosPage.scss";
import { searchPhotosDataSelect, searchPhotosStatusSelect } from '../../features/searchPhotos/searchPhotosSlice';
import { searchPhotosThunk } from '../../features/searchPhotos/searchPhotosThunk';
import { NavBarComponent } from '../../components/NavBar/NavBarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { DetailPhotoContext } from '../../contexts/DetailPhotoContext';
import { CardImageComponent } from '../../components/CardImage/CardImageComponent';
import { DetailModalComponent } from '../../components/DetailModal/DetailModalComponent';

export const SearchPhotosPage = () => {

  const { detailPhoto, modalStatus } = useContext(DetailPhotoContext);

  const [searchTerm, setSearchTerm] = useState('');  
  const [isSearchTermBlank, setIsSearchTermBlank] = useState(false);
  const [hasSearchTermChanged, setHasSearchTermChanged] = useState(false);

  const loadRef = useRef(null); 

  const dispatch = useDispatch();
  const searchPhotosData = useSelector(searchPhotosDataSelect);
  const searchPhotosStatus = useSelector(searchPhotosStatusSelect);

  const [isLoadingData, setIsLoadingData] = useState(false);

  const [page, setPage] = useState(1);

  const watchSearchTerm = (newSearchTerm) => {
    if (newSearchTerm === 'random')
      setIsSearchTermBlank(true)
    else
      setIsSearchTermBlank(false)

    if (newSearchTerm === searchTerm)
      setHasSearchTermChanged(false)
    else
      setHasSearchTermChanged(true)

    if (newSearchTerm === 'random' && searchTerm === 'random')
      setSearchTerm('')
    else
      setSearchTerm(newSearchTerm)
  }

  useEffect(() => {
    // console.log('searchPhotosStatus _--> ', searchPhotosStatus);
    switch (searchPhotosStatus) {
      case 'idle': 
        dispatch(searchPhotosThunk({page: 1, per_page: 20}))
        break;

      case 'pending':
        setIsLoadingData(true);
        break;
    
      case 'fulfilled':      
        setTimeout(() => {
          setIsLoadingData(false);
        }, 1500);
        break;
      
      case 'rejected':
        setTimeout(() => {
          setIsLoadingData(false);
        }, 1500);
        break;

      default:
        break;
    }

  }, [searchPhotosStatus])

  useEffect(() => {
    console.log('searchTerm -->', searchTerm);
    console.log('isSearchTermBlank --> ', isSearchTermBlank);
    console.log('hasSearchTermChanged --> ', hasSearchTermChanged);
    if (hasSearchTermChanged) { // searchTerm === '' || searchTerm === 'random'
      console.log('object');
      dispatch(searchPhotosThunk({page: 1, per_page: 20}))
    } else if (searchTerm !== "" && searchTerm !== "random") {
      console.log('object2');
      dispatch(searchPhotosThunk({page: 1, per_page: 20, term: searchTerm}))
    }
  }, [searchTerm])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting && window.scrollY && !isLoadingData) {
        console.log('intersected!');
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

  return ( 
    <>
      { (!detailPhoto || modalStatus !== 'open') && 
        <NavBarComponent path={"/favourites"} watchSearchTerm={watchSearchTerm} />
      }

      {/* <div className="page">{page}</div> */}
      <main className={`gallery${modalStatus === 'open' ? ' freeze' : ''}${isLoadingData && (isSearchTermBlank || hasSearchTermChanged) ? ' hide' : ''}`}>

      { searchPhotosData.map((photo) => <CardImageComponent photo={photo} key={photo.id} />) }
      </main>

      { (!isLoadingData) && !isSearchTermBlank && 
        <div ref={loadRef} className='load-more'>Load more...</div> 
      }

      { (isLoadingData) && (isSearchTermBlank || hasSearchTermChanged) &&
        <div className='isLoading'>IS LOADING...</div> 
      }

      { detailPhoto && <DetailModalComponent canEdit={true}/> }
    </>
  )
}
