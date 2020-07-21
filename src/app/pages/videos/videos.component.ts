import { Component, OnInit } from '@angular/core';
import { IVideos } from 'src/app/shared/interfaces/videos.interface';
import { VideosService } from 'src/app/shared/services/videos/videos.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  videos: IVideos[] = [];
  slideConfig = {infinite: false, slidesToShow: 3, slidesToScroll: 1};

  constructor(private videosService: VideosService) {
   }

  ngOnInit(): void {
    this.videosService.getAll()
      .subscribe(e => {
        this.videos = e;
        console.log(e[0].url)
      });
  }

  public getVideoId(url: string): string {
    if (url.includes('/watch?')) {
      return url.split('v=').pop();
    }
    return url.split('/').pop();
  }

  
}