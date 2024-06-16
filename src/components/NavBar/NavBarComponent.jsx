import "./NavBarComponent.scss";
import { useSelector } from "react-redux";
import PropTypes from "prop-types"
import React, { useEffect, useState } from 'react'
import { favouritePhotosDataSelect } from "../../features/favouritesPhotos/favouritePhotosSlice";
import { useLocation, useNavigate } from "react-router-dom";

export const NavBarComponent = ({filteredPhotos, sortBySelected, watchSearchTerm = () => {}, watchSortBy = () => {}}) => {

  const [searchTerm, setSearchTerm] = useState('');  
  const [inputTerm, setInputTerm] = useState('');

  const [isInputFocused, setIsInputFocused] = useState(false);

  const [hasFavourites, setHasFavourites] = useState(false);
  const favouritePhotosData = useSelector(favouritePhotosDataSelect);

  const navigate = useNavigate();
  const location = useLocation();

  const [canBeSortSelectorVisible, setCanBeSortSelectorVisible] = useState(false)

  const [stick, setStick] = useState(false)

  const handleClickPath = () => {
    if (location.pathname === "/favourites")
      navigate("/")
    else
      navigate("favourites")
  }

  const handleClickSearch = () => {
    setSearchTerm(inputTerm)

    if (inputTerm !== searchTerm || location.pathname.indexOf("favourites") === -1)
      watchSearchTerm(inputTerm);
  }

  const handleClickClear = () => {
    setInputTerm("");

    setSearchTerm("")

    if (searchTerm)
      watchSearchTerm("")
  }


  useEffect(() => {
    const handleScroll = () => setStick(window.scrollY > 100)

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    setHasFavourites(!!favouritePhotosData.length)  
  }, [favouritePhotosData])
  

  return (
    <>
      <nav id="navbar" className={`navbar ${stick ? 'sticky' : 'unsticky'}`}>
        <button className='nav-button' onClick={handleClickPath}>
        { location.pathname.indexOf("favourites") === -1 ? 
          <i className={hasFavourites ? "fa fa-bookmark" : "fa fa-bookmark-o"}></i> : 
          <i className="fa fa-home"></i>
        }
        </button>
        <div className="search">
          <input className="search__input" type="text" placeholder={location.pathname.indexOf("favourites") === -1 ? 'Try typing something...' : 'Filter by "About"...'} name="inputTerm" id="" value={inputTerm} onFocus={() => setIsInputFocused(true)} onBlur={() => setTimeout(() => setIsInputFocused(false), 400)}  onChange={({target}) => setInputTerm(target.value)}/>
          
          { (!!inputTerm.length) &&
            <button className="search__button-clear" onClick={handleClickClear}>X</button>
          }

          <button className="search__button-search" onClick={handleClickSearch}>
            { inputTerm.length || location.pathname.indexOf("favourites") !== -1 ? 
              <i className="fa fa-search"></i> :
              <i className="fa fa-random pulsate-fwd"></i>
            }
          </button>

          { location.pathname.indexOf("favourites") !== -1 && canBeSortSelectorVisible && 
            <ul className="sort-selector">
              <li className="sort-selector__title">Sort by...</li>
              <li className={`sort-selector__option ${sortBySelected === 'width' ? 'selected' : ''}`} onClick={() => watchSortBy("width")}>Width</li>
              <li className={`sort-selector__option ${sortBySelected === 'height' ? 'selected' : ''}`} onClick={() => watchSortBy("height")}>Height</li>
              <li className={`sort-selector__option ${sortBySelected === 'likes' ? 'selected' : ''}`} onClick={() => watchSortBy("likes")}>Likes</li>
              <li className={`sort-selector__option ${sortBySelected === 'created_at' ? 'selected' : ''}`} onClick={() => watchSortBy("created_at")}>Creation date</li>
            </ul> 
          }
        </div>

        { location.pathname.indexOf("favourites") !== -1 &&
          <button className={`sort-button${isInputFocused ? ' hide' : ''}`} disabled={!filteredPhotos.length} onClick={() => setCanBeSortSelectorVisible(!canBeSortSelectorVisible)}><i className="fa fa-sort-amount-desc"></i></button>
        }
      </nav>
    </>
  )
}

NavBarComponent.propTypes = {
  sortBySelected: PropTypes.string,
  watchSearchTerm: PropTypes.func,
  watchSortBy: PropTypes.func,
  filteredPhotos: PropTypes.array
}
