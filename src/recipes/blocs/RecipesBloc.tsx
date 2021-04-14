import { Bloc } from "@felangel/bloc";
import { Recipe, RecipesApi } from "../client";

export enum RecipesEvent {
  fetch = 'FETCH'
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
    switch(event) {
      case RecipesEvent.fetch:
        yield await this._mapRecipesEventFetchToState();
        break;
    }
  }

  async _mapRecipesEventFetchToState(): Promise<RecipesState> {
    let response = await this.api.recipesList();
    //TODO: handle errors
    return {recipes: response.data};    
  }

}

