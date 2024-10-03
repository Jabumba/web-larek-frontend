export interface IModel {
    items: ICard[];
    getItem(id: string): ICard;
}

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

export interface IBaseCard {
    card: HTMLElement;
    title: HTMLElement;
    price: HTMLSpanElement;
}

export interface IPopup {
    modal: HTMLDivElement;
    container: HTMLDivElement;
    buttonClose: HTMLButtonElement;
    content: HTMLElement;
}