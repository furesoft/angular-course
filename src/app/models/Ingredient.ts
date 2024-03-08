export class Ingredient {
    public id: string;
    public createdBy: string;
    
    constructor(public name: string, public amount: number, public metric: string) {
    }
}