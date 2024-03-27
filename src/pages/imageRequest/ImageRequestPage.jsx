import React, {useEffect, useRef, useState} from 'react';
import './ImageRequestPage.css';
import axios from "axios";

function ImageRequestPage() {

    const initialMessages = {
        photo: {success: false, error: false},
        diploma: {success: false, error: false}
    };

    const [students, setStudents] = useState([]);
    const [image, setImage] = useState('');
    const [previewUrlPhoto, setPreviewUrlPhoto] = useState('');
    const [previewUrlDiploma, setPreviewUrlDiploma] = useState('');
    const [studentNumber, setStudentNumber] = useState(0);
    const [messages, setMessages] = useState(initialMessages);


    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await axios.get('http://localhost:8080/students');
                // Plaats alle studenten in de state zodat we het op de pagina kunnen gebruiken
                setStudents(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchStudents();
    }, []);

    function handleImageChange(e, type) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        setImage(uploadedImage);
        console.log(e.target.files[0])

        if (type === 'photo') {
            setPreviewUrlPhoto(URL.createObjectURL(uploadedImage));
        } else {
            setPreviewUrlDiploma(URL.createObjectURL(uploadedImage))
        }
    }

    async function sendUpload(e, id, path) {
        e.preventDefault();
        setMessages(initialMessages)

        const formData = new FormData();
        formData.append("file", image);
        try {
            const result = await axios.post(`http://localhost:8080/students/${id}/${path}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            console.log(result);
            setMessages(prevMessages => ({
                ...prevMessages,
                [path]: {success: true, error: false}
            }));
        } catch (e) {
            console.error(e);
            setMessages(prevMessages => ({
                ...prevMessages,
                [path]: {success: false, error: true}
            }));
        }
        setImage('');
        setPreviewUrlPhoto('');
        setPreviewUrlDiploma('');
    }

    function handleStudentNumber(e) {
        e.preventDefault();
        setStudentNumber(e.target.value);
        console.log('Gekozen studentnummer is:', e.target.value);
    }

    return (
        <div className="upload-page-container">
            <div className="first-page-container">
                <h1>Afbeelding uploaden en preview bekijken</h1>
                <h3>Voor welke student wil je een profielfoto uploaden?</h3>
                <select name="student" id="student" defaultValue='DEFAULT' onChange={handleStudentNumber}>
                    <option disabled value='DEFAULT'> -- select an option --</option>
                    {students
                        ? students.map((studentNumber) => {
                            return <option key={studentNumber.studentNumber}
                                           value={studentNumber.studentNumber}>
                                {studentNumber.name}
                            </option>
                        })
                        : <p>Er zijn geen studenten om weer te geven</p>}
                </select>
                <form onSubmit={(e) => sendUpload(e, studentNumber, 'photo')}>
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
                {messages.photo.success && <p className="success-message">De foto is succesvol geüpload!</p>}
                {messages.photo.error &&
                    <p className="error-message">Er is iets misgegaan bij het uploaden van de foto. Probeer het
                        opnieuw.</p>}
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
                <form onSubmit={(e) => sendUpload(e, studentNumber, 'diploma')}>
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
                {messages.diploma.success && <p className="success-message">De foto is succesvol geüpload!</p>}
                {messages.diploma.error &&
                    <p className="error-message">Er is iets misgegaan bij het uploaden van de foto. Probeer het
                        opnieuw.</p>}
            </div>
        </div>
    );
}

export default ImageRequestPage;