import { Bloc } from "@felangel/bloc";
import { Recipe, RecipesApi } from "../client";

export enum RecipeStatus {
  INITIAL = "initial",
  PENDING = "pending",
  CREATED = "created",
  UPDATED = "updated",
  DELETED = "deleted",
  FAILURE = "failure"
}

export interface RecipeEvent { };

export class RecipeCreateEvent implements RecipeEvent {
  constructor(public recipe: Recipe) {}
}

export class RecipeDeleteEvent implements RecipeEvent {
  constructor(public recipe: Recipe) {}
}

export class RecipeState {
  constructor(
    public status: RecipeStatus,
    public recipe?: Recipe,
    public error?: string) {};

    public copyWith(modifyObject: { [P in keyof this]?: this[P] }): this {
      return Object.assign(Object.create(this.constructor.prototype), { ...this, ...modifyObject });
   } 
}

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
        // yield await this._mapRecipesEventFetchToState();
        break;
    }
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