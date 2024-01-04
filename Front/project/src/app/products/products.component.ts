import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  currentProduct: any = { id: null, name: '', description: '', price: 0 };
  currentIndex = -1;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts(): void {
    this.productService.getProducts()
      .subscribe(
        data => {
          this.products = data;
        },
        error => {
          console.log(error);
        });
  }

  setActiveProduct(product: any, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  saveProduct(): void {
    if (this.currentProduct.id) {
      this.productService.updateProduct(this.currentProduct.id, this.currentProduct)
        .subscribe(
          response => {
            console.log(response);
            this.retrieveProducts(); // Refresh the list
          },
          error => {
            console.log(error);
          });
    } else {
      this.productService.createProduct(this.currentProduct)
        .subscribe(
          response => {
            console.log(response);
            this.products.push(response);
          },
          error => {
            console.log(error);
          });
    }
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id)
      .subscribe(
        response => {
          console.log(response);
          this.products = this.products.filter(item => item.id !== id);
          this.currentProduct = null;
          this.currentIndex = -1;
        },
        error => {
          console.log(error);
        });
  }

  newProduct(): void {
    this.currentProduct = { id: null, name: '', description: '', price: 0 };
    this.currentIndex = -1;
  }
}
