import React, { useContext } from 'react';
import { RecipeBloc } from '../blocs/RecipeBloc';
import { RecipeDeleteEvent, RecipeCreateEvent, RecipeUpdateEvent } from '../blocs/RecipeEvent';
import { Recipe } from '../client';
import { useRecipeBloc } from '../RecipeContext';

type UseRecipeActions = () => {
  createRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  deleteRecipe: (recipe: Recipe) => void;
};

export const useRecipeActions: UseRecipeActions = () => {
  const recipeBloc = useRecipeBloc();
 
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