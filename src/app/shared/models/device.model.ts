import { IDevice } from '../interfaces/device.interface';

export class Device implements IDevice {
    constructor(
        public id: string,
        public img: string,
        public name: string,
        public description: string,
    ) {}
   
}