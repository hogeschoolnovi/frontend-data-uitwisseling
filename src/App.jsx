import React from 'react';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
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
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/get-request">
          <GetRequestPage />
        </Route>
        <Route exact path="/post-request">
          <PostRequestPage />
        </Route>
        <Route exact path="/image-request">
          <ImageRequestPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
