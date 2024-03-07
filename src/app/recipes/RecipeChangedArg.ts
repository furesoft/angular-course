import { Recipe } from "../models/Recipe";
import { ChangeMode } from "./changeMode";


export class RecipeChangedArg {
    constructor(public recipe: Recipe | string, public mode: ChangeMode) {
    }
}
