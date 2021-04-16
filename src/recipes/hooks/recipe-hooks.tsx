import React, { useContext } from 'react';
import { RecipeDeleteEvent, RecipesBloc } from '../blocs/RecipesBloc';
import { Recipe } from '../client';
import RecipesContext from '../RecipesContext';

type UseRecipeActions = () => {
  deleteRecipe: (recipe: Recipe) => void;
};

export const useRecipeActions: UseRecipeActions = () => {
  const recipesBloc: RecipesBloc = useContext(RecipesContext);
 
  const deleteRecipe = (recipe: Recipe) => {
    recipesBloc.add(new RecipeDeleteEvent(recipe));
  }
  
  return {
    deleteRecipe: deleteRecipe 
  }
};