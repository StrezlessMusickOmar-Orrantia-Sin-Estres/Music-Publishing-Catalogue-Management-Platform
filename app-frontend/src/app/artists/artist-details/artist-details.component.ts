import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Artist} from "../../zshared/interfaces/artist";
import {ArtistsService} from "../../zshared/services/artists.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ArtistListEntryComponent} from "../artist-list/artist-list-entry/artist-list-entry.component";

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css']
})
export class ArtistDetailsComponent implements OnInit {
  artist!: Artist;

  constructor(private artistsService: ArtistsService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (param: Params) => {
          this.artist.artistName = param['id'];
        }
      );
    this.onShowArtist();
  }

  onShowArtist() {
    this.artistsService.getArtist(this.artist.id);
    console.log("This Artist: " + this.artist);
  }

  onEditArtist() {
    this.router.navigate(
      ['edit'],
      {relativeTo: this.route}
    );
  }

  onDeleteArtist() {
    this.artistsService.removeArtist(this.artist.id);
    this.router.navigate(
      ['../'],
      {relativeTo: this.route}
    );
  }

}
