import React, { useContext } from 'react';
import { RecipeDeleteEvent, RecipeBloc } from '../blocs/RecipeBloc';
import { Recipe } from '../client';
import { RecipeContext } from '../RecipesContext';

type UseRecipeActions = () => {
  deleteRecipe: (recipe: Recipe) => void;
};

export const useRecipeActions: UseRecipeActions = () => {
  const recipeBloc: RecipeBloc = useContext(RecipeContext);
 
  const deleteRecipe = (recipe: Recipe) => {
    recipeBloc.add(new RecipeDeleteEvent(recipe));
  }

  return {
    deleteRecipe: deleteRecipe 
  }
};