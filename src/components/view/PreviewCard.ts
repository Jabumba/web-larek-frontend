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
            event(this);
        }))
    }

    render(data: ICard): HTMLElement {
        super.render(data);

        this.category.textContent = data.category;
        this.image.src = `${data.image}`;

        // for (let i = 0; i < localStorage.length; i++) {
        //     const selectCardDataId = localStorage.key(i);
        //     if(this._id === selectCardDataId) {
        //         this.button.setAttribute('disabled', 'true');
        //     }
        // }

        switch (data.category) {
            case 'софт-скил':
                this.category.classList.remove('card__category_other');
                this.category.classList.add('card__category_soft');
                break;
            case 'дополнительное':
                this.category.classList.remove('card__category_other');
                this.category.classList.add('card__category_additional');
                break
            case 'кнопка':
                this.category.classList.remove('card__category_other');
                this.category.classList.add('card__category_button');
                break
            case 'хард-скил':
                this.category.classList.remove('card__category_other');
                this.category.classList.add('card__category_hard');
                break;
        }

        return this.card;
    }
}