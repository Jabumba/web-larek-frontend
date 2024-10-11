import { IBaseCard, ICard } from "../../types";
import { BaseCard } from "./BaseCard";

export interface ICardConstructor {
    new (template: HTMLTemplateElement): IBaseCard
}

export class BasketCard extends BaseCard implements IBaseCard {
    protected index: HTMLSpanElement;
    protected button: HTMLButtonElement;

    constructor(template: HTMLTemplateElement) {
        super(template);
        this.button = this.card.querySelector('.card__button') as HTMLButtonElement;
        this.index = this.card.querySelector('.basket__item-index') as HTMLSpanElement;
    }

    setIndex(index: string) {
        this.index.textContent = index;
    }

    setEvent(event: Function) {
        this.button.addEventListener('click', (evt)  => {
            event(this);
        });
    }

    render(data: ICard) {
        super.render(data);
        return this.card;
    }
}