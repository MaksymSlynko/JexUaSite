import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IVideos } from '../../interfaces/videos.interface';
import { Videos } from '../../models/videos.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private db: AngularFirestore) { }

  public getAll(){
    return this.db.collection<IVideos>('Videos').get()
      .pipe(
        map((e)=>{
          return e.docs.map(el => {
            const data = el.data();
            return new Videos(el.id, data.url, data.name)
          });
        })
      );
  }

  public addVideo(video: IVideos) {
    return this.db.collection<IVideos>('Videos').add(video);
  }

  public deleteVideo(video: IVideos) {
    return this.db.collection<IVideos>('Videos').doc(video.id).delete();
  }
  
  public editDevice(video: IVideos) {
    return this.db.collection<IVideos>('Videos').doc(video.id).update(video);
  }
}
