import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { OwlModule } from "ngx-owl-carousel";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// to make a export class imported , use "import"
import { Testcomponent } from "./test/test.component";
import { Test2Component } from "./test2/test2.component";

import { AppHeaderComponent } from "./app-header/app-header.component";
import { AdminComponent } from "./admin/admin.component";

//fire base
import { environment } from "../environments/environment.prod";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireModule } from "angularfire2";
import { AdminLanguageComponent } from "./admin/admin-language/admin-language.component";
import { AdminMovieComponent } from "./admin/admin-movie/admin-movie.component";
import { AdminNewsComponent } from "./admin/admin-news/admin-news.component";
import { HomeComponent } from "./home/home.component";
import { MovieComponent } from "./movie/movie.component";
import { NewsComponent } from "./news/news.component";
import { SearchComponent } from "./search/search.component";
import { SongsComponent } from "./songs/songs.component";
import { AdminSongsComponent } from "./admin/admin-songs/admin-songs.component";
import { ContactComponent } from "./contact/contact.component";

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,

    //use the imported class by register it.
    Testcomponent,

    Test2Component,

    AdminComponent,

    AdminLanguageComponent,

    AdminMovieComponent,

    AdminNewsComponent,

    HomeComponent,

    MovieComponent,

    NewsComponent,

    SearchComponent,

    SongsComponent,

    AdminSongsComponent,

    ContactComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //fire Base
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,

    //for owl
    OwlModule,
  ],
  providers: [],

  //it's repesent the base component
  bootstrap: [AppComponent],
})
export class AppModule {}
