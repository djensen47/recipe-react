import React, { useState } from 'react';
import { Recipe } from '../client';
import { RecipeListItem } from './RecipeListItem';
import { RecipeDeleteDialog } from './RecipeDeleteDialog';
import { useRecipeList } from '../hooks/recipe-list-hooks';
import { useRecipeActions } from '../hooks/recipe-hooks';
import { RecipeDialog } from './RecipeDialog';
import { Box } from 'grommet';

export const RecipesList: React.FC = () => {
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | undefined>();
  const [recipeToEdit, setRecipeToUpdate] = useState<Recipe | undefined>();
  const { deleteRecipe, updateRecipe } = useRecipeActions();

  const { recipes } = useRecipeList();

  const hideDelete = () => setRecipeToDelete(undefined);
  const showDelete = (recipe: Recipe) => setRecipeToDelete(recipe);

  const hideUpdate = () => setRecipeToUpdate(undefined);
  const showUpdate = (recipe: Recipe) => setRecipeToUpdate(recipe);

  const handleDeleteRecipe = () => {
    if (!!recipeToDelete) {
      deleteRecipe(recipeToDelete);
    }
    hideDelete();
  };

  const handleEditRecipe = (recipe: Recipe) => {
    updateRecipe(recipe);
    hideUpdate();
  };

  return (
    <>
      <Box role="list">
        {recipes?.map(recipe => (
          <RecipeListItem key={recipe.id} recipe={recipe} onEdit={showUpdate} onDelete={showDelete} />
        ))}
      </Box>

      {recipeToDelete && (
        <RecipeDeleteDialog recipe={recipeToDelete} onHide={hideDelete} onConfirm={handleDeleteRecipe} />
      )}

      {recipeToEdit && (
        <RecipeDialog recipe={recipeToEdit} onHide={hideUpdate} onConfirm={handleEditRecipe} />
      )}

    </>
  );
}