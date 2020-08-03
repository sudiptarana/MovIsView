import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ HomeComponent } from './home/home.component';
import{ AdminComponent }from './admin/admin.component';
import{MovieComponent} from './movie/movie.component';
import{NewsComponent} from './news/news.component';
import{SongsComponent} from './songs/songs.component';
import{ContactComponent} from './contact/contact.component';
const routes: Routes = [
  //for the beginig path
  {path:'',redirectTo:'/home', pathMatch:'full'},
  // for others
  {path:'home',component:HomeComponent},
  {path:'admin',component:AdminComponent},
  {path:'movie', component:MovieComponent},
  {path:'news', component:NewsComponent},
  {path:'songs', component:SongsComponent},
  {path:'contact', component:ContactComponent},
  {path: 'movie/:lang', component:MovieComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
