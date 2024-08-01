import { IChangeable } from '../../base/view';

export interface IOrderData {
    email: string;
    phone: number;
};

export interface IOrderSettings extends IChangeable<IOrderData> {
    email: string;
    phone: number;
};