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
const modalContainer = document.querySelector('#modal-container') as HTMLDivElement;
const api = new Api(API_URL);
const apiFilter = new ApiProduct(api, CDN_URL);
const model = new Model();
const modal = new Popup(modalContainer);
const presenter = new Presenter(
    model, 
    CatalogCard,
    PreviewCard,
    modal
);

apiFilter.getCards()
.then((data) => {
    presenter.model.items = data;
    
    presenter.globalRender()
})