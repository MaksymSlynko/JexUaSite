import { IProduct, ISize } from '../interfaces/product.interface';

export class Product implements IProduct {
    sizes: ISize[] = [];

    constructor(
        public id: string,
        public nameUA: string,
        public nameEN: string,
        public size: string,
        public price: number,
        public count: number = 1,
        public img: string,
    ) {}

    static totalCount(product: IProduct): number {
        if (product.sizes.length) {
           return product.sizes.reduce((acc, curr) => acc + curr.count, 0);
        }
        
        return 0;
    }
    static totalPrice(product: IProduct): number {
        if (product.sizes.length) {
            return product.sizes.reduce((acc, curr) => acc + curr.count*product.price, 0)
        }
    }
}
