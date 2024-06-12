
import "./DetailModalComponent.scss"
import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ImageButtonsComponent } from "../ImageButtons/ImageButtonsComponent";
import { DetailPhotoContext } from "../../contexts/DetailPhotoContext";
import { useDispatch, useSelector } from "react-redux";
import { favouritePhotosDataSelect, updateDescription } from "../../features/favouritesPhotos/favouritePhotosSlice";

export const DetailModalComponent = ({photo, canEdit}) => {

  const { modalStatus, toggleModal } = useContext(DetailPhotoContext);

  const [activateEditation, setActivateEditation] = useState(false);
  const [imageDescription, setImageDescription] = useState(photo.description);

  const favouritePhotosData = useSelector(favouritePhotosDataSelect);
  const [isFavourite, setIsFavourite] = useState(false)
  const dispatch = useDispatch();

  const handleChangeDescription = (event) => {
    setImageDescription(event.target.value)
  }

  const handleClickUpdate = () => {
    dispatch(updateDescription({id: photo.id, description: imageDescription}));
    setActivateEditation(false)
  }

  useEffect(() => {
    setIsFavourite(!!favouritePhotosData.find((favPhoto) => favPhoto.id === photo.id));
  }, [favouritePhotosData])

  return (
    <section className={`photo-detail ${modalStatus === 'close' ? 'slide-out-bottom' : modalStatus === 'open' ? 'slide-in-bottom' : '' }`}>
      <button className="photo-detail__close-button" onClick={() => toggleModal('close')}>X</button>
      <figure className="photo-detail__image">
        <img src={photo.urls.regular} alt={photo.alt_description}/>
      </figure>
      <article className="photo-detail__info">
        <li className="photo-detail__info__features">
          <ul>Size: <b>{photo.width}</b> x <b>{photo.height}</b></ul>
          <ul>Likes: <b>{photo.likes}</b> <i className="fa fa-heart pulsate-fwd" style={{color: 'red'}}></i></ul>
        </li>
        <h4 className="photo-detail__info__title">About the image {canEdit && isFavourite && <i className="fa fa-pencil-square-o" onClick={() => setActivateEditation(!activateEditation)}></i>}</h4>
        <textarea className="photo-detail__info__description" rows={4} disabled={!canEdit || !activateEditation} value={imageDescription} onChange={handleChangeDescription}></textarea>
      </article>
      { !activateEditation && <ImageButtonsComponent photo={photo} canShowDetail={false}/> } 
      { activateEditation && 
        <ul className="photo-detail__edit-buttons">
          <li><button className="photo-detail__edit-buttons--dismiss" onClick={() => setActivateEditation(false)} >Dismiss</button></li>
          <li><button className="photo-detail__edit-buttons--update" onClick={handleClickUpdate}>Update</button></li>
        </ul> 
      }
    </section>
  )
}

DetailModalComponent.propTypes = {
  photo: PropTypes.object,
  canEdit: PropTypes.bool,
}