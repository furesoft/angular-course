import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { ApproutingModule as AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { RecipeModule as RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RecipesModule,
    ShoppingListModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([])
  ],
  exports: [

  ],
  providers: [AuthService, RecipeService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
