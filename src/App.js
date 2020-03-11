import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NewAccount from "./components/auth/NewAccount";
import Projects from "./components/Projects/Projects";

import ProjectState from "./context/Projects/ProjectState";
import TaskState from "./context/tasks/TaskState";
import AlertState from "./context/alerts/alertState";
import AuthState from "./context/authentication/authState";
import tokenAuth from "./config/tokenAuth";
import PrivateRoute from './components/routes/PrivateRoute';

//check if theres a token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/new-account" component={NewAccount} />
                <PrivateRoute exact path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
