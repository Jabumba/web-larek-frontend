import { IHeaderData } from '../common/header';
import { IAddPayData } from '../partial/addPay';

export interface ISelectAddPayData {
    addPay: IAddPayData;
    header: IHeaderData
	isActive: boolean;
	isDisabled: boolean;
    message: string;
	isError: boolean;
}

export interface ISelectAddPaySettings {
	onSelect: (id: string) => void;
    onChange: (data: IAddPayData) => void;
	onNext: () => void;
	onClose: () => void;
}