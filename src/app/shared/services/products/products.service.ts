import { Injectable } from '@angular/core';

import { IProduct } from '../../interfaces/product.interface';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFirestore) { }

  public getAll() {
    return this.db.collection<IProduct>('Product').get()
      .pipe(
        map((e) => {
          return e.docs.map(el => {
            const data = el.data();
            return new Product(el.id, data.nameUA, data.nameEN, data.size, data.price, data.count, data.img)
          });
        })
      );
  }

  public getOneProduct(id: String) {
    return this.db.collection<IProduct>("Product").doc(`${id}`).get();
  }

  public addProduct(product: IProduct) {
    return this.db.collection<IProduct>('Product').add(product);
  }

  public deleteProduct(product: IProduct) {
    return this.db.collection<IProduct>('Product').doc(product.id).delete();
  }

  public editProduct(product: IProduct) {
    return this.db.collection<IProduct>('Product').doc(product.id).update(product);
  }
}
