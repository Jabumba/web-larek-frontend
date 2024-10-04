import './scss/styles.scss';
import { ApiListResponse, ApiPostMethods, Api } from './components/base/api';
import { ApiProduct } from './components/tools/ApiProduct';
import { API_URL, CDN_URL } from './utils/constants';
import { Model } from './components/model/Model';
import { Presenter } from './components/Presenter';
import { ICard } from './types';
import { CatalogCard } from './components/view/CatalogCard';
import { PreviewCard } from './components/view/PreviewCard';
import { BasketCard } from './components/view/BasketCard';
console.log(API_URL, CDN_URL)
const api = new Api(API_URL);
const apiFilter = new ApiProduct(api, CDN_URL);
const model = new Model();
const presenter = new Presenter(model, CatalogCard, PreviewCard, BasketCard);

apiFilter.getCards()
.then((data) => {
    model.items = data;
    presenter.model = model;
    
    presenter.globalRender()
})