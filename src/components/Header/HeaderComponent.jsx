import "./HeaderComponent.scss"
import React from 'react'
import { useLocation } from "react-router-dom";

export const HeaderComponent = () => {

  const location = useLocation();

  return (
    <>
      <header className="header">
        { location.pathname.indexOf("favourites") === -1 ? 
          "Photography" :
          "My favourites"
        }
      </header>
    </>
  )
}
