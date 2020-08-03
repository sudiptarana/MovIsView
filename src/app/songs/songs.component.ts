import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {songs } from '../models/songs';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})


export class SongsComponent implements OnInit {

  constructor(private db:AngularFireDatabase , private sanitizer:DomSanitizer , private activatedRoute:ActivatedRoute) { }


 //hindi
 hsongs: Array<songs>;

 ngOnInit() {
   this.activatedRoute.params.subscribe((params)=>{
     let lang ='Hindi-Songs';
     this.getHind(lang);

     this.activatedRoute.params.subscribe((params)=>{
       let beng ='Bengali-Songs';
       this.getBeng(beng);

     });
   });
 }

 getHind(lang: string){
   this.db.list('/songs').valueChanges().subscribe((moviedata)=>{
     this.hsongs=[];
     for(let i=0;i< moviedata.length;i++){
       let movieObj = new songs();
   movieObj.songsTitel= (<any>moviedata[i]).songsTitel;
   movieObj.catagory= (<any>moviedata[i]).catagory;
   movieObj.songsLink=<string>this.sanitizer.bypassSecurityTrustResourceUrl((<any>moviedata[i]).songsLink)

   if (movieObj.catagory == lang) {
     this.hsongs.push(movieObj);
     }
   }
   })
 }

//bengali
bsongs: Array<songs>;

getBeng(lang: string){
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
