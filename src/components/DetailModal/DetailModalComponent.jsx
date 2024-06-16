
import "./DetailModalComponent.scss"
import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ImageButtonsComponent } from "../ImageButtons/ImageButtonsComponent";
import { DetailPhotoContext } from "../../contexts/DetailPhotoContext";
import { useDispatch } from "react-redux";
import { updateDescription } from "../../features/favouritesPhotos/favouritePhotosSlice";

export const DetailModalComponent = ({canEdit}) => {

  const { detailPhoto, modalStatus, toggleModal } = useContext(DetailPhotoContext);

  const [activateEditation, setActivateEditation] = useState(false);
  const [imageDescription, setImageDescription] = useState(detailPhoto.description);

  const [isFavourite, setIsFavourite] = useState(false)
  const dispatch = useDispatch();

  const handleChangeDescription = (event) => {
    setImageDescription(event.target.value)
  }

  const handleClickUpdate = () => {
    dispatch(updateDescription({id: detailPhoto.id, description: imageDescription}));
    setActivateEditation(false)
  }

  return (
    <section className="photo-detail">
      <article className={`photo-detail__article ${modalStatus === 'close' ? 'slide-out-bottom' : modalStatus === 'open' ? 'slide-in-bottom' : '' }`}>
        <button className="photo-detail__article__close-button" onClick={() => toggleModal('close')}>X</button>
        <figure className="photo-detail__article__image">
          <img src={detailPhoto.urls.regular} alt={detailPhoto.alt_description}/>
        </figure>
        <article className="photo-detail__article__info">
          <li className="photo-detail__article__info__features">
            <ul>Size: <b>{detailPhoto.width}</b> x <b>{detailPhoto.height}</b></ul>
            <ul>Likes: <b>{detailPhoto.likes}</b> <i className="fa fa-heart pulsate-fwd" style={{color: 'red'}}></i></ul>
          </li>
          <h4 className="photo-detail__article__info__title">About the image {
            canEdit && isFavourite && !activateEditation &&
            <i className="fa fa-pencil-square-o" onClick={() => setActivateEditation(!activateEditation)}></i>
            }
          </h4>
          <textarea className="photo-detail__article__info__description" rows={1} disabled={!canEdit || !activateEditation} value={imageDescription} onChange={handleChangeDescription}></textarea>
        </article>
        { !activateEditation && <ImageButtonsComponent photo={detailPhoto} canShowDetail={false} watchIsFavourite={(isFavourite) => setIsFavourite(isFavourite)}/> } 
        { activateEditation && 
          <ul className="photo-detail__article__edit-buttons">
            <li><button className="photo-detail__article__edit-buttons--dismiss" onClick={() => setActivateEditation(false)} >Dismiss</button></li>
            <li><button className="photo-detail__article__edit-buttons--update" onClick={handleClickUpdate}>Update</button></li>
          </ul> 
        }
      </article>
    </section>
  )
}

DetailModalComponent.propTypes = {
  photo: PropTypes.object,
  canEdit: PropTypes.bool,
}