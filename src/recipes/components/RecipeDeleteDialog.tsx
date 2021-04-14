import { Box, Button, Heading, Layer, Text } from 'grommet';
import React from 'react';
import { Recipe } from '../client';

export const RecipeDeleteDialog: React.FC<{
  recipe: Recipe,
  onHide: () => void,
  onConfirm: () => void
}> = ({ recipe, onHide, onConfirm }) => (

  <Layer onClickOutside={onHide} onEsc={onHide} position="top" margin={{ top: "200px" }}>
    <Box pad="medium" gap="small">
      <Heading level={3} margin="none">Confirm</Heading>
      <Text>Are you sure you want to delete <b>{recipe.name}</b>?</Text>
    </Box>
    <Box direction="row" pad="medium" gap="small" justify="end" align="center">
      <Button label="Cancel" onClick={onHide} />
      <Button primary color="status-critical" label="Delete Recipe" onClick={onConfirm} />
    </Box>
  </Layer>
)