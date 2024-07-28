import { ICardData } from '../partial/card';
import { IProductData } from '../partial/product';

export interface IProductItem extends IProductData {
	id: string;
}

export interface IMainData {
	counter: number;
	items: ICardData[];
}

export interface IMainSettings {
	onOpenBasket: () => void;
	onOpenProductScreen: (id: string) => void;
}