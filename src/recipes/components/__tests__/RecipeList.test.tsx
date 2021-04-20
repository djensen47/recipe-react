import React from "react";
import { render, screen } from "@testing-library/react";
import { recipeTestData, setupTestServer } from "../../__mocks__/server";
import { RecipesList } from "../RecipesList";
import { RecipeListContextProvider } from "../../context/RecipeListContext";
import { RecipeContextProvider } from "../../context/RecipeContext";
import { grommet, Grommet } from "grommet";


describe("RecipeList (integration test)", () => {
  const testServer = setupTestServer();

  beforeAll(() => testServer.listen());
  afterEach(() => testServer.resetHandlers());
  afterAll(() => testServer.close());

  it("should render RecipeList component", async () => {
    render(
      <Grommet theme={grommet} themeMode="light" full>
        <RecipeListContextProvider>
          <RecipeContextProvider>
            <RecipesList />
          </RecipeContextProvider>
        </RecipeListContextProvider>
      </Grommet>
    );

    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(3);
    for (const recipe of recipeTestData) {
      let elem = await screen.findByText(recipe.name);
      expect(elem).toBeInTheDocument();
    }
  });
});