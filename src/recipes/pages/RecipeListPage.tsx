import { Button, Card, CardBody, CardHeader, Text } from 'grommet';
import { LinkPrevious } from 'grommet-icons'
import React from 'react';
import { useHistory } from 'react-router';
import { RecipesList } from '../components/RecipesList';

export const RecipeListPage: React.FC = () => {
  let history = useHistory();

  return (
    <>
      <Card gap="none" elevation="xlarge" background="light-1" width="medium">
        <CardHeader pad="medium" justify="start" background="brand">
          <Button plain icon={<LinkPrevious/>} onClick={()=>{history.goBack()}}/>
          <Text weight="bold" size="large" >Recipe List</Text>
        </CardHeader>
        <CardBody>
          <RecipesList/>
        </CardBody>
      </Card>
    </>
  )
}