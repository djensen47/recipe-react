import React, { MouseEvent, useState } from 'react';
import { Box, Button, Text, ThemeContext } from 'grommet';
import { Edit, Trash } from 'grommet-icons';
import { Recipe } from '../client';
import { TextItalic, TextNoBreak } from '../../common/components/styled';


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
    evt.stopPropagation();
    onEdit(recipe);
  }

  return (
    <ThemeContext.Extend value={{global:{focus: {border: {color: "none"}}}}}>
      <Box 
        role="listitem"
        pad="medium"
        border={{ side: "bottom", color: "light-3" }}
        hoverIndicator={true}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        onClick={handleClick}
        focusIndicator={true}
        a11yTitle={`Recipe: ${recipe.name}`}
      >
        <Box direction="row" justify="between">
          <Box direction="column">
            <Text size="large" weight="bold" truncate>{recipe.name}</Text>
            <Text size="medium">{recipe.description}</Text>
          </Box>
          {showButtons && (
            <Box direction="row" align="start" gap="small">
              <Button plain icon={<Edit color="dark-6" />} onClick={handleClickEdit} a11yTitle="edit"/>
              <Button plain icon={<Trash color="dark-6" />} onClick={handleClickDelete} a11yTitle="delete"/>
            </Box>
          )}
        </Box>
        {showIngredients && (
          <Box direction="row" gap="small" wrap={true} margin={{top:"small"}}>
            {recipe.ingredients?.map(ingredient => (
              <Box key={ingredient.name} pad={{vertical: "xxsmall", horizontal: "small"}} margin={{vertical: "xxsmall"}} flex="shrink" background="light-6" round="small" role="listitem">
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