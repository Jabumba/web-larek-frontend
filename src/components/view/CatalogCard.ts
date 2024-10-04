import { IBaseCard, ICard } from "../../types";
import { BaseCard } from "./BaseCard";

export interface ICardConstructor {
    new (template: HTMLTemplateElement): IBaseCard
}

export class CatalogCard extends BaseCard implements IBaseCard {
    protected category: HTMLSpanElement;
    protected image: HTMLImageElement;

    constructor(template: HTMLTemplateElement) {
        super(template);

        this.category = this.card.querySelector('.card__category') as HTMLSpanElement;
        this.image = this.card.querySelector('.card__image') as HTMLImageElement;
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