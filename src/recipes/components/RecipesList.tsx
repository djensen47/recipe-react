import React, { useState } from 'react';
import { Recipe } from '../client';
import { RecipeListItem } from './RecipeListItem';
import { RecipeDeleteDialog } from './RecipeDeleteDialog';
import { useRecipeList } from '../hooks/recipe-list-hooks';
import { useRecipeActions } from '../hooks/recipe-hooks';

export const RecipesList: React.FC = () => {
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | undefined>();
  const {deleteRecipe} = useRecipeActions();

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