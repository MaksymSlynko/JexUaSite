import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: IProduct;
  sizes: Array<any>;
  localProducts: Array<IProduct> = [];
  productInBag: IProduct;
  selectedSize: string = null;
  selectedCount = 1;

  constructor(
    private ProductsService: ProductsService,
    private router: ActivatedRoute,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.getProduct()
  }

  private getProduct(): void {
    const id = this.router.snapshot.paramMap.get('id');
    this.ProductsService.getOneProduct(id).subscribe(e => {
      this.product = new Product(e.data().id, e.data().nameUA, e.data().nameEN, e.data().size, e.data().price, e.data().count, e.data().img);
      this.sizes = this.product.size.split("/")
      console.log(this.product)
      console.log(this.sizes)
    })
  }

  addToBasket(product: IProduct): void {
    const basketInStorage = localStorage.getItem('basket');

    if (basketInStorage) {
      this.localProducts = JSON.parse(basketInStorage);
      const productIndex = this.localProducts.findIndex(prod => prod.id === product.id);

      if (productIndex >= 0) { // products already exists in basket
        const sizes = this.localProducts[productIndex].sizes || []; // sizes ->[{ size: 'l', count: 2 }]

        const selectedSizeIndex = sizes.findIndex(el => el.size === this.selectedSize);
        if (selectedSizeIndex >= 0) { // size already exists in basket
          this.localProducts[productIndex].sizes[selectedSizeIndex].count += this.selectedCount;
        } else {
          this.localProducts[productIndex].sizes.push({
            size: this.selectedSize,
            count: this.selectedCount
          });
        }
      } else {
        this.localProducts.push({
          ...product,
          sizes: [{
            size: this.selectedSize,
            count: this.selectedCount
          }],
        })
      }
    } else {
      this.localProducts = [{
        ...product,
        sizes: [{
          size: this.selectedSize,
          count: this.selectedCount
        }],
      }]
    }
    localStorage.setItem('basket', JSON.stringify(this.localProducts));
    this.ordersService.basket.next({
      ...product,
      sizes: [{
        size: this.selectedSize,
        count: this.selectedCount
      }],
    });
    this.selectedCount = 1;
  }

  productCount(status: boolean): void{
    if(status) {
      this.selectedCount++;
    } else{
      if(this.selectedCount>1) {
        this.selectedCount--;
      }
    }
  }
}
