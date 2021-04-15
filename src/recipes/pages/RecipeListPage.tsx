import { Box, Button, Card, CardBody, CardHeader, Text } from 'grommet';
import { Add, LinkPrevious } from 'grommet-icons'
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Recipe } from '../client';
import { RecipeDialog } from '../components/RecipeDialog';
import { RecipesList } from '../components/RecipesList';

export const RecipeListPage: React.FC = () => {
  let history = useHistory();
  const [showDialog, setShowDialog] = useState(false);

  const handleHide = () => setShowDialog(false);
  const handleShow = () => setShowDialog(true);
  const handleConfirm = (recipe: Recipe) => {
    handleHide();
  };

  return (
    <>
      <Card gap="none" elevation="xlarge" background="light-1" width="medium">
        <CardHeader pad="medium" justify="start" background="brand">
          <Button plain icon={<LinkPrevious/>} onClick={()=>{history.goBack()}}/>
          <Text weight="bold" size="large" >Recipe List</Text>
          <Box flex="grow" align="end">
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