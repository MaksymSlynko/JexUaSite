import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { Product } from 'src/app/shared/models/product.model';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  orderForm: FormGroup;
  order: Array<IProduct> = [];
  counter = 1;

  constructor(private ordersService: OrdersService,
    private fb: FormBuilder,) {
      this.orderForm = this.fb.group({
        name: ['', [Validators.required]],
        secondName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        postal: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        email: ['', [Validators.required]]
      })
     }

  ngOnInit(): void {
    this.getProductsFromBasket();
  }

  private getProductsFromBasket(): void {
    const basketInStorage = localStorage.getItem('basket');

    if (basketInStorage) {
      this.order = JSON.parse(basketInStorage);
      console.log(this.order)
    }
  }
  public deleteFromBasket(productIndex): void {
    const basketInStorage = localStorage.getItem('basket');

    if (basketInStorage) {
      this.order = JSON.parse(basketInStorage);
      this.order.splice(productIndex, 1);
      localStorage.setItem('basket', JSON.stringify(this.order));
      this.ordersService.basket.next()
    }
  } 

  clearBasket = () => {
    this.order = [];
    localStorage.setItem('basket', JSON.stringify(this.order));
    this.ordersService.basket.next();
  }

  public getTotalCount(product: IProduct): number {
    return Product.totalPrice(product);
  }
  
  addOrder():void{
    console.log(this.orderForm.value)
    const result = {
      ...this.orderForm.value,
      
      orderItems: JSON.stringify(this.order)
    }
    this.ordersService.addOrderToFb(result).then(() => {
      this.orderForm.reset();
      this.clearBasket()
    });
  }

}
