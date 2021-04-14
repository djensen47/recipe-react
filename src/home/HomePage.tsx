import React from 'react';
import { Card, CardBody, CardHeader, Text, Markdown, Paragraph, CardFooter, Button, Box } from 'grommet'
import { useHistory } from 'react-router-dom';
import { Cafeteria, Restaurant } from 'grommet-icons';

export const HomePage: React.FC = () => {
  let history = useHistory();
  return (
    <>
      <Card gap="small" elevation="xlarge" background="light-1" width="medium">
        <CardHeader pad="medium" justify="center" background="brand">
          <Text weight="bold" size="large" >Recipes</Text>
        </CardHeader>
        <CardBody pad="medium">
          <Box justify="center" gap="medium" align="start" direction="row">
            <Restaurant color="status-ok" size="xlarge"/>
            <Cafeteria color="status-ok" size="xlarge"/>
          </Box>
          <Paragraph>
            Welcome to the recipes demo application built with React.
          </Paragraph>
          <Markdown>{`
 Libraries used for this project:

 * Grommet
 * Bloc`}
          </Markdown>

        </CardBody>
        <CardFooter pad="medium" gap="medium" background="light-1" justify="center">
            <Button primary label="View Recipes" onClick={()=>{history.push("/recipes")}}/>
        </CardFooter>
      </Card>
    </>
  );
}