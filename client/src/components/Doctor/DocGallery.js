import React from 'react';
import Navber from './DocNavbar';
import GalleryCarousel from '../GalleryCarousel';

function DocGallery() {
  return (
    <div className="bg-dark">
      <Navber />
      <br />
      <GalleryCarousel />
    </div>
  );
}

export default DocGallery;