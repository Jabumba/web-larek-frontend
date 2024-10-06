import { IModel, ICard } from "../../types";

export class Model implements IModel {
    protected _items: ICard[];

    constructor() {
        this._items = [];
    }

    set items(data: ICard[]) {
        this._items = data;
    }

    get items() {
        return this._items;
    }

    getData(id: string) {
        return this._items.find(item => item.id === id)
    }
}