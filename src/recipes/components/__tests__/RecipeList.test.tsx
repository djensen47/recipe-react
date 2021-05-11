import React from "react";
import { cleanup, findAllByRole, findByLabelText, findByRole, findByText, fireEvent, getByLabelText, getByRole, render, screen, waitFor } from "@testing-library/react";
import { recipeTestData, setupTestServer } from "../../__mocks__/server";
import { RecipesList } from "../RecipesList";
import { RecipeListContextProvider } from "../../context/RecipeListContext";
import { RecipeContextProvider } from "../../context/RecipeContext";
import { grommet, Grommet } from "grommet";

const recipeList = (
  <Grommet theme={grommet} themeMode="light" full>
    <RecipeListContextProvider>
      <RecipeContextProvider>
        <RecipesList />
      </RecipeContextProvider>
    </RecipeListContextProvider>
  </Grommet>
);

describe("RecipeDialog (integration test)", () => {
  const testServer = setupTestServer();

  beforeAll(() => testServer.listen());
  afterEach(() => { testServer.resetHandlers() });
  afterAll(() => testServer.close());

  test("should show error in recipe name field", async () => {
    render(recipeList);

    const items = await screen.findAllByRole("listitem", {name: /Recipe:/i});

    fireEvent.mouseEnter(items[0]);
    fireEvent.click(await findByRole(items[0], "button", { name: "edit" }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    expect(await findByText(dialog, "Edit Recipe")).toBeInTheDocument();
    const nameField = await findByLabelText(dialog, "Name");
    fireEvent.change(nameField, {target: {value: ''}});
    fireEvent.focusOut(nameField);
    expect(await findByText(dialog, "Required field")).toBeInTheDocument();
  });
});

describe("RecipeList (integration test)", () => {
  const testServer = setupTestServer();

  beforeAll(() => testServer.listen());
  afterEach(() => testServer.resetHandlers());
  afterAll(() => testServer.close());

  test("should render RecipeList component", async () => {
    render(recipeList);

    const items = await screen.findAllByRole("listitem", {name: /Recipe:/i});
    expect(items).toHaveLength(recipeTestData.length);
    for (const recipe of recipeTestData) {
      let elem = await screen.findByText(recipe.name);
      expect(elem).toBeInTheDocument();
    }
  });

  test("should show ingredients on click", async () => {
    render(recipeList);

    const items = await screen.findAllByRole("listitem", {name: /Recipe:/i});
    expect(items).toHaveLength(recipeTestData.length);

    fireEvent.mouseEnter(items[0]);
    fireEvent.click(items[0]);

    const ingredients = await findAllByRole(items[0], "listitem");
    expect(ingredients).toHaveLength(recipeTestData[0].ingredients.length);
    for (const ingredient of recipeTestData[0].ingredients) {
      expect(await findByText(items[0], ingredient.name)).toBeInTheDocument();
    }
  });

  test("should open delete dialog", async () => {
    render(recipeList);

    const items = await screen.findAllByRole("listitem", {name: /Recipe:/i});
    expect(items).toHaveLength(recipeTestData.length);

    fireEvent.mouseEnter(items[0]);
    fireEvent.click(await findByRole(items[0], "button", { name: "delete" }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const text = await findByText(dialog, recipeTestData[0].name);
    expect(text).toBeInTheDocument();
  });

  test("should open edit dialog", async () => {
    render(recipeList);

    const items = await screen.findAllByRole("listitem", {name: `Recipe: ${recipeTestData[0].name}`});

    fireEvent.mouseEnter(items[0]);
    const button = await findByRole(items[0], "button", { name: "edit" });
    fireEvent.click(button);

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    expect(await findByText(dialog, "Edit Recipe")).toBeInTheDocument();
  });

});