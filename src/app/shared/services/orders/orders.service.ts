import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { IOrder } from '../../interfaces/order.interface';
import { Order } from '../../models/order.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  basket: Subject<any> = new Subject<any>();

  constructor(private db: AngularFirestore) { }

  public getAll() {
    return this.db.collection<IOrder>('Order').get()
      .pipe(
        map((e) => {
          return e.docs.map(el => {
            const data = el.data();
            return new Order(el.id, data.name, data.secondName, data.address, data.city, data.state, data.postal, data.phone, data.email, data.orderItems)
          });
        })
      );
  }

  public getOneOrder(id: String) {
    return this.db.collection<IOrder>("Order").doc(`${id}`).get();
  }

  public addOrderToFb(order: IOrder) {
    return this.db.collection<IOrder>('Order').add(order);
  }

  public deleteOrder(order: IOrder) {
    return this.db.collection<IOrder>('Order').doc(order.id).delete();
  }

  public editOrder(order: IOrder) {
    return this.db.collection<IOrder>('Order').doc(order.id).update(order);
  }

}
