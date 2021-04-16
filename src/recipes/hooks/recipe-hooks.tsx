import React, { useContext } from 'react';
import { RecipeDeleteEvent, RecipeBloc, RecipeCreateEvent } from '../blocs/RecipeBloc';
import { Recipe } from '../client';
import { RecipeContext } from '../RecipesContext';

type UseRecipeActions = () => {
  deleteRecipe: (recipe: Recipe) => void;
  createRecipe: (recipe: Recipe) => void;
};

export const useRecipeActions: UseRecipeActions = () => {
  const recipeBloc: RecipeBloc = useContext(RecipeContext);
 
  const deleteRecipe = (recipe: Recipe) => {
    recipeBloc.add(new RecipeDeleteEvent(recipe));
  };

  const createRecipe = (recipe: Recipe) => {
    recipeBloc.add(new RecipeCreateEvent(recipe));
  }

  return {
    deleteRecipe: deleteRecipe,
    createRecipe: createRecipe
  }
};