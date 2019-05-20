import React from 'react';
import ReactDOM from 'react-dom';
import { Route,  BrowserRouter as Router } from 'react-router-dom'

import './index.css';
import Login  from './components/Login'
import MyQuizs  from './components/MyQuizs'
import UpdateQuizs  from './components/UpdateQuizs'
import AllSubmittedQuizs  from './components/AllSubmittedQuizs'
import ReviewAnswers  from './components/ReviewAnswers'
import LocalAssociations  from './components/LocalAssociations'
import LocalAssociationsAdmin  from './components/LocalAssociationsAdmin'

import StateAssociations  from './components/StateAssociations'
import StateAssociationsAdmin  from './components/StateAssociationsAdmin'
import NewStateAssociationsAdmin  from './components/NewStateAssociationsAdmin'
import NewStateAssociations  from './components/NewStateAssociations'
import NewLocalAssociations  from './components/NewLocalAssociations'
import NewLocalAssociationsAdmin  from './components/NewLocalAssociationsAdmin'
import Levels  from './components/Levels'
import NewLevels  from './components/NewLevels'
import Positions  from './components/Positions'
import NewPositions  from './components/NewPositions'
import UpdateStateAssociations  from './components/UpdateStateAssociations'
import UpdateStateAssociationsAdmin  from './components/UpdateStateAssociationsAdmin'
import UpdatePositions  from './components/UpdatePositions'
import UpdateLevels  from './components/UpdateLevels'
import UpdateLocalAsociations  from './components/UpdateLocalAsociations'
import UpdateLocalAssociationsAdmin  from './components/UpdateLocalAssociationsAdmin'
import Classes  from './components/Classes'
import UpdateClasses  from './components/UpdateClasses'
import NewClasses  from './components/NewClasses'
import Segmants  from './components/Segmants'
import NewSegments  from './components/NewSegments'
import UpdateSegments  from './components/UpdateSegments'
import Teachers  from './components/Teachers'
import Students  from './components/Students'
import Dashboard  from './components/Dashboard'

import StudentsDetail  from './components/StudentsDetail'
import TeacherDetail  from './components/TeacherDetail'
import CoursesOfFreeUsers  from './components/CoursesOfFreeUsers'
import NewCoursesOfFreeUsers  from './components/NewCoursesOfFreeUsers'
import newQuiz  from './components/newQuiz'


 

 import * as serviceWorker from './serviceWorker';
 const userData =JSON.parse(localStorage.getItem("userData"));
 var routing=[];
 if ( userData !== null  && typeof userData.id !== 'undefined' &&  userData.id !== ''){
           routing = (
            <Router>
              <div>
                <Route path="/login" component={Dashboard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path='/' exact component={Dashboard} />
                <Route path="/my-quizs" component={MyQuizs} />
                <Route path="/update-quizs" component={UpdateQuizs} />
                <Route path="/all-submitted-quizs" component={AllSubmittedQuizs} />
                <Route path="/review-answers" component={ReviewAnswers} />
                <Route path="/local-associations" component={LocalAssociations} />
                <Route path="/state-associations" component={StateAssociations} />
                <Route path="/new-state-associations" component={NewStateAssociations} />
                <Route path="/new-local-associations" component={NewLocalAssociations} />
                <Route path="/state-associations-admin" component={StateAssociationsAdmin} />
                <Route path="/new-state-associations-admin" component={NewStateAssociationsAdmin} />
                <Route path="/local-associations-admin" component={LocalAssociationsAdmin} />
                <Route path="/new-local-associations-admin" component={NewLocalAssociationsAdmin} />
                <Route path="/levels" component={Levels} />
                <Route path="/new-levels" component={NewLevels} />
                <Route path="/positions" component={Positions} />
                <Route path="/new-positions" component={NewPositions} />
                <Route path="/update-state-associations" component={UpdateStateAssociations} />
                <Route path="/update-state-associations-admin" component={UpdateStateAssociationsAdmin} />
                <Route path="/update-positions" component={UpdatePositions} />
                <Route path="/update-levels" component={UpdateLevels} />
                <Route path="/update-local-asociations" component={UpdateLocalAsociations} />
                <Route path="/update-local-associations-admin" component={UpdateLocalAssociationsAdmin} />
                <Route path="/classes" component={Classes} />
                <Route path="/update-classes" component={UpdateClasses} />
                <Route path="/new-classes" component={NewClasses} />
                <Route path="/segmants" component={Segmants} />
                <Route path="/new-segments" component={NewSegments} />
                <Route path="/update-segments" component={UpdateSegments} />
                <Route path="/teachers" component={Teachers} />
                <Route path="/students" component={Students} />
                <Route path="/students-detail" component={StudentsDetail} />
                <Route path="/teacher-detail" component={TeacherDetail} />
                <Route path="/courses-of-free-users" component={CoursesOfFreeUsers} />
                <Route path="/new-courses-of-free-users" component={NewCoursesOfFreeUsers} />
                <Route path="/new-quiz" component={newQuiz} />

                
                
              </div>
            </Router>
          ) 
 }else{
   routing = (
    <Router>
      <div>
        <Route path='/'   component={Login} />
      </div>
    </Router>
  ) 
 }



ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
