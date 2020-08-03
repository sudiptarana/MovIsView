import { Component, OnInit } from '@angular/core';
import{AngularFireDatabase} from 'angularfire2/database';
import{MovieLang}from '../../models/lang';

@Component({
  selector: 'app-admin-language',
  templateUrl: './admin-language.component.html',
  styleUrls: ['./admin-language.component.css']
})
export class AdminLanguageComponent implements OnInit {

  constructor(private db:AngularFireDatabase) { }

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
}
