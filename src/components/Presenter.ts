import { IModel, IItemView, ICard, IPopup } from '../types/index';
import { CatalogCard, ICatalogCardConstructor } from './view/CatalogCard';

export class Presenter {
    protected _model: IModel;
    protected popup: IPopup;

    protected catalogContainer: HTMLElement;
    protected catalogCardTemplate: HTMLTemplateElement;

    constructor(
        protected catalogCardConstructor: ICatalogCardConstructor
    ) {
        this.catalogContainer = document.querySelector('.gallery');
        this.catalogCardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
    }

    get model() {
        return this._model;
    }

    set model(model: IModel) {
        this._model = model;
    }

    globalRender() {
        this.model.items.forEach(item => {
            const element = new this.catalogCardConstructor(this.catalogCardTemplate);
            this.catalogContainer.append(element.render(item));
        })
    }
}