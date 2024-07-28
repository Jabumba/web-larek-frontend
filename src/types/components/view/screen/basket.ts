import { IHeaderData } from '../common/header';
import { IItemData } from '../partial/ticket';

export interface IBasketData {
	tickets: IItemData[];
	header: IHeaderData;
	isActive: boolean;
	isDisabled: boolean;
	total: string;
}

export interface IBasketSettings {
	onDelete: (id: string) => void;
	onClose: () => void;
	onNext: () => void;
}