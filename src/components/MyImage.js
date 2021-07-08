import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
 
const MyImage = ({ src, width, height, alt, className, placeholderSrc }) => {
  var srcPlaceHolder = '/images/placeholderSrc.gif';

  return(
    <>
      <LazyLoadImage
        alt={alt}
        height={height}
        src={src} // use normal <img> attributes as props
        width={width}
        placeholderSrc={placeholderSrc ? placeholderSrc : srcPlaceHolder}
        className={className}
      />
    </>
  )}


 
export default MyImage;