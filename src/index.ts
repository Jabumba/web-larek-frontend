import './scss/styles.scss';
import { ApiListResponse, ApiPostMethods, Api } from './components/base/api';
import { ApiProduct } from './components/tools/ApiProduct';
import { API_URL, CDN_URL } from './utils/constants';
import { Model } from './components/model/Model';
import { Presenter } from './components/Presenter';
import { CatalogCard } from './components/view/CatalogCard';
import { PreviewCard } from './components/view/PreviewCard';
import { BasketCard } from './components/view/BasketCard';
import { Popup } from './components/view/Popup';
import { Basket } from './components/view/Basket';
import { IBasket } from './types';
import { Page } from './components/view/Page';
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const modalContainer = document.querySelector('#modal-container') as HTMLDivElement;
const api = new Api(API_URL);
const apiFilter = new ApiProduct(api, CDN_URL);
const model = new Model();
const modal = new Popup(modalContainer);
const basket = new Basket(basketTemplate);
const page = new Page();

const presenter = new Presenter(
    model,
    page,
    basket,
    CatalogCard,
    PreviewCard,
    BasketCard,
    modal
);

apiFilter.getCards()
.then((data) => {
    presenter.model.items = data;
    
    presenter.globalRender()
})

// localStorage.clear();