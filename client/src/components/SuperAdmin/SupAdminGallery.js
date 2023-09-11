import React from 'react';
import Navber from './SupAdminNavbar';
import GalleryCarousel from '../GalleryCarousel';

function SupAdminGallery() {
    return (
        <div className="bg-dark">
            <Navber />
            <br />
            <GalleryCarousel />
        </div>
    );
}

export default SupAdminGallery;