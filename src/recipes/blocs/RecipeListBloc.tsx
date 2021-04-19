import { Bloc } from "@felangel/bloc";
import { Recipe, RecipesApi } from "../client";
import { RecipeListEvent, RecipeListFetchEvent } from "./RecipeListEvent";
import { RecipeListState } from "./RecipeListState";
import { RecipeListStatus } from "./RecipeListStatus";


export class RecipeListBloc extends Bloc<RecipeListEvent, RecipeListState> {
  api: RecipesApi;

  constructor(api: RecipesApi) {
    super(new RecipeListState(RecipeListStatus.INITIAL));
    this.api = api;
  }

  async *mapEventToState(event: RecipeListEvent): AsyncIterableIterator<RecipeListState> {
    switch(event.constructor) {
      case RecipeListFetchEvent:
        yield await this._mapRecipesEventFetchToState();
        break;
    }
  }

  async _mapRecipesEventFetchToState(): Promise<RecipeListState> {
    let response = await this.api.recipesList();
    if (!response || response.status >= 400) {
      return new RecipeListState(RecipeListStatus.FAILURE, undefined)
    }
    //TODO: handle errors
    return new RecipeListState(RecipeListStatus.SUCCESS, response.data);
  }

}

