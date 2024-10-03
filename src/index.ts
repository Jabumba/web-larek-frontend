import './scss/styles.scss';
import { ApiListResponse, ApiPostMethods, Api } from './components/base/api';
import { ApiProduct } from './components/tools/ApiProduct';
import { API_URL, CDN_URL } from './utils/constants';
// import { Model } from './components/model/Model';
// import { Presenter } from './components/Presenter';
import { ICard } from './types';
console.log(API_URL, CDN_URL)
// const api = new Api(API_URL);
// const apiFilter = new ApiProduct(api, CDN_URL);
// const model = new Model();


let cardList: ICard[];
const api = new Api(API_URL);
const apiFilter = new ApiProduct(api, CDN_URL);

apiFilter.getCards()
.then((data) => {
    cardList = data;
})

console.log(cardList);

// setTimeout(() => {
//     console.log('прошло 3 секунды');
//     console.log(cardList);
// }, 3000)

// setTimeout(() => {
//     console.log(model.items);
// }, 10000);

// const productResponse = ApiFilter.get();
// productResponse.then((data) =>{
//     const cardList: ICard[] = data;
//     model.items = cardList;
//     console.log(model.items);
// })

// console.log(model.items);
// setTimeout(() => {
//     console.log(model.items);
// }, 2000);

// presenter = new Presenter(model);
// presenter.globalRender();