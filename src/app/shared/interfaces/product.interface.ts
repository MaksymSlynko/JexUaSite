export interface IProduct {
    id: string;
    nameUA: string;
    nameEN: string;
    size: string;
    price: number;
    count: number;
    img: string;
    sizes: ISize[]
};

export interface ISize {
    size: string;
    count: number;
}