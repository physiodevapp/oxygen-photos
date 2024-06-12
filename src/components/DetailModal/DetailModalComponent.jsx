
import "./DetailModalComponent.scss"
import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { ImageButtonsComponent } from "../ImageButtons/ImageButtonsComponent";
import { DetailPhotoContext } from "../../contexts/DetailPhotoContext";

export const DetailModalComponent = ({photo}) => {

  const { detailPhoto, setDetailPhoto } = useContext(DetailPhotoContext)
  const [closeModal, setCloseModal] = useState(false)

  const handleClick = () => {
    setCloseModal(true)
    setTimeout(() => {
      setDetailPhoto(null)
    }, 500);
  }

  return (
    <section className={`photo-detail ${closeModal ? 'slide-out-bottom' : 'slide-in-bottom' }`}>
      <button className="photo-detail__close-button" onClick={handleClick}>X</button>
      <figure className="photo-detail__image">
        <img src={photo.urls.regular} alt={photo.alt_description}/>
      </figure>
      <article className="photo-detail__info">
        <li className="photo-detail__info__features">
          <ul>Size: <b>{photo.width}</b> x <b>{photo.height}</b></ul>
          <ul>Likes: <b>{photo.likes}</b> <i className="fa fa-heart pulsate-fwd" style={{color: 'red'}}></i></ul>
        </li>
        <h4 className="photo-detail__info__title">About the image</h4>
        <p className="photo-detail__info__description">{photo.description}</p>
      </article>
      <ImageButtonsComponent photo={photo} canDetail={false}/> 
    </section>
  )
}

DetailModalComponent.propTypes = {
  photo: PropTypes.object
}