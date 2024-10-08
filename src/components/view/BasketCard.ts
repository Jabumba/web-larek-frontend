import { IBaseCard, ICard } from "../../types";
import { BaseCard } from "./BaseCard";

export interface ICardConstructor {
    new (template: HTMLTemplateElement): IBaseCard
}

export class BasketCard extends BaseCard implements IBaseCard {
    protected button: HTMLButtonElement;

    constructor(template: HTMLTemplateElement) {
        super(template);
        this.button = this.card.querySelector('.card__button') as HTMLButtonElement;
    }

    setEvent(event: Function) {
        this.button.addEventListener('click', (evt)  => {
            event(this);
        });
    }

    render(data: ICard): HTMLElement {
        super.render(data);
        return this.card;
    }
}