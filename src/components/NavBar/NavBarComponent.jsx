import "./NavBarComponent.scss";
import { useSelector } from "react-redux";
import PropTypes from "prop-types"
import React, { useEffect, useState } from 'react'
import { favouritePhotosDataSelect } from "../../features/favouritesPhotos/favouritePhotosSlice";
import { useLocation, useNavigate } from "react-router-dom";

export const NavBarComponent = ({sortBySelected, watchSearchTerm = () => {}, watchSortBy = () => {}}) => {

  const [searchTerm, setSearchTerm] = useState('');  

  const [hasFavourites, setHasFavourites] = useState(false);
  const favouritePhotosData = useSelector(favouritePhotosDataSelect);

  const navigate = useNavigate();
  const location = useLocation();

  const [canBeSortSelectorVisible, setCanBeSortSelectorVisible] = useState(false)

  const handleClickPath = () => {
    if (location.pathname === "/favourites")
      navigate("/")
    else
      navigate("favourites")
  }

  useEffect(() => {
    setHasFavourites(!!favouritePhotosData.length)  
  }, [favouritePhotosData])
  

  return (
    <>
      <nav id="navbar" className='navbar'>
        <button className='nav-button' onClick={handleClickPath}>
        { location.pathname.indexOf("favourites") === -1 ? 
          <i className={hasFavourites ? "fa fa-bookmark" : "fa fa-bookmark-o"}></i> : 
          <i className="fa fa-home"></i>
        }
        </button>
        <div className="search">
          <input className="search__input" type="text" placeholder={location.pathname.indexOf("favourites") === -1 ? 'Try typing something...' : "Filter by description..."} name="searchTerm" id="" value={searchTerm} onChange={({target}) => setSearchTerm(target.value)} />
          <button className="search__button" onClick={() => watchSearchTerm(searchTerm.length ? searchTerm : 'random')}>
            { searchTerm.length || location.pathname.indexOf("favourites") !== -1 ? 
              <i className="fa fa-search"></i> :
              <i className="fa fa-random"></i>
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
          <button className="sort-button" onClick={() => setCanBeSortSelectorVisible(!canBeSortSelectorVisible)}><i className="fa fa-sort-amount-desc"></i></button>
        }
      </nav>
    </>
  )
}

NavBarComponent.propTypes = {
  sortBySelected: PropTypes.string,
  watchSearchTerm: PropTypes.func,
  watchSortBy: PropTypes.func
}
