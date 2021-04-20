import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { RecipeListBloc } from '../RecipeListBloc';
import { RecipesApi } from '../../client/api';
import { RecipeListFetchEvent } from '../RecipeListEvent';
import { Configuration } from '../../client';
import { waitFor } from '@testing-library/dom';
import { RecipeListStatus } from '../RecipeListStatus';
import process from 'process';

describe("RecipeListBloc success", () => {
  const server = setupServer(
    rest.get('/recipes', (_, res, ctx) => {
      return res(ctx.json([{
        "id": 79,
        "name": "BLTA Sandwich",
        "description": "A take on the classic",
        "ingredients": [
          { "name": "bacon" },
          { "name": "lettuce" },
          { "name": "tomato" },
          { "name": "avocado" }
        ]
      }, {
        "id": 83,
        "name": "Spicy Basil Chicken",
        "description": "A classic Thai dish",
        "ingredients": [{ "name": "ground chicken" },
        { "name": "Thai basil" },
        { "name": "shallot" },
        { "name": "Thai chilis" },
        { "name": "dark soy sauce" },
        { "name": "fish sauce" }
        ]
      }]));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('should fetch recipes', async () => {
    const recipesApi = new RecipesApi(new Configuration({ basePath: "http://localhost" }));
    // const MockRecipesApi = jest.fn().mockImplementation(() => {
    //   recipesList: jest.fn(() => {
    //     console.log("FOOOOOOO!")
    //   })
    // }) as jest.Mock<RecipesApi>;
    // const recipesApi = new MockRecipesApi();

    const recipeListBloc = new RecipeListBloc(recipesApi);
    recipeListBloc.add(new RecipeListFetchEvent());

    await waitFor(() => {
      return new Promise(resolve => {
        let subscription = recipeListBloc.listen(state => {
          expect(state.status).toBe(RecipeListStatus.SUCCESS);
          expect(state.recipes).toHaveLength(2);
          subscription.unsubscribe();
          resolve(true);
        });
      })
    }, { timeout: 2000 });
  });
});

describe("RecipeListBloc failure", () => {

  const server = setupServer(
    rest.get('/recipes', (_, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("should return failure status", async () => {

    const recipesApi = new RecipesApi(new Configuration({ basePath: "http://localhost" }));
    const recipeListBloc = new RecipeListBloc(recipesApi);
    recipeListBloc.add(new RecipeListFetchEvent());

    await waitFor(() => {
      return new Promise(resolve => {
        let subscription = recipeListBloc.listen(state => {
          expect(state.status).toBe(RecipeListStatus.FAILURE);
          subscription.unsubscribe();
          resolve(true);
        });
      })
    }, { timeout: 2000 });
  });

});