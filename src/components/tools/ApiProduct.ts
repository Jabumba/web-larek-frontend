import { IApiProduct, ICard, IOrder, ISuccessOrder } from "../../types";
import { Api, ApiListResponse } from "../base/api";

export class ApiProduct implements IApiProduct {
    api: Api;
    protected _imageAddress: string;

    constructor(api: any, address: string) {
        this.api = api;
        this.imageAddress = address;
    }

    set imageAddress(address: string) {
        this._imageAddress = address;
    }

    get imageAddress() {
        return this._imageAddress
    }

    getCards(uri: string) {
        const productResponse = this.api.get(uri) as Promise<ApiListResponse<ICard>>
        return productResponse.then((data) => {
            const cardList: ICard[] = data.items

            cardList.map((item) => {
                item.image = this.imageAddress + item.image;
                return item
            })

            return cardList
        })
    }

    postOrder(uri: string, data: IOrder) {
        const productResponse = this.api.post(uri, data) as Promise<ISuccessOrder>

        return productResponse.then((data) => {
            const successOrder: ISuccessOrder = data;
            return successOrder
        })
    }
}