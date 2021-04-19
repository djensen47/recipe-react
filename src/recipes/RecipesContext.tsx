import React from 'react';
import { RecipeBloc } from './blocs/RecipeBloc';
import { RecipeListBloc } from './blocs/RecipeListBloc';
import { RecipesApi } from './client';

const recipesApi = new RecipesApi();
const recipesBloc = new RecipeListBloc(recipesApi);
const recipeBloc = new RecipeBloc(recipesApi);

export const RecipeContext = React.createContext(recipeBloc);
export const RecipesContext = React.createContext(recipesBloc);
