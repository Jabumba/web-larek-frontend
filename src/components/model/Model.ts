import { ICard, IOrder } from "../../types";

class Order {
    public payment: string;
    public email: string;
    public phone: string;
    public address: string;
    public total: number;
    public items: string[];

    constructor() {
        this.total = 0;
        this.items = []
    }
}

export class Model {
    protected _items: ICard[];
    private order: Order;

    constructor() {
        this._items = [];
        this.order = new Order();
    }

    set items(data: ICard[]) {
        this._items = data;
    }

    get items() {
        return this._items
    }

    public setPayment(payment: string) {
        this.order.payment = payment;
    
        return this
    }
    
    public setEmail(email: string) {
        this.order.email = email;
        
        return this
    }
    
    public setPhone(phone: string) {
        this.order.phone = phone;
        
        return this
    }

    public setAddress(address: string) {
        this.order.address = address;
        
        return this
    }

    public setTotal(total: number) {
        this.order.total = total;
        return this
    }

    public addItem(orderItem: string) {
        if(this.order.items.includes(orderItem) === false) {
            this.order.items.push(orderItem);
        }

        this.changeTotal();
        
        return this
    }

    public deleteItem(orderItem: string) {
        const correctArray = this.order.items.filter((item) => item !== orderItem);

        this.order.items = correctArray;

        this.changeTotal();

        return this
    }

    getOrderLength() {
        return this.order.items.length
    }

    changeTotal() {
        let actualPrice = 0;
        this.order.items.forEach((item) => {
            actualPrice += this.getData(item).price;
        })
        this.order.total = actualPrice;
    }

    public getOrder(): Order {
        return this.order
    }

    getData(id: string) {
        return this._items.find(item => item.id === id);
    }
}