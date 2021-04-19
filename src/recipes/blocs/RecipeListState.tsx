import { Recipe } from "../client";
import { RecipeListStatus } from "./RecipeListStatus";


export class RecipeListState {
  constructor(
    public status: RecipeListStatus,
    public recipes?: Recipe[],
  ) {};

  public copyWith(modifyObject: {
    [P in keyof this]?: this[P];
  }): this {
    return Object.assign(Object.create(this.constructor.prototype), { ...this, ...modifyObject });
  }
}
