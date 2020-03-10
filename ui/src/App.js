import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import './config';
import { ToastContainer } from 'react-toastify';
import GoogleLoginPage from './pages/GoogleLoginPage';
import VideosListPage from './pages/VideosListPage';
import GlobalStyle from './assets/styles/global/GlobalStyles';

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <ToastContainer />
    <Switch>
      <Route exact path="/playando" component={VideosListPage} />
      <Route exact path="/login" component={GoogleLoginPage} />
      <Redirect to="/login" />
    </Switch>
  </BrowserRouter>
);


export default App;
