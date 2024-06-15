import "./ImageButtonsComponent.scss"
import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addRemove, favouritePhotosDataSelect } from '../../features/favouritesPhotos/favouritePhotosSlice';
import { DetailPhotoContext } from "../../contexts/DetailPhotoContext";

export const ImageButtonsComponent = ({photo, canShowDetail, watchIsFavourite = () => {}}) => {

  const dispatch = useDispatch();
  const favouritePhotosData = useSelector(favouritePhotosDataSelect);
  const [isFavourite, setIsFavourite] = useState(false);

  const { detailPhoto, toggleModal } = useContext(DetailPhotoContext);

  const downloadImage = async (imageSrc, imageName = "image") => {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = imageName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleClick = (action, photo) => {
    if (action === 'favourite') 
      dispatch(addRemove(photo))
    else if (action === 'detail')
      toggleModal('open', photo)
    else if (action === 'download')      
      downloadImage(photo.urls.full, `photo_${Date.now()}`)

    if (action === 'favourite' && detailPhoto && location.pathname.indexOf("favourites") !== -1)
      toggleModal('close')
  }

  useEffect(() => {
    const isFavourite = !!favouritePhotosData.find((favPhoto) => favPhoto.id === photo.id)
    setIsFavourite(isFavourite)
    watchIsFavourite(isFavourite);
  
  }, [favouritePhotosData])
  

  return (
    <>
      <ul className="image-buttons">
        <li className="image-buttons__favourites"><button onClick={() => handleClick('favourite', photo)}><i className={isFavourite ? 'fa fa-bookmark' : 'fa fa-bookmark-o'}></i></button></li>
        {canShowDetail && <li className="image-buttons__details"><button onClick={() => handleClick('detail', photo)}><i className="fa fa-info"></i></button></li>}
        <li className="image-buttons__download"><button onClick={() => handleClick('download', photo)}><i className="fa fa-cloud-download"></i></button></li>
      </ul>
    </>
  )
}

ImageButtonsComponent.propTypes = {
  photo: PropTypes.object,
  canShowDetail: PropTypes.bool,
  watchIsFavourite: PropTypes.func
}
