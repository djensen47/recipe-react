import { Box, Button, Card, CardBody, CardFooter, CardHeader, Layer, Text } from 'grommet';
import { Close } from 'grommet-icons';
import React from 'react';
import { Recipe } from '../client';

export const RecipeDialog: React.FC<{
  recipe?: Recipe,
  onHide: () => void,
  onConfirm: () => void
}> = ({ recipe, onHide, onConfirm }) => {
  const verb = recipe ? "Edit" : "Create";
  return (
    <Layer background="none" onClickOutside={onHide} onEsc={onHide} position="top" margin={{ top: "200px" }}>
      <Card background="light-1">
        <CardHeader pad="medium" background="light-4" justify="start">
          <Text weight="bold" size="medium" >
            {verb} Recipe
          </Text>
          <Box flex="grow" align="end">
            <Button plain icon={(<Close/>)} onClick={onHide}/>
          </Box>
        </CardHeader>
        <CardBody pad="medium" gap="small">

        </CardBody>
        <CardFooter direction="row" pad="medium" gap="small" justify="end" align="center">
          <Button label="Cancel" onClick={onHide} />
          <Button primary color="brand" label={`${verb}`} onClick={onConfirm} />
        </CardFooter>
      </Card>
    </Layer>
  );
}