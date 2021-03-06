import React, { useEffect, useMemo, useState } from 'react';
import { RecipeBloc } from '../blocs/RecipeBloc';
import { RecipeStatus } from "../blocs/RecipeStatus";
import { RecipeListBloc } from '../blocs/RecipeListBloc';
import { Recipe } from '../client';
import { useRecipeBloc } from '../context/RecipeContext';
import { useRecipeListBloc } from '../context/RecipeListContext';
import { RecipeListFetchEvent } from '../blocs/RecipeListEvent';

type UseRecipes = () => {
  recipes: Recipe[];
};

type UseRecipesActions = () => {
  fetchRecipes: () => void;
}

export const useRecipeList: UseRecipes = () => {
  const recipeListBloc: RecipeListBloc = useRecipeListBloc();
  const recipeBloc: RecipeBloc = useRecipeBloc();
  const [recipes, setRecipes] = useState([] as Recipe[]);
  const recipeListSubscription = useMemo(() => { 
    return recipeListBloc.listen(state => setRecipes(state.recipes ?? [])); 
  }, [recipeListBloc]);

  useEffect(() => {
    recipeListBloc.add(new RecipeListFetchEvent());
  }, [recipeListBloc]);

  const recipeSubscription = useMemo(() => {
    return recipeBloc.listen(state => {
      if (state.status === RecipeStatus.CREATED
          || state.status === RecipeStatus.DELETED
          || state.status === RecipeStatus.UPDATED) {
          recipeListBloc.add(new RecipeListFetchEvent());
      }
    });
  }, [recipeBloc, recipeListBloc]);

  useEffect(() => () => {
    recipeSubscription.unsubscribe();
    recipeListSubscription.unsubscribe();
  })

  return { recipes: recipes };
};

export const useRecipeListActions: UseRecipesActions = () => {
  const recipesBloc: RecipeListBloc = useRecipeListBloc();

  return {
    fetchRecipes: () => recipesBloc.add(new RecipeListFetchEvent())
  }
};