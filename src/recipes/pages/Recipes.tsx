import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { RecipeListPage } from './RecipeListPage';
import { RecipePage } from './RecipePage';

export const Recipes: React.FC = () => {
  let { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <RecipeListPage/>
        </Route>
        <Route path={`${path}/:recipeId`}>
          <RecipePage/> 
        </Route>
      </Switch>
    </>
  )
}
