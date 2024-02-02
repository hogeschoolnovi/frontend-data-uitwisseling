import React from 'react';
import './ImageRequestPage.css';
import UseStudents from "../../hooks/UseStudents";
import UseUpload from "../../hooks/UseUpload";

function ImageRequestPage() {

    const {
        previewUrlPhoto,
        previewUrlDiploma,
        studentNumber,
        handleImageChange,
        sendUpload,
        handleStudentNumber
    } = UseUpload('http://localhost:8080/students/');

    const {students} = UseStudents('http://localhost:8080/students')

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
                <form onSubmit={() => sendUpload(studentNumber, 'photo')}>
                    <label htmlFor="student-image">
                        Kies afbeelding:
                        <input type="file" name="image-field" id="student-image"
                               onChange={(e) => handleImageChange(e, 'photo')}/>
                    </label>
                    {previewUrlPhoto &&
                        <label>
                            Preview:
                            <img src={previewUrlPhoto} alt="Voorbeeld van de afbeelding die zojuist gekozen is"
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
                <form onSubmit={() => sendUpload(studentNumber, 'diploma')}>
                    <label htmlFor="student-image">
                        Kies afbeelding:
                        <input type="file" name="image-field" id="student-image"
                               onChange={(e) => handleImageChange(e, 'diploma')}/>
                    </label>
                    {previewUrlDiploma &&
                        <label>
                            Preview:
                            <img src={previewUrlDiploma} alt="Voorbeeld van de afbeelding die zojuist gekozen is"
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