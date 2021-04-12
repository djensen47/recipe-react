import { Button, Card, CardBody, CardHeader, Text } from 'grommet';
import { LinkPrevious } from 'grommet-icons'
import React from 'react';
import { useHistory } from 'react-router';

export const RecipeListPage: React.FC = () => {
  let history = useHistory();

  return (
    <>
      <Card gap="small" elevation="xlarge" background="light-1" width="medium">
        <CardHeader pad="medium" justify="start" background="brand">
          <Button plain icon={<LinkPrevious/>} onClick={()=>{history.goBack()}}/>
          <Text weight="bold" size="large" >Recipe List</Text>
        </CardHeader>
        <CardBody pad="medium">
        </CardBody>
      </Card>
    </>
  )
}