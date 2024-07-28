import { ApiListResponse } from '../../../components/base/api';

// данные для работы с API: ввод и вывод
export interface IProduct {
    _id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
};

export type IUser = {
    payment: string;
    address: string;
    email: string;
    phone: string;
};

export type OrderResponse = {
    _id: string;
    total: number;
};

// API продукта
export interface IProductAPI {
    readonly optionUrl: string;
    getProducts: () => Promise<ApiListResponse<IProduct>>;
    orderProducts: (order: IUser | ApiListResponse<string>) => Promise<OrderResponse>;
};