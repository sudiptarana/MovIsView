import { Component, OnInit } from '@angular/core';
import{AngularFireDatabase} from 'angularfire2/database';
import{songs}from '../../models/songs';

@Component({
  selector: 'app-admin-songs',
  templateUrl: './admin-songs.component.html',
  styleUrls: ['./admin-songs.component.css']
})
export class AdminSongsComponent implements OnInit {

  constructor(private db:AngularFireDatabase) { }

  songsTitel:string;
  catagory:string;
  songsLink:string;
  
  creatlang(){

    if(!!this.songsTitel){
      let index= this.langList.findIndex((x)=>{
        return x.songsTitel== this.songsTitel;
       });

  //if its false , the value of index is -1
    if(index == -1){

    let langObj= new songs; 
    langObj.songsTitel= this.songsTitel;
    langObj.catagory= this.catagory;
    langObj.songsLink= this.songsLink;
   

    this.db.list('/songs').push(langObj);

    this.songsTitel="";
    this.catagory="";
    this.songsLink="";

    }
  }
}


  ngOnInit() {
    this.langList = [];
    //when ever there is a valuechange , we subcribe to that & we get the data & exicute a code, which we gives in subbsribe method.
    //we get the data automalicaly from database. 
    this.db.list('/songs').valueChanges().subscribe((dbData)=>{
      this.langList = [];
      for(let i=0;i<dbData.length;i++){
        let langObj= new songs();
        langObj.id=i;
        //to change data-type: (<new-data-type>var)
        langObj.songsTitel= (<any>dbData[i]).songsTitel;
        langObj.catagory= (<any>dbData[i]).catagory;
        langObj.songsLink= (<any>dbData[i]).songsLink;
        this.langList.push(langObj);
      }
    })
  }

  langList: Array<songs>=[
  ]

}
