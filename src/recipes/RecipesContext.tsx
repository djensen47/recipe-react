import React from 'react';
import { RecipesBloc } from './blocs/RecipesBloc';
import { RecipesApi } from './client';

const recipesApi = new RecipesApi();
const recipesBloc = new RecipesBloc(recipesApi);
const RecipesContext = React.createContext(recipesBloc);


export default RecipesContext;