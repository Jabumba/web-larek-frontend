import { IProduct } from "./product-api";

export interface IBasket {
    totalItems: number;
    products: IProduct[];
    totalPrice: number;

    removeProduct(id: string): void
}