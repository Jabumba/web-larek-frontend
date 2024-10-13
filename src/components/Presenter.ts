import { IPopup, IBaseCard, IBasket, IForm, IOrderResult, IPage, IFormData } from '../types/index';
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
        this.orderForm.setEventInput(this.eventOrderInput.bind(this));
        this.orderForm.setEventSubmit(this.eventSubmitOrderForm.bind(this));

        this.contactsForm = new this.contactsFormConstructor(this.contactsFormTemplate);
        this.contactsForm.setEventInput(this.eventContactsInput.bind(this));
        this.contactsForm.setEventSubmit(this.eventSubmitContactsForm.bind(this));

        this.orderResult.setEvent(() => {
            this.modal.close()
        })
    }

    eventOrderInput(data: IFormData) {
        if(this.model.isValid(data)) {
            this.orderForm.submitOn();
        } else {
            this.orderForm.submitOff();
        }
    }

    eventContactsInput(data: IFormData) {
        if(this.model.isValid(data as Object)) {
            this.contactsForm.submitOn();
        } else {
            this.contactsForm.submitOff();
        }
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
            this.modal.content = this.orderResult.render(data.total)
            this.modal.open();
        })
        .catch((error) => {
            console.error(error);
        })

        this.model.clear();
        this.orderForm.clearValue();
        this.contactsForm.clearValue();
        this.page.setBasketLength(this.model.getOrderLength());
    }

    eventOpenCard(card: IBaseCard) {
        const openedData = this.model.getData(card.id);
        const previewCard = new this.previewCardConstructor(this.previewCardTemplate);
        for (let i = 0; i < this.model.getOrderLength(); i++) {
            const selectId = this.model.getOrder().items[i];
            previewCard.changeButtonStatus(openedData, selectId);
        }
        previewCard.changeButtonStatus(openedData);

        previewCard.setEvent(this.eventAddToBasket.bind(this));

        this.modal.content = previewCard.render(openedData);
        this.modal.open();
    }

    eventAddToBasket(card: IBaseCard) {
        this.model.addItem(card.id);
        this.page.setBasketLength(this.model.getOrderLength());

        this.eventOpenCard(card);
    }

    eventDeleteFromBasket(card: IBaseCard) {
        this.model.deleteItem(card.id);
        this.eventOpenBasket();
        this.page.setBasketLength(this.model.getOrderLength());
    }

    eventOpenBasket() {
        this.basket.clear();

        this.model.getOrder().items.forEach((item, index) => {
            const selectCardData = this.model.getData(item);
            const basketCardClass = new this.basketCardConstructor(this.basketCardTemplate);
            basketCardClass.setIndex((index += 1).toString());
            basketCardClass.setEvent(this.eventDeleteFromBasket.bind(this));
            const basketCard = basketCardClass.render(selectCardData);
            this.basket.addCard(basketCard);
        })

        this.basket.setEvent(this.eventOpenOrderForm.bind(this));

        this.basket.changeButtonStatus(this.model.getOrderLength());

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