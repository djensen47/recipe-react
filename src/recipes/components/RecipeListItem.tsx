import React, { MouseEvent, MouseEventHandler, useState } from 'react';
import { Box, Button, Text } from 'grommet';
import { Edit, Trash } from 'grommet-icons';
import { Recipe } from '../client';

export const RecipeListItem: React.FC<{recipe: Recipe}> = ({recipe}) => {

  const [isVisible, setIsVisible] = useState(false);

  const handleMouseOver = () => setIsVisible(true);
  const handleMouseOut = () => setIsVisible(false);

  return (
    <Box pad="medium" border={{side: "bottom", color: "light-3"}} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
      <Box direction="row" justify="between">
        <Box direction="column">
            <Text size="large" weight="bold" truncate>{recipe.name}</Text>
            <Text size="medium">{recipe.description}</Text>
        </Box>
        { isVisible ? (
          <Box direction="row" align="start" gap="small">
            <Button plain icon={<Edit color="dark-6"/>} hidden={true}/>
            <Button plain icon={<Trash color="dark-6"/>}/>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}