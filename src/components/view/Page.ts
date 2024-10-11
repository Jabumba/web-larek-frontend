import { IPage } from "../../types";

export class Page implements IPage {
    basketButton: HTMLButtonElement;
    cardContainer: HTMLElement;

    constructor() {
        this.basketButton = document.querySelector('.header__basket');
        this.cardContainer = document.querySelector('.gallery');
    }

    setCardContainer(cards: HTMLElement[]) {
        this.cardContainer.replaceChildren(...cards);
    }

    setEventBasketButton(event: Function) {
        this.basketButton.addEventListener('click', (() => {
            event()
        }))
    }
}