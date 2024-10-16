import { Api } from "../components/base/api";

export interface IApiProduct {
    api: Api;
    imageAddress: string;
    getCards(uri: string): Promise<ICard[]>
    postOrder(uri: string, data: IOrder): Promise<ISuccessOrder>
}
export interface IPage {
    basketButton: HTMLButtonElement;
    cardContainer: HTMLElement; 

    setCardContainer(cards: HTMLElement[]): void;
    setBasketLength(length: number): void
    setEventBasketButton(event: Function): void;
}

export interface IForm {
    form: HTMLFormElement;
	submitButton: HTMLButtonElement;
	errorField: HTMLSpanElement;
    inputList: HTMLInputElement[];
	eventInput: Function;

    submitOn(): void
	submitOff(): void
    getValue(): IFormData
	setEventSubmit(event: Function): void
    setEventInput(event: Function): void
	clearValue(): void
	render(): HTMLFormElement
}

export interface IFormData{
    payment?: string;
    address?: string;
    email?: string;
    phone?: string;
}

export interface ICard {
    id: string
    description: string
    image: string
    title: string
    category: string
    price: number
}

export interface IOrder {
    payment: string
    email: string
    phone: string
    address: string
    total: number
    items: string[]
}

export interface ISuccessOrder {
    id: string
    total: number
}

export interface IBaseCard {
    card: HTMLElement;
    title: HTMLElement;
    price: HTMLSpanElement;
    id: string;

    setEvent(event: Function): void
    setIndex?(index: string): void
    changeButtonStatus?(openedData: ICard, selectId?: string): void
    render(data: ICard): HTMLElement
}

export interface IPopup {
    modal: HTMLDivElement;
    container: HTMLDivElement;
    buttonClose: HTMLButtonElement;
    content: HTMLElement;

    open(): void
    close(): void
}

export interface IBasket {
    basket: HTMLDivElement;
    cardList: HTMLElement;
    button: HTMLButtonElement;
    basketPrice: HTMLSpanElement;

    addCard(card: HTMLElement): void
    clear(): void
    changeButtonStatus(length: number): void
    setEvent(event: Function): void
    render(price: number): HTMLElement
}

export interface IOrderResult {
    orderElement: HTMLDivElement;
    totalElement: HTMLParagraphElement;
    button: HTMLButtonElement;
    
    render(total: number): HTMLDivElement
    setEvent(event: Function): void
}