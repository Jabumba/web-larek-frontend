import { ICard } from "../../types";
import { ApiListResponse } from "../base/api";

export class ApiProduct {
    api: any;
    protected imageAddress: string;

    constructor(api: any, address: string) {
        this.api = api;
        this.imageAddress = address;
    }

    getCards() {
        const productResponse = this.api.get('/product/') as Promise<ApiListResponse<ICard>>
        return productResponse.then((data) => {
            const cardList: ICard[] = data.items

            cardList.map((item) => {
                item.image = this.imageAddress + item.image;
                return item
            })

            return cardList
        })
    }
}