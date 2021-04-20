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
        // yield new RecipeState(RecipeStatus.PENDING);
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
    try {
      let response = await this.api.recipesUpdate(event.recipe.id, event.recipe);
      return new RecipeState(RecipeStatus.UPDATED, response.data);
    } catch(err) {
      return new RecipeState(RecipeStatus.FAILURE);
    }
  }

  private async mapRecipeCreateEventToState(event: RecipeCreateEvent): Promise<RecipeState> {
    try {
      let response = await this.api.recipesCreate(event.recipe);
      return new RecipeState(RecipeStatus.CREATED, response.data);
    } catch(err) {
      return new RecipeState(RecipeStatus.FAILURE);
    }
  }

  async _mapRecipeDeleteEventToState(recipe: Recipe): Promise<RecipeState> {
    try {
      await this.api.recipesDestroy(recipe.id);
      return new RecipeState(RecipeStatus.DELETED);
    } catch(err) {
      return new RecipeState(RecipeStatus.FAILURE);
    }
  }

}