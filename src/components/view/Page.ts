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

    setBasketLength(length: number) {
        this.basketButton.querySelector('.header__basket-counter').textContent = `${length}`;
    }

    setEventBasketButton(event: Function) {
        this.basketButton.addEventListener('click', (() => {
            event()
        }))
    }
}