import React, { useContext, useEffect, useState } from 'react';
import { BlocBuilder } from '@felangel/react-bloc';
import { Box, Text, Heading, Layer, Button } from 'grommet';
import { RecipeDeleteEvent, RecipesBloc, RecipesEvent, RecipesFetchEvent, RecipesState } from '../blocs/RecipesBloc';
import { Recipe } from '../client';
import RecipesContext from '../RecipesContext';
import { RecipeListItem } from './RecipeListItem';
import { RecipeDeleteDialog } from './RecipeDeleteDialog';
import { useRecipeList, useRecipeListActions } from '../hooks/recipe-list-hooks';
import { useRecipeActions } from '../hooks/recipe-hooks';

export const RecipesList: React.FC = () => {
  const recipesBloc: RecipesBloc = useContext(RecipesContext);
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | undefined>();
  const {deleteRecipe} = useRecipeActions();

  useEffect(() => {
    recipesBloc.add(new RecipesFetchEvent());
  }, []);

  const {recipes} = useRecipeList();

  const hideDelete = () => setRecipeToDelete(undefined);
  const showDelete = (recipe: Recipe) => setRecipeToDelete(recipe);

  const showEdit = (recipe: Recipe) => { };

  const handleDeleteRecipe = () => {
    if (!!recipeToDelete) {
      deleteRecipe(recipeToDelete);
    }
    hideDelete();
  };

  return (
    <>
      {recipes?.map(recipe => (
        <RecipeListItem key={recipe.id} recipe={recipe} onEdit={showEdit} onDelete={showDelete} />
      ))}
      
      {recipeToDelete && (
        <RecipeDeleteDialog recipe={recipeToDelete} onHide={hideDelete} onConfirm={handleDeleteRecipe} />
      )}
    </>
  );
}