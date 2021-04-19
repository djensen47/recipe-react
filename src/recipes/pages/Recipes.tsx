import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { RecipeBloc } from '../blocs/RecipeBloc';
import { RecipeListBloc } from '../blocs/RecipeListBloc';
import { Configuration, RecipesApi } from '../client';
import { RecipeContextProvider } from '../RecipeContext';
import { RecipeListContextProvider } from '../RecipeListContext';
import { RecipeListPage } from './RecipeListPage';
import { RecipePage } from './RecipePage';

export const Recipes: React.FC = () => {
  const recipesApi = new RecipesApi(new Configuration({ basePath: "http://localhost:8000" }));
  const recipesBloc = new RecipeListBloc(recipesApi);
  const recipeBloc = new RecipeBloc(recipesApi);

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
