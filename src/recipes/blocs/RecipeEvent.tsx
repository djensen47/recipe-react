import { Recipe } from "../client";

export interface RecipeEvent { }

export class RecipeCreateEvent implements RecipeEvent {
  constructor(public recipe: Recipe) {}
}

export class RecipeUpdateEvent implements RecipeEvent {
  constructor(public recipe: Recipe) {}
}

export class RecipeDeleteEvent implements RecipeEvent {
  constructor(public recipe: Recipe) {}
}
