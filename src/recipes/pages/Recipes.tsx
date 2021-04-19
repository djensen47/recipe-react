import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { RecipeContextProvider } from '../context/RecipeContext';
import { RecipeListContextProvider } from '../context/RecipeListContext';
import { RecipeListPage } from './RecipeListPage';
import { RecipePage } from './RecipePage';

export const Recipes: React.FC = () => {
  let { path } = useRouteMatch();

  return (
    <>
      <RecipeListContextProvider>
        <RecipeContextProvider>
          <Switch>
            <Route exact path={path}>
              <RecipeListPage />
            </Route>
            <Route path={`${path}/:recipeId`}>
              <RecipePage />
            </Route>
          </Switch>
        </RecipeContextProvider>
      </RecipeListContextProvider>
    </>
  )
}
