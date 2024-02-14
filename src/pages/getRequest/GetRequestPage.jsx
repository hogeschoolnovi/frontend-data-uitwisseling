import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './GetRequestPage.css';

function GetRequestPage() {

    const [students, setStudents] = useState([]);
    const [getList, setGetList] = useState(false);
    const [imageData, setImageData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (id) => {
        try {
            setLoading(true);
            const download = await axios.get(`http://localhost:8080/students/${id}`, { responseType: 'arraybuffer' });
            const blob = new Blob([download.data], { type: 'image/png' });
            const dataUrl = URL.createObjectURL(blob);
            setImageData(dataUrl);
            setLoading(false);
        } catch (e) {
            setError(e);
            setLoading(false);
        }
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
    }, [getList]);

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