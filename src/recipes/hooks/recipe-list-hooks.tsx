import React, { useContext, useEffect, useMemo, useState } from 'react';
import { RecipeBloc } from '../blocs/RecipeBloc';
import { RecipeState } from "../blocs/RecipeState";
import { RecipeStatus } from "../blocs/RecipeStatus";
import { RecipeListBloc } from '../blocs/RecipeListBloc';
import { Recipe } from '../client';
import { useRecipeBloc } from '../RecipeContext';
import { useRecipeListBloc } from '../RecipeListContext';
import { RecipeListFetchEvent } from '../blocs/RecipeListEvent';

type UseRecipes = () => {
  recipes: Recipe[];
};

type UseRecipesActions = () => {
  fetchRecipes: () => void;
}

export const useRecipeList: UseRecipes = () => {
  const recipesBloc: RecipeListBloc = useRecipeListBloc();
  const recipeBloc: RecipeBloc = useRecipeBloc();
  const [recipes, setRecipes] = useState([] as Recipe[]);
  recipesBloc.listen(state => setRecipes(state.recipes ?? []));

  useEffect(() => {
    recipesBloc.add(new RecipeListFetchEvent());
  }, []);

  let subscription = useMemo(() => {
    return recipeBloc.listen(state => {
      if (state.status === RecipeStatus.CREATED
          || state.status === RecipeStatus.DELETED
          || state.status == RecipeStatus.UPDATED) {
          recipesBloc.add(new RecipeListFetchEvent());
      }
    });
  }, []);

  useEffect(() => () => {
    subscription.unsubscribe();
  })

  return { recipes: recipes };
};

export const useRecipeListActions: UseRecipesActions = () => {
  const recipesBloc: RecipeListBloc = useRecipeListBloc();

  return {
    fetchRecipes: () => recipesBloc.add(new RecipeListFetchEvent())
  }
};