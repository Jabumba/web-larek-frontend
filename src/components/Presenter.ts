import { IPopup, IBaseCard, IBasket, IForm } from '../types/index';
import { isEmpty } from '../utils/utils';
import { Model } from './model/Model';
import { ApiProduct } from './tools/ApiProduct';
import { ICardConstructor } from './view/CatalogCard';
import { IFormConstructor } from './view/Form';
import { IPage } from './view/Page';

export class Presenter {
    catalogCardTemplate: HTMLTemplateElement;
    previewCardTemplate: HTMLTemplateElement;
    basketCardTemplate: HTMLTemplateElement;
    basketTemplate: HTMLTemplateElement;
    orderFormTemplate: HTMLTemplateElement;
    contactsFormTemplate: HTMLTemplateElement;
    successTemplate: HTMLTemplateElement;

    protected orderForm: IForm;
	protected contactsForm: IForm;

    constructor(
        protected api: ApiProduct,
        public model: Model,
        protected page: IPage,
        protected basket: IBasket,
		protected orderFormConstructor: IFormConstructor,
        protected contactsFormConstructor: IFormConstructor,
		protected catalogCardConstructor: ICardConstructor,
        protected previewCardConstructor: ICardConstructor,
        protected basketCardConstructor: ICardConstructor,
		protected modal: IPopup
    ) {
        this.catalogCardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
        this.previewCardTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
        this.basketCardTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
        this.basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
        this.orderFormTemplate = document.querySelector('#order') as HTMLTemplateElement;
        this.contactsFormTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
        this.successTemplate = document.querySelector('#success') as HTMLTemplateElement;
    }

    init() {
        this.orderForm = new this.orderFormConstructor(this.orderFormTemplate);
        this.orderForm.setSubmitEvent(this.eventSubmitOrderForm.bind(this));

        this.contactsForm = new this.contactsFormConstructor(this.contactsFormTemplate);
        this.contactsForm.setSubmitEvent(this.eventSubmitContactsForm.bind(this));
    }

    eventSubmitOrderForm() {
        if(this.orderForm.isValidForm()) {
            
        } else {
            this.orderForm.errorField.textContent = 'заполните все поля';
        }
    }

    eventSubmitContactsForm() {
        if(this.contactsForm.isValidForm()) {
            
        }
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

        this.model.addItem(addData.id);

        this.page.basketButton.querySelector('.header__basket-counter').textContent = `${this.model.getOrderLength()}`;

        this.eventOpenCard(card);
    }

    eventDeleteFromBasket(card: IBaseCard) {
        const addData = this.model.getData(card.id);
        this.model.deleteItem(addData.id);
        this.eventOpenBasket();
        this.page.basketButton.querySelector('.header__basket-counter').textContent = `${this.model.getOrderLength()}`;
    }

    eventOpenBasket() {
        this.basket.cardList.replaceChildren(' ');

        this.model.getOrder().items.forEach((item) => {
            const selectCardData = this.model.getData(item);
            const basketCardClass = new this.basketCardConstructor(this.basketCardTemplate);
            basketCardClass.setEvent(this.eventDeleteFromBasket.bind(this));
            const basketCard = basketCardClass.render(selectCardData);
            this.basket.addCard(basketCard);
        })

        this.basket.setEvent(this.eventOpenOrderForm.bind(this));

        if(this.model.getOrderLength() === 0) {
            this.basket.button.setAttribute('disabled', 'true');
        } else {
            this.basket.button.removeAttribute('disabled');
        }

        this.modal.content = this.basket.render(this.model.getOrder().total);
        this.modal.open();
    }

    eventOpenOrderForm() {
        this.modal.content = this.orderForm.render();
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