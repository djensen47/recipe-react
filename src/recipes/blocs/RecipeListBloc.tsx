import { Bloc } from "@felangel/bloc";
import { RecipesApi } from "../client";
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
    switch (event.constructor) {
      case RecipeListFetchEvent:
        yield await this._mapRecipesEventFetchToState();
        break;
    }
  }

  async _mapRecipesEventFetchToState(): Promise<RecipeListState> {
    try {
      let response = await this.api.recipesList();
      return new RecipeListState(RecipeListStatus.SUCCESS, response.data);
    } catch (err) {
      return new RecipeListState(RecipeListStatus.FAILURE, undefined)
    }
  }

}

