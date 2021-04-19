import { Recipe } from "../client";
import { RecipeStatus } from "./RecipeStatus";


export class RecipeState {
  constructor(
    public status: RecipeStatus,
    public recipe?: Recipe,
    public error?: string) { };

  public copyWith(modifyObject: {
    [P in keyof this]?: this[P];
  }): this {
    return Object.assign(Object.create(this.constructor.prototype), { ...this, ...modifyObject });
  }
}
