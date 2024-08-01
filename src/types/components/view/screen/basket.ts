import { IHeaderData } from '../common/header';
import { IItemData } from '../partial/ticket';
import { IModalScreenSettings } from './modalScreen';

export interface IBasketData {
	tickets: IItemData[];
	header: IHeaderData;
	isActive: boolean;
	isDisabled: boolean;
	total: string;
};

export interface IBasketSettings extends IModalScreenSettings {
	onDelete: (id: string) => void;
};