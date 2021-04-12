import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { HomePage } from './home/HomePage';
import {Recipes} from './recipes/pages/Recipes';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="/recipes">
          <Recipes/>
        </Route> 
      </Switch>
    </BrowserRouter>
  );
}
