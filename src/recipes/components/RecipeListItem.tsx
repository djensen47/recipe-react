import React, { MouseEvent, MouseEventHandler, useState } from 'react';
import { Box, Button, Layer, Text } from 'grommet';
import { Edit, Trash } from 'grommet-icons';
import { Recipe } from '../client';

export const RecipeListItem: React.FC<{
  recipe: Recipe,
  onEdit: (recipe: Recipe) => void
  onDelete: (recipe: Recipe) => void
}> = ({ recipe, onEdit, onDelete }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseOver = () => setIsVisible(true);
  const handleMouseOut = () => setIsVisible(false);

  return (
    <>
      <Box
        pad="medium"
        border={{ side: "bottom", color: "light-3" }}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
      >
        <Box direction="row" justify="between">
          <Box direction="column">
            <Text size="large" weight="bold" truncate>{recipe.name}</Text>
            <Text size="medium">{recipe.description}</Text>
          </Box>
          {isVisible && (
            <Box direction="row" align="start" gap="small">
              <Button plain icon={<Edit color="dark-6" />} onClick={() => onEdit(recipe)} />
              <Button plain icon={<Trash color="dark-6" />} onClick={() => onDelete(recipe)}/>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}