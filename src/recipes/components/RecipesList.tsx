import React, { useContext, useEffect, useState } from 'react';
import { BlocBuilder } from '@felangel/react-bloc';
import { Box, Text, Heading, Layer, Button } from 'grommet';
import { RecipeDeleteEvent, RecipesBloc, RecipesEvent, RecipesFetchEvent, RecipesState } from '../blocs/RecipesBloc';
import { Recipe } from '../client';
import RecipesContext from '../RecipesContext';
import { RecipeListItem } from './RecipeListItem';

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
        <Layer onClickOutside={hideDelete} onEsc={hideDelete} position="top" margin={{top:"200px"}}>
          <Box pad="medium" gap="small">
            <Heading level={3} margin="none">Confirm</Heading>
            <Text>Are you sure you want to delete <b>{recipeToDelete.name}</b>?</Text>
          </Box>
          <Box direction="row" pad="medium" gap="small" justify="end" align="center">
            <Button label="Cancel" onClick={hideDelete}/>
            <Button primary color="status-critical" label="Delete Recipe" onClick={deleteRecipe}/>
          </Box>
        </Layer>
      )}
    </>
  );
}