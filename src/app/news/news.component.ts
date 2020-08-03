import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {news } from '../models/news';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';

import { from } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  constructor(private db: AngularFireDatabase, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) { }

  newsList: Array<news>;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params)=>{
      let lang= params["lang"];
      this.getMovies(lang);
    });
  }

  getMovies(lang: string){
    this.db.list('/news').valueChanges().subscribe((newsdata)=>{
      this.newsList=[];
      for(let i=0;i< newsdata.length;i++){
        let newsObj = new news();
    newsObj.newsTitel= (<any>newsdata[i]).newsTitel;
    newsObj. catagory= (<any>newsdata[i]). catagory;
    newsObj.DateTime= (<any>newsdata[i]).DateTime;
    newsObj.newsDetails=(<any>newsdata[i]).newsDetails;

    this.newsList.push(newsObj);
      }
    })
}
}