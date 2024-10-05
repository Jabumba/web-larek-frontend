import { IModel, IItemView, ICard, IPopup, IBaseCard, IBasket } from '../types/index';
import { CatalogCard, ICardConstructor } from './view/CatalogCard';

// interface IPresenter {
//     catalogCardTemplate: HTMLTemplateElement;
//     previewCardTemplate: HTMLTemplateElement;
//     basketCardTemplate: HTMLTemplateElement;
//     basketTemplate: HTMLTemplateElement;
//     formOrderTemplate: HTMLTemplateElement;
//     formContactsTemplate: HTMLTemplateElement;
//     successTemplate: HTMLTemplateElement;

//     todoForm: IForm;
// 	todoEditForm: IForm;
// }

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
        const openedData = this.model.getItem(card.id);
        const previewCard = new this.previewCardConstructor(this.previewCardTemplate);
        previewCard.setEvent(this.eventAddToBasket.bind(this));

        // const editedItem = this.model.getItem(item.id)
        // this.todoEditForm.setValue(editedItem.name);
        // this.modal.content = this.todoEditForm.render();
        // this.todoEditForm.setHandler((data: string) => this.handleSubmitEditForm(data, item.id))
        // this.modal.open();

        this.modal.content = previewCard.render(openedData);
        this.modal.open();
    }

    eventAddToBasket(card: IBaseCard) {
        const addData = this.model.getItem(card.id);
        const basketCard = new this.basketCardConstructor(this.basketCardTemplate).render(addData);
        this.basket.addCard(basketCard);
        // const basket = new this.basketConstructor(this.basketTemplate).render(addData);
        

        // const editedItem = this.model.getItem(item.id)
        // this.todoEditForm.setValue(editedItem.name);
        // this.modal.content = this.todoEditForm.render();
        // this.todoEditForm.setHandler((data: string) => this.handleSubmitEditForm(data, item.id))
        // this.modal.open();
        this.basket.render()
        this.modal.open();
    }

    globalRender() {
        const cardContainer = document.querySelector('.gallery');

        const itemList = this.model.items.map((item) => {
            const card = new this.catalogCardConstructor(this.catalogCardTemplate);
            card.setEvent(this.eventOpenCard.bind(this));
            // todoItem.setEditHandler(this.handleEditItem.bind(this))
            const element = card.render(item);
            return element;
        })

        cardContainer.replaceChildren(...itemList);
    }
}