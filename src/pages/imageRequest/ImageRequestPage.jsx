import React, {useEffect, useState} from 'react';
import './ImageRequestPage.css';
import axios from 'axios';
import useStudents from "../../hooks/UseStudents";
import useUpload from "../../hooks/UseUpload";

function ImageRequestPage() {

    const {
        image,
        previewUrl,
        studentNumber,
        handleImageChange,
        sendImage,
        sendDiploma,
        handleStudentNumber
    } = useUpload();

    const {students} = useStudents('http://localhost:8080/students')
    return (
        <div className="upload-page-container">
            <div className="first-page-container">
                <h1>Afbeelding uploaden en preview bekijken</h1>
                <h3>Voor welke student wil je een profielfoto uploaden?</h3>
                <select name="student" id="student" defaultValue='DEFAULT' onChange={handleStudentNumber}>
                    <option disabled value='DEFAULT'> -- select an option --</option>
                    {students && students.map((studentNumber) => {
                        return <option key={studentNumber.studentNumber}
                                       value={studentNumber.studentNumber}>{studentNumber.name}</option>
                    })}
                </select>
                <form onSubmit={() => sendImage(`http://localhost:8080/students/${studentNumber}`)}>
                    <label htmlFor="student-image">
                        Kies afbeelding:
                        <input type="file" name="image-field" id="student-image" onChange={handleImageChange}/>
                    </label>
                    {previewUrl &&
                        <label>
                            Preview:
                            <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is"
                                 className="image-preview"/>
                        </label>
                    }
                    <button type="submit">Uploaden</button>
                </form>
            </div>
            <div className="second-page-container">
                <h1>Diploma uploaden en preview bekijken</h1>
                <h3>Voor welke student wil je een diploma uploaden?</h3>
                <select name="student" id="student" defaultValue='DEFAULT' onChange={handleStudentNumber}>
                    <option disabled value='DEFAULT'> -- select an option --</option>
                    {students && students.map((studentNumber) => {
                        return <option key={studentNumber.studentNumber}
                                       value={studentNumber.studentNumber}>{studentNumber.name}</option>
                    })}
                </select>
                <form onSubmit={() => sendDiploma(`http://localhost:8080/students/${studentNumber}`)}>
                    <label htmlFor="student-image">
                        Kies afbeelding:
                        <input type="file" name="image-field" id="student-image" onChange={handleImageChange}/>
                    </label>
                    {previewUrl &&
                        <label>
                            Preview:
                            <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is"
                                 className="image-preview"/>
                        </label>
                    }
                    <button type="submit">Uploaden</button>
                </form>
            </div>
        </div>
    );
}

export default ImageRequestPage;