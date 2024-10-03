import { IModel, IItemView, ICard } from '../types/index';
import { ItemCatalogView } from './view/ItemCatalogView';
import { IPopupView } from './view/PopupView';

// export interface IPresenter {
//     model: IModel;
//     popup: IPopupView;

//     itemView: IItemView;

//     catalogContainer: HTMLElement;
//     cardCatalogTemplate: HTMLTemplateElement;

//     globalRender(): void;
// }

export class Presenter {
    protected model: IModel;
    protected popup: IPopupView;

    protected itemView:IItemView;

    protected catalogContainer: HTMLElement
    protected cardCatalogTemplate: HTMLTemplateElement;

    constructor(model: IModel) {
        this.model = model;
        this.catalogContainer = document.querySelector('.gallery');
        this.cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
    }

    globalRender() {
        this.model.items.forEach(item => {
            const element = new ItemCatalogView(this.cardCatalogTemplate);
            this.catalogContainer.append(element.render(item));
        })
    }
}