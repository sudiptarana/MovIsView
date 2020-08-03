import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../models/movi';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() inputMovieList: Array<Movie> = [];
  @Output() outputMovieList: EventEmitter<Array<Movie>> = new EventEmitter<Array<Movie>>();
  searchText: string;

  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    //console.log(this.searchText);
    //console.log(this.inputMovieList);
    let filteredMovies = [];
    for (let i = 0; i < this.inputMovieList.length; i++) {
      let movie = this.inputMovieList[i];

      // to make any element lower case , that it dosn't case sensetive
      let movieName = movie.movieName.toLowerCase();
      let searchInput = this.searchText.toLowerCase();
      if (movieName.indexOf(searchInput) > -1) {
        filteredMovies.push(movie);
      }
    }
    console.log(filteredMovies);
    this.outputMovieList.emit(filteredMovies);
  }

}
