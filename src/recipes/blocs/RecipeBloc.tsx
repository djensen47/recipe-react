import { Bloc } from "@felangel/bloc";
import { Recipe, RecipesApi } from "../client";
import { RecipeCreateEvent, RecipeDeleteEvent, RecipeEvent, RecipeUpdateEvent } from "./RecipeEvent";
import { RecipeState } from "./RecipeState";
import { RecipeStatus } from "./RecipeStatus";


export class RecipeBloc extends Bloc<RecipeEvent, RecipeState> {
  constructor(public api: RecipesApi) {
    super(new RecipeState(RecipeStatus.INITIAL));
  }

  async *mapEventToState(event: RecipeEvent): AsyncIterableIterator<RecipeState> {
    switch(event.constructor) {
      case RecipeCreateEvent:
        yield new RecipeState(RecipeStatus.PENDING);
        yield await this.mapRecipeCreateEventToState(event as RecipeCreateEvent);
        break;
      case RecipeDeleteEvent:
        yield await this._mapRecipeDeleteEventToState((event as RecipeDeleteEvent).recipe);
        break;
      case RecipeUpdateEvent:
        yield await this.mapRecipeUpdateEventToState(event as RecipeUpdateEvent);
    }
  }

  private async mapRecipeUpdateEventToState(event: RecipeUpdateEvent): Promise<RecipeState> {
    let response = await this.api.recipesUpdate(event.recipe.id, event.recipe);
    if (response.status >= 400) {
      return new RecipeState(RecipeStatus.FAILURE, undefined, response.statusText);
    }
    return new RecipeState(RecipeStatus.UPDATED, response.data);
  }

  private async mapRecipeCreateEventToState(event: RecipeCreateEvent): Promise<RecipeState> {
    let response = await this.api.recipesCreate(event.recipe);
    if (response.status >= 400) {
      return new RecipeState(RecipeStatus.FAILURE, undefined, response.statusText);
    }
    return new RecipeState(RecipeStatus.CREATED, response.data);
  }

  async _mapRecipeDeleteEventToState(recipe: Recipe): Promise<RecipeState> {
    let response = await this.api.recipesDestroy(recipe.id);
    return new RecipeState(RecipeStatus.DELETED);
  }

}