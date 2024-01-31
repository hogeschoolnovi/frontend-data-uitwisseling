import React, {useEffect, useState} from 'react';
import './ImageRequestPage.css';
import axios from 'axios';
import useStudents from "../../hooks/UseStudents";

function ImageRequestPage() {
    const [image, setImage] = useState([]);
    const [diploma, setDiploma] = useState([]);
    const [previewUrlImage, setPreviewUrlImage] = useState('');
    const [previewUrlDiploma, setPreviewUrlDiploma] = useState('');
    const [studentNumber, setStudentNumber] = useState(0);

    function handleImageChange(e) {
        // Sla het gekozen bestand op
        const uploadedImage = e.target.files[0];
        console.log(uploadedImage);
        // Sla het gekozen bestand op in de state
        setImage(uploadedImage);
        // Sla de preview URL op zodat we deze kunnen laten zien in een <img>
        setPreviewUrlImage(URL.createObjectURL(uploadedImage));
    }
    function handleDiplomaChange(e) {
        // Sla het gekozen bestand op
        const uploadedDiploma = e.target.files[0];
        console.log(uploadedDiploma);
        // Sla het gekozen bestand op in de state
        setDiploma(uploadedDiploma);
        // Sla de preview URL op zodat we deze kunnen laten zien in een <img>
        setPreviewUrlDiploma(URL.createObjectURL(uploadedDiploma));
    }

    async function sendImage(e) {
        // Voorkom een refresh op submit
        e.preventDefault();
      console.log(image)
        // maak een nieuw FormData object (ingebouwd type van JavaScript)
        const formData = new FormData();
        // Voeg daar ons bestand uit de state aan toe onder de key "file"
        formData.append("file", image);

        try {
            // verstuur ons formData object en geef in de header aan dat het om een form-data type gaat
            // Let op: we wijzigen nu ALTIJD de afbeelding voor student 1001, als je een andere student wil kiezen of dit dynamisch wil maken, pas je de url aan!
            const result = await axios.post(`http://localhost:8080/students/${studentNumber}/photo`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                })
            console.log(result.data);
        } catch (e) {
            console.error(e)
        }
    }

    async function sendDiploma(e) {
        // Voorkom een refresh op submit
        e.preventDefault();
        console.log(diploma)
        // maak een nieuw FormData object (ingebouwd type van JavaScript)
        const formData = new FormData();
        // Voeg daar ons bestand uit de state aan toe onder de key "file"
        formData.append("file", diploma);

        try {
            // verstuur ons formData object en geef in de header aan dat het om een form-data type gaat
            // Let op: we wijzigen nu ALTIJD de afbeelding voor student 1001, als je een andere student wil kiezen of dit dynamisch wil maken, pas je de url aan!
            const result = await axios.post(`http://localhost:8080/students/${studentNumber}/diploma`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                })
            console.log(result.data);
        } catch (e) {
            console.error(e)
        }
    }

    const {students} = useStudents('http://localhost:8080/students')

    function handleStudentNumber(e) {
      e.preventDefault()
        setStudentNumber(e.target.value)
    }

    return (
        <div className="upload-page-container">
            <div className="first-page-container">
                <h1>Afbeelding uploaden en preview bekijken</h1>
                <h3>Voor welke student wil je een profielfoto uploaden?</h3>
                <select name="student" id="student" onChange={handleStudentNumber}>
                    <option disabled selected value> -- select an option --</option>
                    {students && students.map((studentNumber) => {
                        return <option value={studentNumber.studentNumber}>{studentNumber.name}</option>
                    })}
                </select>
                <form onSubmit={sendImage}>

                    <label htmlFor="student-image">
                        Kies afbeelding:
                        <input type="file" name="image-field" id="student-image" onChange={handleImageChange}/>
                    </label>
                    {/*Als er een preview url is, dan willen we deze in een afbeelding tonen*/}
                    {previewUrlImage &&
                        <label>
                            Preview:
                            <img src={previewUrlImage} alt="Voorbeeld van de afbeelding die zojuist gekozen is"
                                 className="image-preview"/>
                        </label>
                    }
                    <button type="submit">Uploaden</button>
                </form>
            </div>
            <div className="second-page-container">
                <h1>Diploma uploaden en preview bekijken</h1>
                <h3>Voor welke student wil je een diploma uploaden?</h3>
                <select name="student" id="student" onChange={handleStudentNumber}>
                    <option disabled selected value> -- select an option --</option>
                    {students && students.map((studentNumber) => {
                        return <option value={studentNumber.studentNumber}>{studentNumber.name}</option>
                    })}
                </select>
                <form onSubmit={sendDiploma}>
                    <label htmlFor="student-image">
                        Kies afbeelding:
                        <input type="file" name="image-field" id="student-image" onChange={handleDiplomaChange}/>
                    </label>
                    {/*Als er een preview url is, dan willen we deze in een afbeelding tonen*/}
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