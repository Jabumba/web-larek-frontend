import { IItemView, ICard, IPopup, IBaseCard, IBasket } from '../types/index';
import { isEmpty } from '../utils/utils';
import { Model } from './model/Model';
import { ApiProduct } from './tools/ApiProduct';
import { CatalogCard, ICardConstructor } from './view/CatalogCard';
import { IPage } from './view/Page';

export class Presenter {
    catalogCardTemplate: HTMLTemplateElement;
    previewCardTemplate: HTMLTemplateElement;
    basketCardTemplate: HTMLTemplateElement;
    basketTemplate: HTMLTemplateElement;
    formOrderTemplate: HTMLTemplateElement;
    formContactsTemplate: HTMLTemplateElement;
    successTemplate: HTMLTemplateElement;

    // todoForm: IForm;
	// todoEditForm: IForm;

    constructor(
        protected api: ApiProduct,
        public model: Model,
        protected page: IPage,
        protected basket: IBasket,
		// protected formConstructor: IFormConstructor,
		protected catalogCardConstructor: ICardConstructor,
        protected previewCardConstructor: ICardConstructor,
        protected basketCardConstructor: ICardConstructor,
		protected modal: IPopup
    ) {
        this.catalogCardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
        this.previewCardTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
        this.basketCardTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
        // this.basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
        this.formOrderTemplate = document.querySelector('#order') as HTMLTemplateElement;
        this.formContactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
        this.successTemplate = document.querySelector('#success') as HTMLTemplateElement;
    }

    eventOpenCard(card: IBaseCard) {
        const openedData = this.model.getData(card.id);
        const previewCard = new this.previewCardConstructor(this.previewCardTemplate);
        for (let i = 0; i < this.model.getOrderLength(); i++) {
            const selectId = this.model.getOrder().items[i];
            if(openedData.id === selectId) {
                previewCard.card.querySelector('.card__button').setAttribute('disabled', 'true');
            }
        }
        previewCard.setEvent(this.eventAddToBasket.bind(this));

        this.modal.content = previewCard.render(openedData);
        this.modal.open();
    }

    eventAddToBasket(card: IBaseCard) {
        let addData = this.model.getData(card.id);
        // if(isEmpty(addData.price)) {
        //     addData.price = 0;
        // }

        // if(isEmpty(localStorage.getItem(addData.id))) {
        //     localStorage.setItem(addData.id, `${addData.price}`);
        // }

        this.model.addItem(addData.id);

        // this.page.basketButton.querySelector('.header__basket-counter').textContent = `${localStorage.length}`;
        this.page.basketButton.querySelector('.header__basket-counter').textContent = `${this.model.getOrderLength()}`;

        this.eventOpenCard(card);
    }

    eventDeleteFromBasket(card: IBaseCard) {
        const addData = this.model.getData(card.id);
        // localStorage.removeItem(addData.id);
        this.model.deleteItem(addData.id);
        this.eventOpenBasket();
        // this.page.basketButton.querySelector('.header__basket-counter').textContent = `${localStorage.length}`;
        this.page.basketButton.querySelector('.header__basket-counter').textContent = `${this.model.getOrderLength()}`;
    }

    eventOpenBasket() {
        this.basket.cardList.replaceChildren(' ');
        // let actualPrice: number = 0;
        // for (let i = 0; i < localStorage.length; i++) {
        //     const selectCardDataId = localStorage.key(i);
        //     const selectCardData = this.model.getData(selectCardDataId);
        //     const basketCardClass = new this.basketCardConstructor(this.basketCardTemplate);
        //     basketCardClass.setEvent(this.eventDeleteFromBasket.bind(this));
        //     const basketCard = basketCardClass.render(selectCardData);
        //     this.basket.addCard(basketCard);
        //     actualPrice += Number(localStorage.getItem(selectCardDataId));
        // }

        this.model.getOrder().items.forEach((item) => {
            const selectCardData = this.model.getData(item);
            const basketCardClass = new this.basketCardConstructor(this.basketCardTemplate);
            basketCardClass.setEvent(this.eventDeleteFromBasket.bind(this));
            const basketCard = basketCardClass.render(selectCardData);
            this.basket.addCard(basketCard);
        })

        // this.modal.content = this.basket.render(actualPrice);
        this.modal.content = this.basket.render(this.model.getOrder().total);
        this.modal.open();
    }

    globalRender() {
        this.page.setEventBasketButton(this.eventOpenBasket.bind(this));

        const itemList = this.model.items.map((item) => {
            const card = new this.catalogCardConstructor(this.catalogCardTemplate);
            card.setEvent(this.eventOpenCard.bind(this));
            const element = card.render(item);
            return element;
        })

        this.page.setCardContainer(itemList);
    }
}