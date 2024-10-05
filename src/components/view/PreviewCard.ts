import { IBaseCard, ICard } from "../../types";
import { BaseCard } from "./BaseCard";

export class PreviewCard extends BaseCard implements IBaseCard {
    protected category: HTMLSpanElement;
    protected image: HTMLImageElement;
    protected description: HTMLParagraphElement;
    protected button: HTMLButtonElement;

    constructor(template: HTMLTemplateElement) {
        super(template);

        this.category = this.card.querySelector('.card__category') as HTMLSpanElement;
        this.image = this.card.querySelector('.card__image') as HTMLImageElement;
        this.description = this.card.querySelector('.card__text') as HTMLParagraphElement;
        this.button = this.card.querySelector('.card__button') as HTMLButtonElement;
    }

    setEvent(event: Function) {
        this.card.addEventListener('click', ((evt) => {
            event();
        }))
    }

    render(data: ICard): HTMLElement {
        super.render(data);

        this.category.textContent = data.category;
        this.image.src = `${data.image}`;

        return this.card;
    }
}