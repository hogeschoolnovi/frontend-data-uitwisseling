import {useState, useEffect} from 'react';
import axios from 'axios';
const UseStudents = (url) => {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await axios.get(url);
                // Plaats alle studenten in de state zodat we het op de pagina kunnen gebruiken
                setStudents(response.data);
                console.log(response.data);
            } catch(e) {
                console.error(e);
            }
        }
        void fetchStudents()
    }, [url]);
    return { students }
};

export default UseStudents;