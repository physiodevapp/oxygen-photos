import "./SkeletonComponent.scss";
import React from 'react';
import PropTypes from "prop-types";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export const SkeletonComponent = ({quantity}) => {

  return (
    <>
      
        <section className="skeleton">
          <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200: 4}}>
            <Masonry gutter={"0.6em"}>
            { Array(quantity).fill().map((item, index) => (
                <article key={index} className="skeleton__card">
                  <Skeleton 
                    count={1}
                    height={250 * (Math.floor(Math.random() * 2) + 1)}
                    className="skeleton__card__image"
                    />
                  <Skeleton
                    count={1}
                    height={60}
                    className="skeleton__card__buttons"
                    baseColor="#cfcfcf"
                    direction="rtl"
                    />
                </article>
              ))
            }
            </Masonry>
          </ResponsiveMasonry> 
      </section>      
    </>
  )
}

SkeletonComponent.propTypes = {
  quantity: PropTypes.number
}
