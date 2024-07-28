import { IClickable } from '../../base/view';

export interface ICardData {
	id: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface ICardSettings extends IClickable<string> {
	image: string;
    title: string;
    category: string;
    price: number;
}