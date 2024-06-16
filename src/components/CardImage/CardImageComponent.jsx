
import "./CardImageComponent.scss"
import React from 'react'
import PropTypes from 'prop-types'
import { ImageButtonsComponent } from "../ImageButtons/ImageButtonsComponent";

export const CardImageComponent = ({photo}) => {

  return (
    <>
      <figure className='image-card' style={{backgroundImage: `url("${photo.urls.regular}")`}}>
        <div className="image-card__size-calculator" style={{height:`${(window.innerHeight / 1.6) * (photo.height / photo.width)}px`}}></div>
        <ImageButtonsComponent photo={photo} canShowDetail={true}/>
      </figure>
    </>
  )
}

CardImageComponent.propTypes = {
  photo: PropTypes.object.isRequired,
  handleClickDetail: PropTypes.func
}


