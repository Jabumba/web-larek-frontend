import './scss/styles.scss';
import { Api } from './components/base/api';
import { ApiProduct } from './components/tools/ApiProduct';
import { API_URL, CDN_URL } from './utils/constants';
import { Model } from './components/model/Model';
import { Presenter } from './components/Presenter';
import { CatalogCard } from './components/view/cards/CatalogCard';
import { PreviewCard } from './components/view/cards/PreviewCard';
import { BasketCard } from './components/view/cards/BasketCard';
import { Popup } from './components/view/Popup';
import { Basket } from './components/view/Basket';
import { Page } from './components/view/Page';
import { ContactsForm } from './components/view/forms/ContactsForm';
import { OrderForm } from './components/view/forms/OrderForm';
import { OrderResult } from './components/view/OrderResult';
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const modalContainer = document.querySelector('#modal-container') as HTMLDivElement;
const orderResultTemplate = document.querySelector('#success') as HTMLTemplateElement;

const api = new Api(API_URL);
const apiFilter = new ApiProduct(api, CDN_URL);
const model = new Model();
const modal = new Popup(modalContainer);
const basket = new Basket(basketTemplate);
const page = new Page();
const orderResult = new OrderResult(orderResultTemplate);

const presenter = new Presenter(
    apiFilter,
    model,
    page,
    basket,
    OrderForm,
    ContactsForm,
    CatalogCard,
    PreviewCard,
    BasketCard,
    modal,
    orderResult
);
presenter.init();
apiFilter.getCards('/product/')
.then((data) => {
    presenter.model.items = data;
    
    presenter.globalRender();
})
.catch((mistake) => {
    console.error(mistake);
})