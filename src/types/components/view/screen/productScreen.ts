import { IHeaderData } from '../common/header';
import { IProductData } from '../partial/product';

export interface ISelectProductData {
    product: IProductData;
    header: IHeaderData
    isActive: boolean;
}

export interface ISelectProductSettings {
	onNext: () => void;
	onClose: () => void;
}