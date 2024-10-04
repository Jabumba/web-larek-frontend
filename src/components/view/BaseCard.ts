import { IBaseCard, ICard } from "../../types";

export abstract class BaseCard implements IBaseCard {
    card: HTMLElement;
    title: HTMLElement;
    price: HTMLSpanElement;

    constructor(template: HTMLTemplateElement) {
        this.card = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
        this.title = this.card.querySelector('.card__title') as HTMLElement;
        this.price = this.card.querySelector('.card__price') as HTMLSpanElement;
    }

    abstract setEvent(event: Function): void

    render(data: ICard): HTMLElement {
        this.title.textContent = data.title;
        this.price.textContent = `${data.price}`;

        return this.card;
    }
}