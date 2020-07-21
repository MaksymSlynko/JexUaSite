import { IVideos } from '../interfaces/videos.interface';

export class Videos implements IVideos {
    constructor(
        public id: string,
        public url: string,
        public name: string,
    ) {}
   
}