import React from 'react';
import './ImageRequestPage.css';


function ImageRequestPage() {

    return (
        <div className="upload-page-container">
            <div className="first-page-container">
                <h1>Afbeelding uploaden en preview bekijken</h1>
                <h3>Voor welke student wil je een profielfoto uploaden?</h3>

            </div>
            <div className="second-page-container">
                <h1>Diploma uploaden en preview bekijken</h1>
                <h3>Voor welke student wil je een diploma uploaden?</h3>

            </div>
        </div>
    );
}

export default ImageRequestPage;