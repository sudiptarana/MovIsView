import { Component, OnInit } from '@angular/core';
import{AngularFireDatabase} from 'angularfire2/database';
import{news}from '../../models/news';


@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css']
})
export class AdminNewsComponent implements OnInit {

  constructor(private db:AngularFireDatabase) { }

  newsTitel:string;
  catagory:string;
  DateTime:string;
  newsDetails:string;

  creatlang(){

    if(!!this.newsTitel){
      let index= this.langList.findIndex((x)=>{
        return x.newsTitel== this.newsTitel;
       });

  //if its false , the value of index is -1
    if(index == -1){

    let langObj= new news; 
    langObj.newsTitel= this.newsTitel;
    langObj.catagory= this.catagory;
    langObj.DateTime= this.DateTime;
    langObj.newsDetails= this.newsDetails;

    this.db.list('/news').push(langObj);

    this.newsTitel="";
    this.catagory="";
    this.DateTime="";
    this.newsDetails="";

    }
  }
}


  ngOnInit() {
    this.langList = [];
    //when ever there is a valuechange , we subcribe to that & we get the data & exicute a code, which we gives in subbsribe method.
    //we get the data automalicaly from database. 
    this.db.list('/news').valueChanges().subscribe((dbData)=>{
      this.langList = [];
      for(let i=0;i<dbData.length;i++){
        let langObj= new news();
        langObj.id=i;
        //to change data-type: (<new-data-type>var)
        langObj.newsTitel= (<any>dbData[i]).newsTitel;
        langObj.catagory= (<any>dbData[i]).catagory;
        langObj.DateTime= (<any>dbData[i]).DateTime;
        langObj.newsDetails= (<any>dbData[i]).newsDetails;
        this.langList.push(langObj);
      }
    })
  }

  langList: Array<news>=[
    {id:1,newsTitel:"",catagory:"",DateTime:"", newsDetails:""},
    {id:2,newsTitel:"",catagory:"",DateTime:"", newsDetails:""},
    {id:3,newsTitel:"",catagory:"",DateTime:"", newsDetails:""},
  ]

}
