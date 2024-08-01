import { IHeaderData } from '../common/header';
import { IAddPayData } from '../partial/addPay';
import { IModalScreenSettings } from './modalScreen'

export interface ISelectAddPayData {
    addPay: IAddPayData;
    header: IHeaderData
	isActive: boolean;
	isDisabled: boolean;
    message: string;
	isError: boolean;
};

export interface ISelectAddPaySettings extends IModalScreenSettings {
	onSelect: (id: string) => void;
    onChange: (data: IAddPayData) => void;
};