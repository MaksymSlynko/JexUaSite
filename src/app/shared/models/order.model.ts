import { IOrder } from '../interfaces/order.interface';
import { IProduct } from '../interfaces/product.interface';
import { Product } from './product.model';

export class Order implements IOrder {
    products = []
    constructor(
        public id: string,
        public name: string,
        public secondName: string,
        public address: string,
        public city: string,
        public state: string,
        public postal: number,
        public phone: number,
        public email: string,
        public orderItems: string
    ) {
        this.products = Order.getOrderProducts(orderItems)
    }

    static getOrderProducts(products: string): Array<IProduct>{
        return JSON.parse(products)
    }
    static getTotalPrice(products: Array<IProduct>): number{
        return products.reduce((acc, curr)=> acc + Product.totalPrice(curr), 0)
    }
}