import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResponse, Game } from 'src/app/model';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sort: string[] = [];
  public games: Array<Game> = [];
  constructor(private httpService: HttpService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((pramas: Params) => {
      if (pramas['game-search']) {
        this.searchGames('metacrit', pramas['game-search']);
      }else{
        this.searchGames('metacrit');
      }
    })
  }

  searchGames(sort: string, search?: string):void{
    this.httpService.getGameList(sort, search)
    .subscribe((gameList: ApiResponse<Game>) => {
      this.games = gameList.results;
      console.log(gameList);

    });
  }
}
