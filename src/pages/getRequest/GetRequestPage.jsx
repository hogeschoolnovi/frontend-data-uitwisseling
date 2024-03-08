import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './GetRequestPage.css';
import useStudents from "../../hooks/useStudents";
import useDownload from "../../hooks/useDownload";

function GetRequestPage() {
    const [getList, setGetList] = useState(false)
    const {students} = useStudents('http://localhost:8080/students', getList)

    const {
        imageData,
        loading,
        error,
        fetchData
    } = useDownload('http://localhost:8080/students');

    async function deleteUser(id) {
        try {
            await axios.delete(`http://localhost:8080/students/${id}`)
            window.alert('User successfully deleted!');
            setGetList(!getList)
        } catch (e) {
            console.error(e)
        }
    }

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
                {students.map((student) => {
                    // De key moet op het buitenste element staan en uniek zijn
                    return <tr key={student.studentNumber}>
                        <td>{student.studentNumber}</td>
                        {/*Even checken of er uberhaupt een file is, en zo ja, dan laten we hem zien!*/}
                        <td>{student.studentPhoto && <img src={student.studentPhoto.url} alt={student.name}
                                                          onClick={() => fetchData(`${student.studentNumber}/photo`)}/>}</td>
                        <td><strong>{student.name[0].toUpperCase() + student.name.slice(1)}</strong></td>
                        <td>{student.course}</td>
                        <td>{student.emailAddress}</td>
                        <td>{student.diploma && <img src={student.diploma.url} alt={student.name}
                                                     onClick={() => fetchData(`${student.studentNumber}/diploma`)}/>}</td>
                        <td>
                            <button onClick={() => deleteUser(student.studentNumber)}>Verwijder</button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
            <div className="download-container">
                {loading ? <p>Loading...</p> : imageData &&
                    <img className='image-container' src={imageData} alt="blob"/>}
                {error && <p>Something went wrong!</p>}
            </div>
        </div>
    );
}

export default GetRequestPage;