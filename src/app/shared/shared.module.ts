import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { PlaceholderDirective } from "./placeholder.directive";
import { CommonModule } from "@angular/common";
import { DropdownDirective } from "./dropdown.directive";
import { ResolveAuthorPipe } from "./resolveAuthor.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AlertComponent,
        PlaceholderDirective,
        DropdownDirective,
        ResolveAuthorPipe
    ],
    exports: [
        AlertComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule,
        ResolveAuthorPipe,
        FormsModule,
        ReactiveFormsModule
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {

}