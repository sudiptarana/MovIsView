import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Movie } from '../models/movi';
import { DomSanitizer } from '@angular/platform-browser';

//to get the activateed route
import { ActivatedRoute } from '@angular/router';

import { from } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) { }

  movieList: Array<Movie>;
  rawMovieList:Array<Movie>;

  ngOnInit() {
    //to activated route , get in run time
    this.activatedRoute.params.subscribe((params) => {
      let lang = params["lang"];
      this.getMovies(lang);
    });

  }

  getMovies(lang: string) {
    this.db.list('/movie').valueChanges().subscribe((moviedata) => {
      this.movieList = [];
      this.rawMovieList=[];
      for (let i = 0; i < moviedata.length; i++) {
        let movieObj = new Movie();
        movieObj.langName = (<any>moviedata[i]).langName;
        movieObj.movieName = (<any>moviedata[i]).movieName;
        movieObj.directorName = (<any>moviedata[i]).directorName;

        //using sanitizer
        movieObj.youtube = <string>this.sanitizer.bypassSecurityTrustResourceUrl((<any>moviedata[i]).youtube);
        movieObj.rating = (<any>moviedata[i]).rating;
        movieObj.movieReview = (<any>moviedata[i]).movieReview;

        if (movieObj.langName == lang) {
          this.movieList.push(movieObj);
          this.rawMovieList.push(movieObj);
        }

      }
    })
  }

  onFilterMovies(filteredMovieList) {
    this.movieList = [...filteredMovieList];
  }

}
