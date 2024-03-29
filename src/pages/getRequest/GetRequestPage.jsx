import React from 'react';

import './GetRequestPage.css';

function GetRequestPage() {

    return (
        <div className="page-container">
            <h1>Alle studenten bij NOVI</h1>
            <table>
                <thead>
                <tr>
                    <th>Studentnummer</th>
                    <th>Foto</th>
                    <th>Naam</th>
                    <th>Opleiding</th>
                    <th>Emailadres</th>
                    <th>Diploma</th>
                    <th>Verwijderen</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            <div className="download-container">
                <h2>Preview foto</h2>
            </div>
        </div>
    );
}

export default GetRequestPage;