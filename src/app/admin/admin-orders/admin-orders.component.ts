import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { Product } from 'src/app/shared/models/product.model';
import { Order } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  orders: Array<IOrder> = [];

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAll().subscribe(e => {
      console.log('after', e)
      this.orders = e;
    });
  }
  deleteOrder(id): void{
    this.orderService.deleteOrder(id);
  }
  public getTotalCount(product: IProduct): number {
    return Product.totalPrice(product);
  }
  public orderTotalPrice(products: Array<IProduct>): number {
    return Order.getTotalPrice(products);
  }
}
