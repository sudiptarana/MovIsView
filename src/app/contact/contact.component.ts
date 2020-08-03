import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {about } from '../models/about';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) { }

  name:string;
  email:string;
  massage:string;

  creatlang(){

    if(!!this.email){
      let index= this.aboutList.findIndex((x)=>{
        return x.email== this.email;
       });

  //if its false , the value of index is -1
    if(index == -1){

    let langObj= new about; 
    langObj.email= this.email;
    langObj.name= this.name;
    langObj.massage= this.massage;

    this.db.list('/contact').push(langObj);

    this.email="";
    this.name="";
    this.massage="";

    }
  }
}

ngOnInit() {
  this.aboutList = [];
  //when ever there is a valuechange , we subcribe to that & we get the data & exicute a code, which we gives in subbsribe method.
  //we get the data automalicaly from database. 
  this.db.list('/contact').valueChanges().subscribe((dbData)=>{
    this.aboutList = [];
    for(let i=0;i<dbData.length;i++){
      let langObj= new about();
      langObj.id=i;
      //to change data-type: (<new-data-type>var)
      langObj.name= (<any>dbData[i]).name;
      langObj.email= (<any>dbData[i]).email;
      langObj.massage= (<any>dbData[i]).massage;
      this.aboutList.push(langObj);
    }
  })
}

aboutList: Array<about>=[
  {id:1,name:"",email:"", massage:""},
  {id:2,name:"",email:"", massage:""},
  {id:3,name:"",email:"", massage:""},
]

}
