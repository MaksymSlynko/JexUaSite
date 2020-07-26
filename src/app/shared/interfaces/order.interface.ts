import { IProduct } from './product.interface';

export interface IOrder {
    id: string,
    name: string,
    secondName: string,
    address: string,
    city: string,
    state: string,
    postal: number,
    phone: number,
    email: string,
    orderItems: string
    products?: Array<IProduct>
}