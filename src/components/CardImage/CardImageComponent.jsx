
import "./CardImageComponent.scss"
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux"
import { addRemove, favouritePhotosDataSelect } from "../../features/favouritesPhotos/favouritePhotosSlice"

export const CardImageComponent = ({photo}) => {

  const dispatch = useDispatch();
  const favouritePhotosData = useSelector(favouritePhotosDataSelect);

  const handleClick = (action, photo) => {
    switch (action) {
      case 'favourite':
        dispatch(addRemove(photo))
        break;
    
      default:
        break;
    }

  }

  const isFavourite = (photo) => {
    return !!favouritePhotosData.find((favPhoto) => favPhoto.id === photo.id)
  }

  // useEffect(() => {
  //   console.log('first')
  // }, [favouritePhotosData])

  return (
    <>
      <figure className='image-card'>
        <img src={photo.urls.regular} alt={photo.alt_description}/> 
        <ul className="image-card__buttons">
          <li className="image-card__buttons__favourites"><button onClick={() => handleClick('favourite', photo)}><i data-fav={isFavourite(photo)} className={isFavourite(photo) ? 'fa fa-bookmark' : 'fa fa-bookmark-o'}></i></button></li>
          <li className="image-card__buttons__details"><button><i className="fa fa-info"></i></button></li>
          <li className="image-card__buttons__download"><button><i className="fa fa-cloud-download"></i></button></li>
        </ul>
      </figure>
    </>
  )
}

CardImageComponent.propTypes = {
  photo: PropTypes.object.isRequired
}


