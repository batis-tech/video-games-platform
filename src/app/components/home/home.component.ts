import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params , Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResponse, Game } from 'src/app/model';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: any = [];
  public games: Array<Game> = [];
  private routeSub: any = Subscription;
  private gameSub: any = Subscription;
  constructor(private httpService: HttpService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((pramas: Params) => {
      if (pramas['game-search']) {
        this.searchGames('metacrit', pramas['game-search']);
      }else{
        this.searchGames('metacrit');
      }
    })
  }

  searchGames(sort: string, search?: string):void{
    this.gameSub = this.httpService.getGameList(sort, search)
    .subscribe((gameList: ApiResponse<Game>) => {
      this.games = gameList.results;
      console.log(gameList);

    });
  }
  openGameDetails(id: string){
    this.router.navigate(['details', id]);
  }

  ngOnDestroy():void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
  }
}
