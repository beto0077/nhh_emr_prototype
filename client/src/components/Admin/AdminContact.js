import React from 'react';
import Navber from './AdminNavbar';
import Footer from '../Footer';
import Homeimage from '../Homeimage';

function AdminContact() {
    return (
        <div className="bg-dark">
            <Navber />
            <Homeimage />
            <Footer />
        </div>
    );
}

export default AdminContact;