import React, { useContext, useEffect, useMemo, useState } from 'react';
import { RecipeBloc } from '../blocs/RecipeBloc';
import { RecipeState } from "../blocs/RecipeState";
import { RecipeStatus } from "../blocs/RecipeStatus";
import { RecipeListBloc } from '../blocs/RecipeListBloc';
import { Recipe } from '../client';
import { RecipeContext, RecipesContext } from '../RecipesContext';
import { RecipeListFetchEvent } from '../blocs/RecipeListEvent';

type UseRecipes = () => {
  recipes: Recipe[];
};

type UseRecipesActions = () => {
  fetchRecipes: () => void;
}

export const useRecipeList: UseRecipes = () => {
  const recipesBloc: RecipeListBloc = useContext(RecipesContext);
  const recipeBloc: RecipeBloc = useContext(RecipeContext);
  const [recipes, setRecipes] = useState([] as Recipe[]);
  recipesBloc.listen(state => setRecipes(state.recipes ?? []));

  useEffect(() => {
    recipesBloc.add(new RecipeListFetchEvent());
  }, []);

  let subscription = useMemo(() => {
    console.log("subscribing");
    return recipeBloc.listen(state => {
      console.log(state);
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
  const recipesBloc: RecipeListBloc = useContext(RecipesContext);

  return {
    fetchRecipes: () => recipesBloc.add(new RecipeListFetchEvent())
  }
};