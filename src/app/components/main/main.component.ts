import { isearchmov } from './../../model/isearch';
import { TTTTsearchmov } from './../../model/tsearch';
import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Searchmov } from '../../model/ssearch';
import { MovieService } from '../../services/api/movie.service';
import { CommonModule,Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [HeaderComponent,CommonModule]
})
export class MainComponent {

  cheack: number = 0;
  movna: Searchmov | undefined;
  idsearch: isearchmov | undefined;
  tsearch: TTTTsearchmov | undefined;
  detail: isearchmov | undefined;
  total: number = 0;
  pages: Array<number> = [];
  plot: string = '';
  public count : number = 1;

  constructor(private service: MovieService,private location: Location,  private router: Router) { }

  async searchmov(name: HTMLInputElement) {
    this.plot=name.value;
    if (name.value.startsWith('tt')) {
      this.cheack = 3;
      this.idsearch = await this.service.getID(name.value);
      console.log(this.idsearch);
    } else {
      this.cheack=0;
      this.movna = await this.service.getPage(name.value, 1);
      this.total = Math.ceil(+this.movna.totalResults / 10);
      console.log(this.movna);
    }
    this.pages = Array.from({ length: this.total }, (_, index) => index + 1);
  }

  async searchName(namefull: HTMLInputElement) {
    this.cheack = 2;
    this.tsearch = await this.service.getNameFull(namefull.value);
    // console.log("ihaaa");

  }

  async nextpage(direction:'next'|'back') {
    const page = 1;
    if(direction ==='next'){
      this.count += page;
    }else if(direction==='back'&& this.count > 1){
      this.count -= page;
    }

 console.log(this.count);

    this.movna = await this.service.getPage(this.plot,this.count);
console.log(this.movna);

  }
  async tomovie(idMovie: string) {
    this.cheack = 1;
    this.detail =await this.service.getID(idMovie);
    console.log(this.detail);
    }
    goBack() {
      this.cheack=0;
    }
}
