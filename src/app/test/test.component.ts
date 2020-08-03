import{Component} from '@angular/core';
import { MovieDetail } from '../models/movies';

@Component({
    //
    selector:'test-component',
    templateUrl:'./test.component.html',
    styleUrls:['./test.component.css'],
    

})


// to make a class visible the class globaly , use "export"
export class Testcomponent{
        textvalue:string;

    //*hiden & shown data TS
        isDivVisible = false;
        //toogle it
        toggleClicked(){
        if(this.isDivVisible==true){
             this.isDivVisible=false;
        }
        else{
          this.isDivVisible= true;
        }

        }

    //*show a movie Table
        movieList:Array<MovieDetail>;
        showMovielist()
        {
            //to giv a memory space for movielist, to store any thing
            this.movieList = new Array<MovieDetail>();

            for(let i=0 ; i<10 ; i++)
            {
                let movie= new MovieDetail();
                movie.id=i;
                movie.movieName="My Movie"+i;
                this.movieList.push(movie);
            }

        }

}