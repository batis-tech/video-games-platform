import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from "@angular/common/http";
import { environment as env  } from "src/environments/environment";
import {  Observable } from 'rxjs';
import { ApiResponse, Game } from '../model';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  getGameList(
    ordering: string,
    search?: string
  ): Observable<ApiResponse<Game>>{
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }
    return this.http.get<ApiResponse<Game>>(`${env.BASE_URL}/games`,{
      params: params
    });
  }
}
