import { IOrderData } from '../partial/order';
import { IHeaderData } from '../common/header';

export interface IOrderFormData {
	contacts: IOrderData;
	header: IHeaderData;
	isActive: boolean;
	isDisabled: boolean;
	message: string;
	isError: boolean;
}

export interface IOrderFormSettings {
	onChange: (data: IOrderData) => void;
	onClose: () => void;
	onNext: () => void;
}