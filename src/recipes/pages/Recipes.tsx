import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { RecipesBloc } from '../blocs/RecipesBloc';
import { Configuration, RecipesApi } from '../client';
import RecipesContext from '../RecipesContext';
import { RecipeListPage } from './RecipeListPage';
import { RecipePage } from './RecipePage';

export const Recipes: React.FC = () => {
  const recipesApi = new RecipesApi(new Configuration({basePath: "http://localhost:8000"}));
  const recipesBloc = new RecipesBloc(recipesApi);

  let { path } = useRouteMatch();

  return (
    <>
     <RecipesContext.Provider value={recipesBloc}>
        <Switch>
          <Route exact path={path}>
            <RecipeListPage/>
          </Route>
          <Route path={`${path}/:recipeId`}>
            <RecipePage/> 
          </Route>
        </Switch>

     </RecipesContext.Provider>
    </>
  )
}
