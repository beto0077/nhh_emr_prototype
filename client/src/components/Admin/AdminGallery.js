import React from 'react';
import Navber from './AdminNavbar';
import GalleryCarousel from '../GalleryCarousel';

function AdminGallery() {
    return (
        <div className="bg-dark">
            <Navber />
            <br />
            <GalleryCarousel />
        </div>
    );
}

export default AdminGallery;