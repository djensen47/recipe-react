import React, { useContext } from 'react';
import { RecipeDeleteEvent, RecipeBloc, RecipeCreateEvent, RecipeUpdateEvent } from '../blocs/RecipeBloc';
import { Recipe } from '../client';
import { RecipeContext } from '../RecipesContext';

type UseRecipeActions = () => {
  createRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  deleteRecipe: (recipe: Recipe) => void;
};

export const useRecipeActions: UseRecipeActions = () => {
  const recipeBloc: RecipeBloc = useContext(RecipeContext);
 
  const deleteRecipe = (recipe: Recipe) => {
    recipeBloc.add(new RecipeDeleteEvent(recipe));
  };

  const createRecipe = (recipe: Recipe) => {
    recipeBloc.add(new RecipeCreateEvent(recipe));
  };

  const updateRecipe = (recipe: Recipe) => {
    recipeBloc.add(new RecipeUpdateEvent(recipe));
  }

  return {
    createRecipe: createRecipe,
    updateRecipe: updateRecipe,
    deleteRecipe: deleteRecipe,
  }
};