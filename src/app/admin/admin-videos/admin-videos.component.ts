import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IVideos } from 'src/app/shared/interfaces/videos.interface';
import { VideosService } from 'src/app/shared/services/videos/videos.service';
import { generateId } from 'src/app/shared/helpers/random-id';

@Component({
  selector: 'app-admin-videos',
  templateUrl: './admin-videos.component.html',
  styleUrls: ['./admin-videos.component.scss']
})
export class AdminVideosComponent implements OnInit {

  videosForm: FormGroup;
  videos: IVideos[] = [];

  constructor(private fb: FormBuilder, private videosService: VideosService) {
    this.videosForm = this.fb.group({
      id: [''],
      url: ['', [Validators.required]],
      name: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos() {
    this.videosService.getAll().subscribe(e => {
      console.log(e)
      this.videos = e;
    });
  }

  addVideo = () => {
    if (this.videosForm.value.id) {
      this.videosService.editDevice(this.videosForm.value).then(() => {
        this.videosForm.reset();
        this.loadVideos();
      });
    } else {
      this.videosService.addVideo({
        ...this.videosForm.value,
        id: generateId()
      }).then(() => {
        this.videosForm.reset();
        this.loadVideos();
      });
      console.log(this.videos)
    }
  }

  editVideo(video: IVideos){
    this.videosForm.setValue(video);
  }

  deleteVideo(video: IVideos) {
    this.videosService.deleteVideo(video).then(() => {
      this.loadVideos();
    })
  }

}
