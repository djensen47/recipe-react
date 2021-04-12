import React from 'react';
import { Card, CardBody, CardHeader, Text, Markdown, Paragraph, CardFooter, Button } from 'grommet'
import { useHistory } from 'react-router-dom';

export const HomePage: React.FC = () => {
  let history = useHistory();
  return (
    <>
      <Card gap="small" elevation="xlarge" background="light-1">
        <CardHeader pad="medium" justify="center" background="brand">
          <Text weight="bold" size="large" >Recipes</Text>
        </CardHeader>
        <CardBody pad="medium">
          <Paragraph>
            Welcome to the Recipes demo application.
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