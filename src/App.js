import React from 'react';
import Home from "./Home/Home";

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  return (
      <Router>
        <div>
          <Switch>
              <Route exact path="/">
                  <Home/>
              </Route>
          </Switch>
        </div>
      </Router>

  );
}

export default App;
