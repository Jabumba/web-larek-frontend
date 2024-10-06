import { IModel, IItemView, ICard, IPopup, IBaseCard, IBasket } from '../types/index';
import { isEmpty } from '../utils/utils';
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
        public model: IModel,
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
        previewCard.setEvent(this.eventAddToBasket.bind(this));

        this.modal.content = previewCard.render(openedData);
        this.modal.open();
    }

    eventAddToBasket(card: IBaseCard) {
        const addData = this.model.getData(card.id);
        if(isEmpty(localStorage.getItem(addData.id))) {
            localStorage.setItem(addData.id, `${addData.price}`);
        }
        // if(isEmpty(localStorage.getItem(addData.id))) {
        //     localStorage.setItem(addData.id, addData.id);
        // }
    }

    eventDeleteFromBasket(card: IBaseCard) {
        const addData = this.model.getData(card.id);
        localStorage.removeItem(addData.id);
        this.eventOpenBasket();
    }

    eventOpenBasket() {
        this.basket.cardList.replaceChildren(' ');
        let actualPrice: number = 0;
        for (let i = 0; i < localStorage.length; i++) {
            // const selectCardDataId = localStorage.getItem(localStorage.key(i));
            const selectCardDataId = localStorage.key(i);
            const selectCardData = this.model.getData(selectCardDataId);
            const basketCard = new this.basketCardConstructor(this.basketCardTemplate);
            basketCard.setEvent(this.eventDeleteFromBasket.bind(this));
            this.basket.addCard(basketCard.render(selectCardData));
            actualPrice += Number(localStorage.getItem(selectCardDataId));
        }
        this.modal.content = this.basket.render(actualPrice);
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