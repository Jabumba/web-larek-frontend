import { IClickable } from '../../base/view';

export interface IItemData {
	id: string;
    title: string
	price: string;
}

export interface TicketSettings extends IClickable<IItemData> {
	id: string;
    title: string
	price: string;
	delete: string;
}