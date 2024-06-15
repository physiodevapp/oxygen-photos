
import "./ImageNotFoundComponent.scss"
import React from 'react'

export const ImageNotFoundComponent = () => {
  return (
    <>
      <article className='image-not-found'>
        <i className="fa fa-file-image-o"></i>
        <p className="image-not-found__message">Images not found!</p>
      </article>
    </>
  )
}