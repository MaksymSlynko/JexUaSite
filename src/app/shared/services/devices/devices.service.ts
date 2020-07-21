import { Injectable } from '@angular/core';

import { IDevice } from '../../interfaces/device.interface';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Device } from '../../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private db: AngularFirestore) { }

  public getAll() {
    return this.db.collection<IDevice>('Devices').get()
      .pipe(
        map((e)=>{
          console.log('before', e)
          return e.docs.map(el => {
            const data = el.data();
            return new Device(el.id, data.img, data.name, data.description)
          });
        })
      );
  }

  public addDevice(device: IDevice) {
    return this.db.collection<IDevice>('Devices').add(device);
  }

  public deleteDevice(device: IDevice) {
    console.log(device);
    return this.db.collection<IDevice>('Devices').doc(device.id).delete();

  }

  public editDevice(device: IDevice) {
    return this.db.collection<IDevice>('Devices').doc(device.id).update(device);
  }
}
