import React, {useEffect, useState} from 'react';
import './ImageRequestPage.css';
import axios from "axios";

function ImageRequestPage() {

    const [students, setStudents] = useState([]);
    const [image, setImage] = useState('');
    const [previewUrlPhoto, setPreviewUrlPhoto] = useState('');
    const [previewUrlDiploma, setPreviewUrlDiploma] = useState('');
    const [studentNumber, setStudentNumber] = useState(0);

    const handleImageChange = (e, path) => {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        setImage(uploadedImage);
        console.log(e.target.files[0])

        if (path === 'photo'){
            setPreviewUrlPhoto(URL.createObjectURL(uploadedImage));
        } else{
            setPreviewUrlDiploma(URL.createObjectURL(uploadedImage))
        }
    };

    const sendUpload = async (id, path) => {
        try {
            const formData = new FormData();
            formData.append("file", image);

            const result = await axios.post(`http://localhost:8080/students/${id}/${path}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            console.log(result.data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleStudentNumber = (e) => {
        e.preventDefault();
        setStudentNumber(e.target.value);
        console.log(e.target.value)
    };

    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await axios.get('http://localhost:8080/students');
                // Plaats alle studenten in de state zodat we het op de pagina kunnen gebruiken
                setStudents(response.data);
                console.log(response.data);
            } catch(e) {
                console.error(e);
            }
        }
        void fetchStudents()
    }, []);

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