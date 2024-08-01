import { IOrderData } from '../partial/order';
import { IHeaderData } from '../common/header';
import { IModalScreenSettings } from './modalScreen';

export interface IOrderFormData {
	contacts: IOrderData;
	header: IHeaderData;
	isActive: boolean;
	isDisabled: boolean;
	message: string;
	isError: boolean;
};

export interface IOrderFormSettings extends IModalScreenSettings {
	onChange: (data: IOrderData) => void;
};