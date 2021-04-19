import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { RecipeBloc } from '../blocs/RecipeBloc';
import { RecipeListBloc } from '../blocs/RecipeListBloc';
import { Configuration, RecipesApi } from '../client';
import { RecipeContext, RecipesContext } from '../RecipesContext';
import { RecipeListPage } from './RecipeListPage';
import { RecipePage } from './RecipePage';

export const Recipes: React.FC = () => {
  const recipesApi = new RecipesApi(new Configuration({ basePath: "http://localhost:8000" }));
  const recipesBloc = new RecipeListBloc(recipesApi);
  const recipeBloc = new RecipeBloc(recipesApi);

  let { path } = useRouteMatch();

  return (
    <>
      <RecipesContext.Provider value={recipesBloc}>
        <RecipeContext.Provider value={recipeBloc}>
          <Switch>
            <Route exact path={path}>
              <RecipeListPage />
            </Route>
            <Route path={`${path}/:recipeId`}>
              <RecipePage />
            </Route>
          </Switch>
        </RecipeContext.Provider>
      </RecipesContext.Provider>
    </>
  )
}
