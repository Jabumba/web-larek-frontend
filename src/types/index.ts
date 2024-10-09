import { ApiListResponse } from "../components/base/api";

export interface IApiProduct {
    api: any;
    imageAddress: string;
    getCards(uri: string): Promise<ICard[]>;
    postOrder(uri: string, data: IOrder): Promise<ISuccessOrder>;
}

export interface IForm {
    form: HTMLFormElement;
	submitButton: HTMLButtonElement;
	errorField: HTMLSpanElement;
	inputList: HTMLInputElement[];

    getValue(): string;

	setSubmitEvent(event: Function): void;

	clearValue(): void;

	isValid(): void;

	render(): HTMLFormElement;
}

// export interface IModel {
//     items: ICard[];
//     getData(id: string): ICard;
// }

export interface IItemView {
    element: HTMLElement;
    category?: HTMLSpanElement;
    title: HTMLHRElement;
    description?: HTMLParagraphElement;
    image?: HTMLImageElement;
    price: HTMLSpanElement;

    render(data: ICard): HTMLElement;
}

export interface ICard {
    id: string,
    description: string,
    image: string,
    title: string,
    category: string,
    price: number
}

export interface IOrder {
    payment: string,
    email: string,
    phone: string,
    address: string,
    total: number,
    items: string[]
}

export interface ISuccessOrder {
    id: string,
    total: number
}

export interface IBaseCard {
    card: HTMLElement;
    title: HTMLElement;
    price: HTMLSpanElement;
    id: string;

    setEvent(event: Function): void;
    render(data: ICard): HTMLElement
}

export interface IPopup {
    modal: HTMLDivElement;
    container: HTMLDivElement;
    buttonClose: HTMLButtonElement;
    content: HTMLElement;

    open(): void;
    close(): void;
}

export interface IBasket {
    basket: HTMLDivElement;
    cardList: HTMLElement;
    button: HTMLButtonElement;
    basketPrice: HTMLSpanElement;

    addCard(card: HTMLElement): void;
    setEvent(event: Function): void;
    render(price: number): HTMLElement; 
}