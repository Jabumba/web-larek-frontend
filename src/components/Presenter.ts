import { IPopup, IBaseCard, IBasket, IForm, IOrderResult, IPage } from '../types/index';
import { isEmpty } from '../utils/utils';
import { Model } from './model/Model';
import { ApiProduct } from './tools/ApiProduct';
import { ICardConstructor } from './view/cards/CatalogCard';
import { IFormConstructor } from './view/forms/Form';

export class Presenter {
    catalogCardTemplate: HTMLTemplateElement;
    previewCardTemplate: HTMLTemplateElement;
    basketCardTemplate: HTMLTemplateElement;
    basketTemplate: HTMLTemplateElement;
    orderFormTemplate: HTMLTemplateElement;
    contactsFormTemplate: HTMLTemplateElement;

    protected orderForm: IForm;
	protected contactsForm: IForm;

    constructor(
        protected apiProduct: ApiProduct,
        public model: Model,
        protected page: IPage,
        protected basket: IBasket,
		protected orderFormConstructor: IFormConstructor,
        protected contactsFormConstructor: IFormConstructor,
		protected catalogCardConstructor: ICardConstructor,
        protected previewCardConstructor: ICardConstructor,
        protected basketCardConstructor: ICardConstructor,
		protected modal: IPopup,
        protected orderResult: IOrderResult
    ) {
        this.catalogCardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
        this.previewCardTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
        this.basketCardTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
        this.basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
        this.orderFormTemplate = document.querySelector('#order') as HTMLTemplateElement;
        this.contactsFormTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
    }

    init() {
        this.orderForm = new this.orderFormConstructor(this.orderFormTemplate);
        this.orderForm.setEventSubmit(this.eventSubmitOrderForm.bind(this));

        this.contactsForm = new this.contactsFormConstructor(this.contactsFormTemplate);
        this.contactsForm.setEventSubmit(this.eventSubmitContactsForm.bind(this));
    }

    eventOpenOrderForm() {
        this.modal.content = this.orderForm.render();
        this.modal.open();
    }

    eventOpenContactsForm() {
        this.modal.content = this.contactsForm.render();
        this.modal.open();
    }

    eventSubmitOrderForm() {
        const orderData = this.orderForm.getValue();
        this.model.setPayment(orderData.payment);
        this.model.setAddress(orderData.address);
        this.eventOpenContactsForm();
    }

    eventSubmitContactsForm() {
        const contactsData = this.contactsForm.getValue();
        this.model.setEmail(contactsData.email);
        this.model.setPhone(contactsData.phone);
        this.eventOpenOrderResult();
    }

    eventOpenOrderResult() {
        this.apiProduct.postOrder('/order', this.model.getOrder())
        .then((data) => {
            this.orderResult.button.addEventListener('click', () => {
                this.modal.close()
            })
            this.modal.content = this.orderResult.render(data.total)
            this.modal.open();
        })
        .catch((error) => {
            console.error(error);
        })

        this.model.clear();
        this.page.basketButton.querySelector('.header__basket-counter').textContent = `0`;
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

        if(isEmpty(openedData.price)) {
            previewCard.card.querySelector('.card__button').setAttribute('disabled', 'true');
            previewCard.card.querySelector('.card__button').textContent = 'Бесценно';
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

        this.model.getOrder().items.forEach((item, index) => {
            const selectCardData = this.model.getData(item);
            const basketCardClass = new this.basketCardConstructor(this.basketCardTemplate);
            basketCardClass.setIndex((index += 1).toString());
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