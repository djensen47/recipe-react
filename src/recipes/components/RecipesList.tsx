import React, { useContext, useEffect, useState } from 'react';
import { BlocBuilder } from '@felangel/react-bloc';
import { Box, Text, Heading, Layer, Button } from 'grommet';
import { RecipeDeleteEvent, RecipesBloc, RecipesEvent, RecipesFetchEvent, RecipesState } from '../blocs/RecipesBloc';
import { Recipe } from '../client';
import RecipesContext from '../RecipesContext';
import { RecipeListItem } from './RecipeListItem';
import { RecipeDeleteDialog } from './RecipeDeleteDialog';

export const RecipesList: React.FC = () => {
  const recipesBloc: RecipesBloc = useContext(RecipesContext);
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | undefined>();

  useEffect(() => {
    recipesBloc.add(new RecipesFetchEvent());
  }, []);

  const hideDelete = () => setRecipeToDelete(undefined);
  const showDelete = (recipe: Recipe) => setRecipeToDelete(recipe);

  const showEdit = (recipe: Recipe) => { };

  const deleteRecipe = () => {
    if (recipeToDelete !== undefined) {
      recipesBloc.add(new RecipeDeleteEvent(recipeToDelete));
    }
    hideDelete();
  };

  const recipeBuilder = (state: RecipesState) => {
    return (
      <>
        {state.recipes?.map(recipe => (
          <RecipeListItem key={recipe.id} recipe={recipe} onEdit={showEdit} onDelete={showDelete} />
        ))}
      </>
    )
  };

  return (
    <>
      <BlocBuilder bloc={recipesBloc} builder={recipeBuilder} />
      {recipeToDelete && (
        <RecipeDeleteDialog recipe={recipeToDelete} onHide={hideDelete} onConfirm={deleteRecipe} />
      )}
    </>
  );
}