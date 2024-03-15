import React, {useEffect, useState} from 'react';
import axios from "axios";
import './HomePage.css';

function HomePage() {

    const [error, setError] = useState('');

    useEffect(() => {
        getData()
    }, []);

    async function getData(){
        try{
            const result = await axios.get('https://fakestoreapi.com/product');
            console.log(result);
        }catch (e) {
            console.error(e)
            setError(e.message)
        }
    }

  return (
    <div>
      <h1>Studentendatabase NOVI</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt earum eum excepturi facere ipsam maxime porro quibusdam reiciendis saepe similique!</p>
    </div>
  );
}

export default HomePage;