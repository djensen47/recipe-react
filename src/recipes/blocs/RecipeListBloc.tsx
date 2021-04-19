import { Bloc } from "@felangel/bloc";
import { Recipe, RecipesApi } from "../client";
import { RecipeListEvent, RecipeListFetchEvent } from "./RecipeListEvent";
import { RecipeListState } from "./RecipeListState";
import { RecipeListStatus } from "./RecipeListStatus";


export interface RecipesState {
  //TODO: this should be it's own interface and not re-using the generated interface
  recipes?: Recipe[];
}

export class RecipeListBloc extends Bloc<RecipeListEvent, RecipesState> {
  api: RecipesApi;

  constructor(api: RecipesApi) {
    super(new RecipeListState(RecipeListStatus.INITIAL));
    this.api = api;
  }

  async *mapEventToState(event: RecipeListEvent): AsyncIterableIterator<RecipesState> {
    switch(event.constructor) {
      case RecipeListFetchEvent:
        yield await this._mapRecipesEventFetchToState();
        break;
    }
  }

  async _mapRecipesEventFetchToState(): Promise<RecipesState> {
    let response = await this.api.recipesList();
    if (response.status >= 400) {
      return new RecipeListState(RecipeListStatus.FAILURE, undefined)
    }
    //TODO: handle errors
    return new RecipeListState(RecipeListStatus.SUCCESS, response.data);
  }

}

