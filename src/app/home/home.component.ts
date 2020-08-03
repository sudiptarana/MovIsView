import { Component, OnInit } from '@angular/core';
import{AngularFireDatabase} from 'angularfire2/database';
import{Movie}from '../models/movi';
import {songs} from '../models/songs';
import{DomSanitizer}from '@angular/platform-browser';
import{ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private db:AngularFireDatabase , private sanitizer:DomSanitizer , private activatedRoute:ActivatedRoute) { }
  
  
//hindi
  movieList: Array<Movie>;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params)=>{
      let lang ='Hindi';
      this.getMovies(lang);

      this.activatedRoute.params.subscribe((params)=>{
        let beng ='Bengali';
        this.getBeng(beng);
      });
    });

    this.activatedRoute.params.subscribe((params)=>{
      let beng ='Bengali-Songs';
      this.getBengsong(beng);

    });
  }

  getMovies(lang: string){
    this.db.list('/movie').valueChanges().subscribe((moviedata)=>{
      this.movieList=[];
      for(let i=0;i< moviedata.length;i++){
        let movieObj = new Movie();
    movieObj.langName= (<any>moviedata[i]).langName;
    movieObj.movieName= (<any>moviedata[i]).movieName;
    movieObj.directorName= (<any>moviedata[i]).directorName;

    //using sanitizer
    movieObj.youtube=<string>this.sanitizer.bypassSecurityTrustResourceUrl((<any>moviedata[i]).youtube);
    movieObj.rating= (<any>moviedata[i]).rating;
    movieObj.movieReview=(<any>moviedata[i]).movieReview;

    if (movieObj.langName == lang) {
      this.movieList.push(movieObj);
      }
    }
    })
  }

//bengali
bengList: Array<Movie>;

getBeng(lang: string){
    this.db.list('/movie').valueChanges().subscribe((moviedata)=>{
      this.bengList=[];
      for(let i=0;i< moviedata.length;i++){
        let movieObj = new Movie();
    movieObj.langName= (<any>moviedata[i]).langName;
    movieObj.movieName= (<any>moviedata[i]).movieName;
    movieObj.directorName= (<any>moviedata[i]).directorName;

    //using sanitizer
    movieObj.youtube=<string>this.sanitizer.bypassSecurityTrustResourceUrl((<any>moviedata[i]).youtube);
    movieObj.rating= (<any>moviedata[i]).rating;
    movieObj.movieReview=(<any>moviedata[i]).movieReview;

    if (movieObj.langName == lang) {
      this.bengList.push(movieObj);
      }
    }
    })
  }

  //bengali songs
bsongs: Array<songs>;

getBengsong(lang: string){
  this.db.list('/songs').valueChanges().subscribe((moviedata)=>{
    this.bsongs=[];
    for(let i=0;i< moviedata.length;i++){
      let movieObj = new songs();
  movieObj.songsTitel= (<any>moviedata[i]).songsTitel;
  movieObj.catagory= (<any>moviedata[i]).catagory;
  movieObj.songsLink=<string>this.sanitizer.bypassSecurityTrustResourceUrl((<any>moviedata[i]).songsLink)

  if (movieObj.catagory == lang) {
    this.bsongs.push(movieObj);
    }
  }
  })
}

}
