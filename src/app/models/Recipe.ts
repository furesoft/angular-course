import { Ingredient } from "./Ingredient";
import { User } from "./User";

export class Recipe {
    public id: string;
    public name: string;
    public ingredients: Ingredient[];
    public description: string;
    public imagePath: string;
    public createdBy: string;

    constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[] = null) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}