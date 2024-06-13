import "./SearchBarComponent.scss"
import React, { useState } from 'react'
import PropTypes from "prop-types"

export const SearchBarComponent = ({watchSearchTerm = () => {}}) => {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
    
      <input className="searchbar__input" type="text" name="searchTerm" id="" value={searchTerm} onChange={({target}) => setSearchTerm(target.value)} />
      <button className="searchbar__button" onClick={() => watchSearchTerm(searchTerm)} >Search</button>

    </>
  )
}


SearchBarComponent.propTypes = {
  watchSearchTerm: PropTypes.func
}