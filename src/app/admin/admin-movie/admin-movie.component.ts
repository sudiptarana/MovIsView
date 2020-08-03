import { Component, OnInit } from '@angular/core';
import{AngularFireDatabase} from 'angularfire2/database';
import{Movie}from '../../models/movi';

@Component({
  selector: 'app-admin-movie',
  templateUrl: './admin-movie.component.html',
  styleUrls: ['./admin-movie.component.css']
})

export class AdminMovieComponent implements OnInit {

  constructor(private db:AngularFireDatabase) { }

  langName:string;
  movieName:string;
  directorName:string;
  movieReview:string;
  youtube:string;
  rating:string;

  creatlang(){

    if(!!this.movieName){
      let index= this.langList.findIndex((x)=>{
        return x.movieName== this.movieName;
       });

  //if its false , the value of index is -1
    if(index == -1){

    let langObj= new Movie; 
    langObj.langName= this.langName;
    langObj.movieName= this.movieName;
    langObj.directorName= this.directorName;
    langObj.youtube= this.youtube;
    langObj.rating= this.rating;
    langObj.movieReview= this.movieReview;

    this.db.list('/movie').push(langObj);

    this.langName="";
    this. movieName="";
    this.directorName="";
    this.movieReview="";
    this.youtube="";
    this.rating="";

    }
  }
}


  ngOnInit() {
    this.langList = [];
    //when ever there is a valuechange , we subcribe to that & we get the data & exicute a code, which we gives in subbsribe method.
    //we get the data automalicaly from database. 
    this.db.list('/movie').valueChanges().subscribe((dbData)=>{
      this.langList = [];
      for(let i=0;i<dbData.length;i++){
        let langObj= new Movie();
        langObj.id=i;
        //to change data-type: (<new-data-type>var)
        langObj.langName= (<any>dbData[i]).langName;
        langObj.movieName= (<any>dbData[i]).movieName;
        langObj.directorName= (<any>dbData[i]).directorName;
        langObj.youtube= (<any>dbData[i]).youtube;
        langObj.rating= (<any>dbData[i]).rating;
        langObj.movieReview= (<any>dbData[i]).movieReview;
        this.langList.push(langObj);
      }
    })
  }

  langList: Array<Movie>=[
    {id:1,langName:"",movieName:"",directorName:"",youtube:"",rating:"",movieReview:""},
  ]

}
