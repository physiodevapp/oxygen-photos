
import "./CardImageComponent.scss"
import React from 'react'
import PropTypes from 'prop-types'

export const CardImageComponent = ({photo}) => {
  return (
    <>
      <figure className='image-card'>
        <img src={photo.urls.regular} alt={photo.alt_description}/> 
        <ul className="image-card__buttons">
          <li className="image-card__buttons__favourites"><button>Favourites</button></li>
          <li className="image-card__buttons__details"><button>Details</button></li>
          <li className="image-card__buttons__download"><button>Download</button></li>
        </ul>
      </figure>
    </>
  )
}

CardImageComponent.propTypes = {
  photo: PropTypes.object.isRequired
}


