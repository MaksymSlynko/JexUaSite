import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAll()
      .subscribe((e) => {
        this.products = e;
        console.log(e)
      });
  }

  slideConfig = {infinite: false, slidesToShow: 3, slidesToScroll: 1};

}
