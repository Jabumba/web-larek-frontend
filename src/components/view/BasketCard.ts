import { ICard } from "../../types";
import { Card } from "./BaseCard";

export class BasketCard extends Card {
    protected button: HTMLButtonElement;

    constructor(template: HTMLTemplateElement) {
        super(template);
        // this.card = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
        // this.title = this.card.querySelector('.card__title') as HTMLHRElement;
        // this.price = this.card.querySelector('.card__price') as HTMLSpanElement;
        this.button =  this.card.querySelector('.card__button') as HTMLButtonElement;
    }

    setEvent(event: Function) {
        this.button.addEventListener('click', (evt)  => {
            event();
        });
    }

    render(data: ICard) {
        super.render(data);
        return this.card;
    }
}