//Libraries
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Components
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Projects from './components/projects/Projects';
import authToken from './config/authToken';
import PrivateRoute from './components/HOC/PrivateRoute';

//Context
import ProjectState from './context/project/ProjectState';
import TaskState from './context/task/TaskState';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';

const token = localStorage.getItem("token");

if (token) {
  authToken(token);
}

function App() {
  
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
              <Router>
                <Switch>
                  <Route exact path = "/" component = {Login} />
                  <Route exact path = "/new-account" component = {NewAccount} />
                  <PrivateRoute exact path = "/projects" component = {Projects} />
                </Switch>
              </Router>
            </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
