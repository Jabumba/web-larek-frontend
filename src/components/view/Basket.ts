import { IBaseCard, IBasket } from "../../types";

// export interface IBasketConstructor {
//     new (template: HTMLTemplateElement): IBasket
// }

export class Basket implements IBasket {
    basket: HTMLDivElement;
    cardList: HTMLUListElement;
    button: HTMLButtonElement;
    basketPrice: HTMLSpanElement;

    constructor(template: HTMLTemplateElement) {
        this.basket = template.content.querySelector('.basket') as HTMLDivElement;
        this.cardList = this.basket.querySelector('.basket__list') as HTMLUListElement;
        this.button = this.basket.querySelector('.button') as HTMLButtonElement;
        this.basketPrice = this.basket.querySelector('.basket__price') as HTMLSpanElement;
        this.basketPrice.textContent = ' ';
    }

    addCard(card: HTMLElement) {
        this.cardList.append(card);
    }

    setEvent(event: Function) {
        this.button.addEventListener('click', (() => {
            event(this);
        }))
    }

    render(price: number): HTMLElement {
        this.basketPrice.textContent = `${price} синапсов`
        return this.basket;
    }
}