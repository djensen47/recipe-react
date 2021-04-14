import { BlocBuilder } from '@felangel/react-bloc';
import React, { useContext, useEffect } from 'react';
import { RecipesBloc, RecipesEvent, RecipesState } from '../blocs/RecipesBloc';
import RecipesContext from '../RecipesContext';
import { RecipeListItem } from './RecipeListItem';

export const RecipesList: React.FC = () => {
  let recipesBloc: RecipesBloc = useContext(RecipesContext);

  useEffect(() => {
    recipesBloc.add(RecipesEvent.fetch);
  });

  return (
    <BlocBuilder
      bloc={recipesBloc}
      builder={ (state: RecipesState) => {
        return (
          <>
            {state.recipes?.map(recipe => (
              <RecipeListItem key={recipe.id} recipe={recipe}/>
            ))}
          </>
        )} 
      }
    />
  );
}