import { Ingredient } from "./Ingredient";

export class Recipe {
    public name: string;
    public ingredients: Ingredient[];
    public description: string;
    public imagePath: string;

    constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[] = null) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}