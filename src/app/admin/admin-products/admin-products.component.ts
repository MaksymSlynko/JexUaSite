import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { generateId } from 'src/app/shared/helpers/random-id';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  productsForm: FormGroup;
  products: IProduct[] = [];

  constructor(private fb: FormBuilder, private productService: ProductsService) {
    this.productsForm = this.fb.group({
      id: [''],
      nameUA: ['', [Validators.required]],
      nameEN: ['', [Validators.required]],
      size: ['', [Validators.required]],
      count: [1],
      price: ['' , [Validators.required]],
      img: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getAll().subscribe(e => {
      this.products = e;
      console.log(e)
    })
  }

  addProduct = () => {
    if (this.productsForm.value.id) {
      this.productService.editProduct(this.productsForm.value).then(() => {
        this.productsForm.reset();
        this.loadProducts();
      })
    } else {
      this.productService.addProduct({
        ...this.productsForm.value,
        id: generateId()
      }). then(() => {
        this.productsForm.reset();
        this.loadProducts();
      })
    }
  }

  editProduct(product: IProduct) {
    this.productsForm.setValue(product);
  }

  deleteProduct(product: IProduct) {
    this.productService.deleteProduct(product).then(() => {
      this.loadProducts();
    })
  }

}
