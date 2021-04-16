import { Bloc } from "@felangel/bloc";
import { Recipe, RecipesApi } from "../client";

// export enum RecipesEvent {
  // fetch = 'FETCH'
// }

export interface RecipesEvent {};

export class RecipesFetchEvent implements RecipesEvent {};

export class RecipeDeleteEvent implements RecipesEvent {
  constructor(public recipe: Recipe) {}
}

export interface RecipesState {
  //TODO: this should be it's own interface and not re-using the generated interface
  recipes?: Recipe[];
}

export class RecipesBloc extends Bloc<RecipesEvent, RecipesState> {
  api: RecipesApi;

  constructor(api: RecipesApi) {
    super({});
    this.api = api;
  }

  async *mapEventToState(event: RecipesEvent): AsyncIterableIterator<RecipesState> {
    switch(event.constructor) {
      case RecipesFetchEvent:
        yield await this._mapRecipesEventFetchToState();
        break;
      case RecipeDeleteEvent:
        yield await this._mapRecipeDeleteEventToState((event as RecipeDeleteEvent).recipe);
        yield await this._mapRecipesEventFetchToState();
        break;
    }
  }

  async _mapRecipeDeleteEventToState(recipe: Recipe): Promise<RecipesState> {
    let response = await this.api.recipesDestroy(recipe.id);
    return this.state;
  }

  async _mapRecipesEventFetchToState(): Promise<RecipesState> {
    let response = await this.api.recipesList();
    //TODO: handle errors
    return {recipes: response.data};    
  }

}

