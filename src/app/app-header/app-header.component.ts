import { Component, OnInit } from '@angular/core';
import {MovieLang} from '../models/lang';
import{AngularFireDatabase} from 'angularfire2/database';
import{Router}from '@angular/router';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  constructor(private db:AngularFireDatabase, private router:Router) { }

  langName:string;

  creatlang(){
    //return true or false based on condition.
    if(!!this.langName){
      let index= this.langList.findIndex((x)=>{
        return x.langName== this.langName;
       });

  //if its false , the value of index is -1
    if(index == -1){
    let langObj= new MovieLang; 
    langObj.langName= this.langName;

    this.db.list('/Lang').push(langObj);

    this.langName="";
    }
  }
}


  ngOnInit() {
    this.langList = [];
    //when ever there is a valuechange , we subcribe to that & we get the data & exicute a code, which we gives in subbsribe method.
    //we get the data automalicaly from database. 
    this.db.list('/Lang').valueChanges().subscribe((dbData)=>{
      this.langList = [];
      for(let i=0;i<dbData.length;i++){
        let langObj= new MovieLang();
        langObj.id=i;
        //to change data-type: (<new-data-type>var)
        langObj.langName= (<any>dbData[i]).langName;
        this.langList.push(langObj);
      }
    })
  }

  langList: Array<MovieLang>=[
    {id:1,langName:"English"},
    {id:2,langName:"Hindi"},
    {id:3,langName:"Bengali"},
  ]

  selectedTab ='home';

// admin & home clicking function
  adminClicked()
  {
    this.router.navigate(['/admin']);
    this.selectedTab='admin';
  }
  homeClicked()
  {
    this.router.navigate(['/home']);
    this.selectedTab='home';
  }
  newsClicked()
  {
    this.router.navigate(['/news']);
    this.selectedTab='news';
  }
  songsClicked()
  {
    this.router.navigate(['/songs']);
    this.selectedTab='songs';
  }
  aboutClicked()
  {
    this.router.navigate(['/contact']);
    this.selectedTab='contact';
  }


  gotoMovie(item:MovieLang)
  {
    this.router.navigate(['/movie',item.langName]);
    this.selectedTab='movies';
  }



}