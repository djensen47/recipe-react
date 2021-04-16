import React, { useContext, useEffect, useMemo, useState } from 'react';
import { RecipeBloc, RecipeState, RecipeStatus } from '../blocs/RecipeBloc';
import { RecipesBloc, RecipesFetchEvent } from '../blocs/RecipesBloc';
import { Recipe } from '../client';
import { RecipeContext, RecipesContext } from '../RecipesContext';

type UseRecipes = () => {
  recipes: Recipe[];
};

type UseRecipesActions = () => {
  fetchRecipes: () => void;
}

export const useRecipeList: UseRecipes = () => {
  const recipesBloc: RecipesBloc = useContext(RecipesContext);
  const recipeBloc: RecipeBloc = useContext(RecipeContext);
  const [recipes, setRecipes] = useState([] as Recipe[]);
  recipesBloc.listen(state => setRecipes(state.recipes ?? []));

  useEffect(() => {
    recipesBloc.add(new RecipesFetchEvent());
  }, []);

  let subscription = useMemo(() => {
    console.log("subscribing");
    return recipeBloc.listen(state => {
      console.log(state);
      if (state.status === RecipeStatus.CREATED
          || state.status === RecipeStatus.DELETED
          || state.status == RecipeStatus.UPDATED) {
          recipesBloc.add(new RecipesFetchEvent());
      }
    });
  }, []);

  useEffect(() => () => {
    subscription.unsubscribe();
  })

  return { recipes: recipes };
};

export const useRecipeListActions: UseRecipesActions = () => {
  const recipesBloc: RecipesBloc = useContext(RecipesContext);

  return {
    fetchRecipes: () => recipesBloc.add(new RecipesFetchEvent())
  }
};