import React from 'react';
import { useParams } from 'react-router';

export const RecipePage: React.FC = () => {
  let { recipeId } = useParams<{recipeId: string}>();

  return (
    <>
      <h1> Recipe #{recipeId}</h1>
    </>
  )
}
