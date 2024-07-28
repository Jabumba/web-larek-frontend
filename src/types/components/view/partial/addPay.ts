import { IChangeable } from '../../base/view';

export interface IAddPayData {
    payment: string
    address: string
}

export interface IAddPaySettings extends IChangeable<IAddPayData> {
    payment: string
    address: string
}