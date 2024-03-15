import React from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import ImageRequestPage from './pages/imageRequest/ImageRequestPage';
import PostRequestPage from './pages/postRequest/PostRequestPage';
import GetRequestPage from './pages/getRequest/GetRequestPage';
import HomePage from './pages/home/HomePage';
import './test'

function App() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/get-request">GET-request</Link></li>
          <li><Link to="/post-request">POST-request</Link></li>
          <li><Link to="/image-request">Bestanden</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={ <HomePage />}/>
        <Route path="/get-request" element={<GetRequestPage />}/>
        <Route path="/post-request" element={<PostRequestPage />}/>
        <Route path="/image-request" element={<ImageRequestPage />}/>
      </Routes>
    </>
  );
}

export default App;
