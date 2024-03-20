import { lastValueFrom } from 'rxjs';
import { Constant } from './../../../config/constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Searchmov } from '../../model/ssearch';
import { isearchmov } from '../../model/isearch';
import { TTTTsearchmov } from '../../model/tsearch';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  pages: any;
  checkInput = false;
  constructor(private constant: Constant, private http: HttpClient) {}
  url = this.constant.API_ENDPOINT;

  public async getPage(plot: string, page?: number) {
    const response = await lastValueFrom(
      this.http.get(this.url, {
        params: {
          s: plot,
          page: page || 1,
        },
      })
    );
    return response as Searchmov;
  }

  public async getID(id?: string) {
    const response = await lastValueFrom(
      this.http.get(this.url, {
        params: {
          i: id!,
        },
      })
    );

    return response as isearchmov;
  }

  public async getNameFull(namefull?: string) {
    const response = await lastValueFrom(
      this.http.get(this.url, {
        params: {
          t: namefull!
        },
      })
    );

    return response as TTTTsearchmov;
  }
}
