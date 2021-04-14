import React, { MouseEvent, MouseEventHandler, useState } from 'react';
import { Box, Button, Layer, Text, ThemeContext } from 'grommet';
import { Edit, Trash } from 'grommet-icons';
import styled from 'styled-components';
import { Recipe } from '../client';

export const RecipeListItem: React.FC<{
  recipe: Recipe,
  onEdit: (recipe: Recipe) => void
  onDelete: (recipe: Recipe) => void
}> = ({ recipe, onEdit, onDelete }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  const handleMouseOver = () => setShowButtons(true);
  const handleMouseOut = () => setShowButtons(false);
  const handleClick = () => setShowIngredients(!showIngredients);

  const handleClickDelete = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    onDelete(recipe);
  };

  const handleClickEdit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation;
    onEdit(recipe);
  }
  // probably don't need this but nice to know it's easy to change Grommet's
  // default styles without issue
  const TextNoBreak = styled(Text)`
    white-space: no-break;
  `;

  const TextItalic = styled(Text)`
    font-style: italic;
  `;

  return (
    <ThemeContext.Extend value={{global:{colors: {focus: "none"}}}}>
      <Box
        pad="medium"
        border={{ side: "bottom", color: "light-3" }}
        hoverIndicator={true}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        onClick={handleClick}
      >
        <Box direction="row" justify="between">
          <Box direction="column">
            <Text size="large" weight="bold" truncate>{recipe.name}</Text>
            <Text size="medium">{recipe.description}</Text>
          </Box>
          {showButtons && (
            <Box direction="row" align="start" gap="small">
              <Button plain icon={<Edit color="dark-6" />} onClick={handleClickEdit} />
              <Button plain icon={<Trash color="dark-6" />} onClick={handleClickDelete} />
            </Box>
          )}
        </Box>
        {showIngredients && (
          <Box direction="row" gap="small" wrap={true} margin={{top:"small"}}>
            {recipe.ingredients?.map(ingredient => (
              <Box key={ingredient.name} pad={{vertical: "xxsmall", horizontal: "small"}} margin={{vertical: "xxsmall"}} flex="shrink" background="light-6" round="small">
                <TextNoBreak size="xsmall" wordBreak="normal" truncate={false} >
                  {ingredient.name}
                </TextNoBreak>
              </Box>
            ))}
           {(!recipe.ingredients || recipe.ingredients.length === 0) && (
             <TextItalic size="small">No Ingredients</TextItalic>
           )} 
          </Box>)}
      </Box>
    </ThemeContext.Extend>
  );
}