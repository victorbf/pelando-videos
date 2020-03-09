import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './config';
import GoogleLoginPage from './pages/GoogleLoginPage';
import VideosListPage from './pages/VideosListPage';

const App = () => (
  <BrowserRouter>
    <Route exact path="/login" component={GoogleLoginPage} />
    <Route exact path="/playando" component={VideosListPage} />
  </BrowserRouter>
)


export default App;
