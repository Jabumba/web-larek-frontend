import { IModel, IItemView, ICard, IPopup, IBaseCard } from '../types/index';
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
		// protected formConstructor: IFormConstructor,
		protected catalogCardConstructor: ICardConstructor,
        protected previewCardConstructor: ICardConstructor,
        // protected basketCardConstructor: ICardConstructor,
		protected modal: IPopup
    ) {
        this.catalogCardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
        this.previewCardTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
        this.basketCardTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
        this.basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
        this.formOrderTemplate = document.querySelector('#order') as HTMLTemplateElement;
        this.formContactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
        this.successTemplate = document.querySelector('#success') as HTMLTemplateElement;
    }

    eventOpenCard(card: IBaseCard) {
        const openedData = this.model.getItem(card.id);
        const previewCard = new this.previewCardConstructor(this.previewCardTemplate).render(openedData);
        

        // const editedItem = this.model.getItem(item.id)
        // this.todoEditForm.setValue(editedItem.name);
        // this.modal.content = this.todoEditForm.render();
        // this.todoEditForm.setHandler((data: string) => this.handleSubmitEditForm(data, item.id))
        // this.modal.open();

        this.modal.content = previewCard;
        this.modal.open();
    }

    globalRender() {
        // this.model.items.forEach(item => {
        //     const element = new this.cardConstructor(this.catalogCardTemplate);
        //     this.catalogContainer.append(element.render(item));
        // })
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