import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
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

    if (search ) {
      params = new HttpParams()
    }
  }
}
