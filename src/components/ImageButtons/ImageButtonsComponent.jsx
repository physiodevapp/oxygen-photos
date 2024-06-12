import "./ImageButtonsComponent.scss"
import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addRemove, favouritePhotosDataSelect } from '../../features/favouritesPhotos/favouritePhotosSlice';
import { DetailPhotoContext } from "../../contexts/DetailPhotoContext";

export const ImageButtonsComponent = ({photo, canDetail}) => {

  const dispatch = useDispatch();
  const favouritePhotosData = useSelector(favouritePhotosDataSelect);
  const { detailPhoto, setDetailPhoto } = useContext(DetailPhotoContext)

  const handleClick = (action, photo) => {

    if(action ==='favourite')
      dispatch(addRemove(photo))
    else if (action === 'detail')
      setDetailPhoto(photo)
  }

  const isFavourite = (photo) => {
    return !!favouritePhotosData.find((favPhoto) => favPhoto.id === photo.id)
  }

  return (
    <>
      <ul className="image-buttons">
        <li className="image-buttons__favourites"><button onClick={() => handleClick('favourite', photo)}><i className={isFavourite(photo) ? 'fa fa-bookmark' : 'fa fa-bookmark-o'}></i></button></li>
        {canDetail && <li className="image-buttons__details"><button onClick={() => handleClick('detail', photo)}><i className="fa fa-info"></i></button></li>}
        <li className="image-buttons__download"><button><i className="fa fa-cloud-download"></i></button></li>
      </ul>
    </>
  )
}

ImageButtonsComponent.propTypes = {
  photo: PropTypes.object,
  canDetail: PropTypes.bool
}