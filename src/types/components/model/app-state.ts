import 
    { 
        IProduct, 
        OrderResponse, 
        IUser,
        IProductAPI
    }
from './product-api';

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
    products?: Map<string, IProduct>;

    selectedProducts: Map<string, IProduct>;
	basketTotal: number;
	basketPrice: number;
    userSettings: IUser;
	completeOrder: OrderResponse;
	order: IUser | ApiListResponse<string>;

    // Состояние интерфейса
	openedModal: AppStateModals;
	isOrderReady: boolean;
	modalMessage: string | null;
	isError: boolean;

    // Действия с API
	getProducts: () => Promise<ApiListResponse<IProduct>>;
    orderProducts: (order: IUser | ApiListResponse<string>) => Promise<OrderResponse>;

	// Пользовательские действия
	selectProduct(id: string): void;
	removeProduct(id: string): void;
	fillSettings(settings: Partial<IUser>): void;
	isValidSettings(): boolean;

	// Методы для работы с модальными окнами
	openModal(modal: AppStateModals): void;
	setMessage(message: string | null, isError: boolean): void;
};

// Настройки модели данных
export interface IAppStateSettings {
	formatCurrency: (value: number) => string;
	storageKey: string;
	// Функция, которая будет вызываться при изменении состояния
	onChange: (changed: AppStateChanges) => void;
};

export interface IAppStateConstructor {
	new (api: IProductAPI, settings: IAppStateSettings): IAppState;
};