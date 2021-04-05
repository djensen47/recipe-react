import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Recipes} from './recipes/pages/Recipes'
import './App.css';

export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <h1>Home</h1>
          </Route>
          <Route path="/recipes">
            <Recipes/>
          </Route> 
        </Switch>
      </BrowserRouter>
    </>
  );
}

