import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

let routes: Routes = [
    { path: "shopping-list", component: ShoppingListComponent },
]

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ],
})
export class ShoppingListModule {

}