import { Box, Button, Card, CardBody, CardFooter, CardHeader, Form, FormField, Layer, List, Text, TextArea, TextInput } from 'grommet';
import { Close, Trash } from 'grommet-icons';
import React, { useState } from 'react';
import { Recipe } from '../client';

export const RecipeDialog: React.FC<{
  recipe?: Recipe,
  onHide: () => void,
  onConfirm: (recipe: Recipe) => void
}> = ({ recipe, onHide, onConfirm }) => {
  // const recipesBloc: RecipeBloc = useContext(RecipeContext);
  const [name, setName] = useState(recipe?.name ?? '')
  const [ingredientName, setIngredientName] = useState('');
  const [description, setDescription] = useState(recipe?.description ?? '')
  const [ingredients, setIngredients] = useState(recipe?.ingredients ?? [])

  const required = (value: String) => {
    if (!value || value.trim() === '') {
      return "Required field";
    }
    return undefined;
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addIngredient = () => {
    setIngredients(ingredients.concat([{ name: ingredientName }]));
    setIngredientName("");
  };

  const handleSubmit = () => {
    const r = {
      id: recipe?.id ?? -1, //this is why I shouldn't have re-used the generated code
      name: name,
      description: description,
      ingredients: ingredients
    };
    onConfirm(r);
  };

  const verb = recipe ? "Edit" : "Create";
  return (
    <Layer role="dialog" background="none" onClickOutside={onHide} onEsc={onHide} position="top" margin={{ top: "75px" }}>
      <Form validate="blur" onSubmit={handleSubmit}>
        <Card background="light-1">
          <CardHeader pad="medium" background="light-4" justify="start">
            <Text weight="bold" size="medium" >
              {verb} Recipe
          </Text>
            <Box flex="grow" align="end">
              <Button plain icon={(<Close />)} onClick={onHide} />
            </Box>
          </CardHeader>
          <CardBody pad="medium" gap="small">
            <FormField
              label="Name"
              htmlFor="name"
              name="name" width="medium" validate={[required]}>
              <TextInput id="name" name="name" value={name} onChange={evt => setName(evt.target.value)} />
            </FormField>
            <FormField label="Description" htmlFor="input" width="medium">
              <TextArea name="description" value={description} onChange={evt => setDescription(evt.target.value)} />
            </FormField>

            <Box margin={{ start: "xsmall" }}>
              <Text>Ingredients</Text>
            </Box>
            {ingredients?.length > 0 && (
              <Box border="all" round="small" margin={{ bottom: "medium" }}>
                <List
                  itemProps={{
                    0: { border: "bottom" },
                    [ingredients.length - 1]: { border: false }
                  }}
                  action={(_, index) => <Button key={index} plain onClick={() => removeIngredient(index)} icon={<Trash color="dark-6" />} />}
                  data={ingredients}
                  primaryKey={item => item.name}
                />
              </Box>
            )}
            <Box direction="row" gap="xsmall">
              <Box flex="grow">
                <FormField margin="none">
                  <TextInput
                    placeholder="Add Ingredient"
                    name="ingredientName" value={ingredientName}
                    onChange={evt => setIngredientName(evt.target.value)} />
                </FormField>
              </Box>
              <Button label="Add" onClick={addIngredient} disabled={!ingredientName} />
            </Box>
          </CardBody>
          <CardFooter direction="row" pad="medium" gap="small" justify="end" align="center">
            <Button label="Cancel" onClick={onHide} />
            <Button primary type="submit" color="brand" label={`${verb}`} />
          </CardFooter>
        </Card>
      </Form>
    </Layer>
  );
}