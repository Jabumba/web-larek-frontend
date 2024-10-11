import { IBaseCard, ICard } from "../../../types";

export abstract class BaseCard implements IBaseCard {
    card: HTMLElement;
    title: HTMLElement;
    price: HTMLSpanElement;
    protected _id: string;

    constructor(template: HTMLTemplateElement) {
        this.card = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
        this.title = this.card.querySelector('.card__title') as HTMLElement;
        this.price = this.card.querySelector('.card__price') as HTMLSpanElement;
    }

    set id(value: string) {
        this._id = value;
    }

    get id(): string {
        return this._id;
    }

    abstract setEvent(event: Function): void

    render(data: ICard): HTMLElement {
        this._id = data.id;
        this.title.textContent = data.title;
        if(data.price !== null) {
            this.price.textContent = `${data.price} синапсов`;
        } else {
            this.price.textContent = 'Бесценно';
        }
        return this.card;
    }
}