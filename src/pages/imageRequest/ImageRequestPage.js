import React, {useEffect, useState} from 'react';
import './ImageRequestPage.css';
import axios from 'axios';

function ImageRequestPage() {
  const [file, setFile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState('');
  const [students, setStudents] = useState([]);
  const [studentNumber, setStudentNumber] = useState(0);

  function handleImageChange(e) {
    // Sla het gekozen bestand op
    const uploadedFile = e.target.files[0];
    console.log(uploadedFile);
    // Sla het gekozen bestand op in de state
    setFile(uploadedFile);
    // Sla de preview URL op zodat we deze kunnen laten zien in een <img>
    setPreviewUrl(URL.createObjectURL(uploadedFile));
  }

  async function sendImage(e) {
    // Voorkom een refresh op submit
    e.preventDefault();
    // maak een nieuw FormData object (ingebouwd type van JavaScript)
    const formData = new FormData();
    // Voeg daar ons bestand uit de state aan toe onder de key "file"
    formData.append("file", file);

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

    fetchStudents();
  }, []);

  function handleStudentNumber(e){
    setStudentNumber(e.target.value)
  }

  return (
    <div className="upload-page-container">
      <div className="first-page-container">
      <h1>Afbeelding uploaden en preview bekijken</h1>
        <h3>Voor welke student wil je een profielfoto uploaden?</h3>
        <select name="student" id="student" onChange={handleStudentNumber}>
          <option disabled selected value> -- select an option -- </option>
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
        {previewUrl &&
          <label>
            Preview:
            <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is" className="image-preview"/>
          </label>
        }
        <button type="submit">Uploaden</button>
      </form>
      </div>
      <div className="second-page-container">
        <h1>Afbeelding uploaden en preview bekijken</h1>
        <h3>Voor welke student wil je een cijferlijst uploaden?</h3>
        <select name="student" id="student">
          <option disabled selected value> -- select an option -- </option>
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
          {previewUrl &&
              <label>
                Preview:
                <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is" className="image-preview"/>
              </label>
          }
          <button type="submit">Uploaden</button>
        </form>
      </div>
    </div>
  );
}

export default ImageRequestPage;