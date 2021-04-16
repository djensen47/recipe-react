import { Box, Button, Card, CardBody, CardHeader, Text } from 'grommet';
import { Add, LinkPrevious, Refresh } from 'grommet-icons'
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Recipe } from '../client';
import { RecipeDialog } from '../components/RecipeDialog';
import { RecipesList } from '../components/RecipesList';
import { useRecipeListActions } from '../hooks/recipe-list-hooks';

export const RecipeListPage: React.FC = () => {
  let history = useHistory();
  const [showDialog, setShowDialog] = useState(false);
  const {fetchRecipes} = useRecipeListActions();

  const handleHide = () => setShowDialog(false);
  const handleShow = () => setShowDialog(true);
  const handleConfirm = (recipe: Recipe) => {
    handleHide();
  };
  const handleRefresh = () => fetchRecipes();

  return (
    <>
      <Card gap="none" elevation="xlarge" background="light-1" width="medium">
        <CardHeader pad="medium" justify="start" background="brand">
          <Button plain icon={<LinkPrevious/>} onClick={()=>{history.goBack()}}/>
          <Text weight="bold" size="large" >Recipe List</Text>
          <Box direction="row" flex="grow" align="end" justify="end" gap="small">
            <Button plain icon={<Refresh/>} onClick={handleRefresh}/>
            <Button plain icon={<Add/>} onClick={handleShow}/>
          </Box>
        </CardHeader>
        <CardBody>
          <RecipesList/>
        </CardBody>
      </Card>
      { showDialog && (
        <RecipeDialog onHide={handleHide} onConfirm={handleHide} />
      )}
    </>
  )
}