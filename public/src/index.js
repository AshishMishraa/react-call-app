import React from 'react';
import ReactDOM from 'react-dom';
import { Route,  BrowserRouter as Router } from 'react-router-dom'

import './index.css';
import App from './App';
import Login  from './components/Login'
import MyQuizs  from './components/MyQuizs'
import UpdateQuizs  from './components/UpdateQuizs'
import AllSubmittedQuizs  from './components/AllSubmittedQuizs'
import ReviewAnswers  from './components/ReviewAnswers'

 import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/my-quizs" component={MyQuizs} />
      <Route path="/update-quizs" component={UpdateQuizs} />
      <Route path="/all-submitted-quizs" component={AllSubmittedQuizs} />
      <Route path="/review-answers" component={ReviewAnswers} />


    </div>
  </Router>
) 

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
