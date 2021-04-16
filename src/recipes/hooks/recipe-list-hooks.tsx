import React, { useContext, useEffect, useState } from 'react';
import { RecipesBloc, RecipesFetchEvent } from '../blocs/RecipesBloc';
import { Recipe } from '../client';
import RecipesContext from '../RecipesContext';

type UseRecipes = () => {
  recipes: Recipe[];
};

type UseRecipesActions = () => {
  fetchRecipes: () => void;
}

export const useRecipeList: UseRecipes = () => {
  const recipesBloc: RecipesBloc = useContext(RecipesContext);
  const [recipes, setRecipes] = useState([] as Recipe[]);
  recipesBloc.listen(state =>  setRecipes(state.recipes ?? []));

  useEffect(() => {
    recipesBloc.add(new RecipesFetchEvent());
  }, []);

  return {recipes: recipes};
};

export const useRecipeListActions: UseRecipesActions = () => {
  const recipesBloc: RecipesBloc = useContext(RecipesContext);
 
  return {
    fetchRecipes: () => recipesBloc.add(new RecipesFetchEvent())
  }
};