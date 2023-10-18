import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GetRequestPage.css';
import useStudents from "../../hooks/useStudents/UseStudents";

function GetRequestPage() {
  // const [students, setStudents] = useState([]);

  // const url = 'http://localhost:8080/students'

  // useEffect(() => {
  //   async function fetchStudents() {
  //     try {
  //       const response = await axios.get('http://localhost:8080/students');
  //       // Plaats alle studenten in de state zodat we het op de pagina kunnen gebruiken
  //       setStudents(response.data);
  //       console.log(response.data);
  //     } catch(e) {
  //         console.error(e);
  //     }
  //   }
  //
  //   fetchStudents();
  // }, []);

  const {students} = useStudents('http://localhost:8080/students')

  return (
    <div className="page-container">
      {console.log(students)}
      <h1>Alle studenten bij NOVI</h1>
      <table>
        <thead>
        <tr>
          <th>Studentnummer</th>
          <th>Foto</th>
          <th>Naam</th>
          <th>Opleiding</th>
          <th>Emailadres</th>
        </tr>
        </thead>
        <tbody>
        {students.map((student) => {
          // De key moet op het buitenste element staan en uniek zijn
          return <tr key={student.studentNumber}>
            <td>{student.studentNumber}</td>
            {/*Even checken of er uberhaupt een file is, en zo ja, dan laten we hem zien!*/}
            <td>{student.file && <img src={student.file.url} alt={student.name}/>}</td>
            <td>{student.name}</td>
            <td>{student.course}</td>
            <td>{student.emailAddress}</td>
          </tr>
        })}
        </tbody>
      </table>
    </div>
  );
}

export default GetRequestPage;