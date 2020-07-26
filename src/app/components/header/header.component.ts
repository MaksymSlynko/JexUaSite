import { Component, OnInit, HostListener } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  getProducts: Array<any> = [];
  suma = 0;
  isMenuOpened = true;
  isDesktop = window.innerWidth >= 1025;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.productLength();
    this.getBasket();
    console.log(this.suma)
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isDesktop = window.innerWidth >= 1025;
    if (this.isDesktop && !this.isMenuOpened) {
      this.isMenuOpened = true;
    }
  }

  private productLength(): void{
    this.ordersService.basket.subscribe(data => {
      this.getBasket();
      // this.getProducts.push(data);
      // this.suma = this.getProducts.reduce((accum, product) => accum + product.price, 0);
      
      console.log(data)
      console.log(this.getProducts)
      console.log(this.suma)
    });
  }
  private getBasket(): void{
    const basketInStorage = localStorage.getItem('basket');

    if (basketInStorage) {
      this.getProducts = JSON.parse(basketInStorage);
      this.suma = this.getProducts.reduce((accum, product) => accum + Product.totalPrice(product), 0);
    }
  }


  closeHenu = () => {
    if (!this.isDesktop) {
      this.isMenuOpened = false;
    }
  }
}
