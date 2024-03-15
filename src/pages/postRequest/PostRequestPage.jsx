import React, {useState} from 'react';
import './PostRequestPage.css';
import axios from 'axios';

function PostRequestPage() {
    const [studentName, setStudentName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [studentCourse, setStudentCourse] = useState('bachelor');
    const [addSucces, toggleAddSuccess] = useState(false);
    const [error, setError] = useState(null);

    async function addStudent(e) {
        // voorkom refresh
        e.preventDefault();
        console.log(studentName, studentEmail, studentCourse);
        setError(null);

        try {
            // Verstuur de data in een object en zorg dat de keys overeenkomen met die in de backend
            const response = await axios.post('http://localhost:8080/students', {
                name: studentName,
                emailAddress: studentEmail,
                course: studentCourse,
            });

            console.log(response.data);
            toggleAddSuccess(true);
        } catch (e) {
            console.error(e);
            setError(e);
        }
    }

    return (
        <div className="page-container">
            <h1>Een nieuwe student toevoegen</h1>
            {addSucces === true && <p className="success-message">Student is toegevoegd!</p>}
            <form onSubmit={addStudent}>
                <label htmlFor="student-name">
                    Naam en achternaam:
                    <input
                        type="text"
                        name="student-name-field"
                        id="student-name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}/>
                </label>
                <label htmlFor="student-email">
                    Email:
                    <input
                        type="email"
                        name="student-email-field"
                        id="student-email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}/>
                </label>
                <label htmlFor="student-email">
                    Opleiding:
                    <select
                        id="student-course"
                        name="student-course-field"
                        value={studentCourse}
                        onChange={(e) => setStudentCourse(e.target.value)}
                    >
                        <option value="fsd-fulltime">
                            Full Stack Developer bootcamp (voltijd)
                        </option>
                        <option value="fsd-parttime">
                            Full Stack Developer bootcamp (deeltijd)
                        </option>
                        <option value="bachelor">
                            Bachelor Bedrijskundige Informatica
                        </option>
                    </select>
                </label>
                <button type="submit">
                    Voeg student toe
                </button>
            </form>
            {error && <p className="error-message">Toevoegen is mislukt. Probeer het opnieuw</p>}
        </div>
    );
}

export default PostRequestPage;