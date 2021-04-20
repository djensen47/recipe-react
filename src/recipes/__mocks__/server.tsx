import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";

export const recipeData = [{
  "id": 1,
  "name": "BLTA Sandwich",
  "description": "A take on the classic",
  "ingredients": [
    { "name": "bacon" },
    { "name": "lettuce" },
    { "name": "tomato" },
    { "name": "avocado" }
  ]
}, {
  "id": 2,
  "name": "Spicy Basil Chicken",
  "description": "A classic Thai dish",
  "ingredients": [{ "name": "ground chicken" },
  { "name": "Thai basil" },
  { "name": "shallot" },
  { "name": "Thai chilis" },
  { "name": "dark soy sauce" },
  { "name": "fish sauce" }
  ]
}, {
  "id": 3,
  "name": "Cajun-style Meatloaf",
  "description": "A take on the classic dish",
  "ingredients": [
    { "name": "ground beef" },
    { "name": "celery" },
    { "name": "green bell pepper" },
    { "name": "onion" },
    { "name": "bread crumbs" },
    { "name": "Crystal hot sauce" },
    { "name": "katsup" }
  ]
}];

export const setupTestServer = () => setupServer(
  rest.get('/recipes', (_, res, ctx) => {
    return res(ctx.json(recipeData));
  })
);