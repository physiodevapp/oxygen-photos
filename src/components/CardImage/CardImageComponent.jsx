
import "./CardImageComponent.scss"
import React from 'react'
import PropTypes from 'prop-types'
import { ImageButtonsComponent } from "../ImageButtons/ImageButtonsComponent";

export const CardImageComponent = ({photo}) => {

  return (
    <>
      <figure className='image-card'>
        <img src={photo.urls.regular} alt={photo.alt_description}/> 
        <ImageButtonsComponent photo={photo} canShowDetail={true}/>
      </figure>
    </>
  )
}

CardImageComponent.propTypes = {
  photo: PropTypes.object.isRequired,
  handleClickDetail: PropTypes.func
}


