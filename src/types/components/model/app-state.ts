import 
    { 
        IProduct, 
        IOrderResponse, 
        IUser,
        IProductAPI
    }
from './product-api';

import { IBasket } from './basket-model';

import { ApiListResponse } from '../../../components/base/api';

export enum AppStateModals {
	product = 'modal:product',
	addpay = 'modal:addpay',
	basket = 'modal:basket',
	contacts = 'modal:contacts',
	success = 'modal:success',
	none = 'modal:none',
};

export enum AppStateChanges {
	products = 'change:product',
	modal = 'change:modal',
	modalMessage = 'change:modalMessage',
	selectedProduct = 'change:selectedProduct',
	basket = 'change:basket',
	order = 'change:order',
};

export interface IAppState {
    products?: IProduct[];

    basketProducts: IProduct[] | null;
    basket: IBasket;
    userSettings: IUser;
	completeOrder: IOrderResponse;
	order: IUser | ApiListResponse<string>;

    // Состояние интерфейса
	openedModal: AppStateModals;
	isOrderReady: boolean;
	modalMessage: string | null;
	isError: boolean;

    // Действия с API
	getProducts: () => Promise<ApiListResponse<IProduct>>;
    orderProducts: (order: IUser | ApiListResponse<string>) => Promise<IOrderResponse>;
    openModal(modal: AppStateModals): void;

	// Пользовательские действия
	addProduct(id: string): void;
	removeBasketProduct(id: string): void;
	fillSettings(settings: Partial<IUser>): void;
	isValidSettings(): boolean;
};

// Настройки модели данных
export interface AppStateSettings {
	formatCurrency: (value: number) => string;
	storageKey: string;
	// Функция, которая будет вызываться при изменении состояния
	onChange: (changed: AppStateChanges) => void;
};

// Конструктор модели данных
export interface AppStateConstructor {
	new (api: IProductAPI, settings: AppStateSettings): IAppState;
};