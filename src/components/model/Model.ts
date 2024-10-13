import { ICard, IFormData, IOrder } from "../../types";
import { isEmpty } from "../../utils/utils";

export class Model {
    protected _items: ICard[];
    private order: IOrder;

    constructor() {
        this._items = [];
        this.order = {
            payment: '',
            email: '',
            phone: '',
            address: '',
            total: 0,
            items: []
        };
    }

    set items(data: ICard[]) {
        this._items = data;
    }

    get items() {
        return this._items
    }

    setPayment(payment: string) {
        if(!isEmpty(payment)) {
            this.order.payment = payment;
        }
    }
    
    setEmail(email: string) {
        this.order.email = email;
    }
    
    setPhone(phone: any) {
        this.order.phone = phone;
    }

    setAddress(address: string) {
        this.order.address = address;
    }

    addItem(orderItem: string) {
        if(this.order.items.includes(orderItem) === false) {
            this.order.items.push(orderItem);
        }

        this.changeTotal();
    }

    deleteItem(orderItem: string) {
        const correctArray = this.order.items.filter((item) => item !== orderItem);

        this.order.items = correctArray;

        this.changeTotal();
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

    getOrder() {
        return this.order
    }

    clear() {
        this.order = {
            payment: '',
            email: '',
            phone: '',
            address: '',
            total: 0,
            items: []
        };
    }

    isValid(obj: IFormData) {
        let booleanArray: string[] = [];
        Object.keys(obj).forEach((key) => {
            if(isEmpty(obj[key as keyof typeof obj]) || obj[key as keyof typeof obj] === '') {
                booleanArray.push('false');
            } else {
                booleanArray.push('true');
            }
        })

        if(booleanArray.includes('false')) {
            return false
        } else {
            return true
        }
    }

    getData(id: string) {
        return this._items.find(item => item.id === id);
    }
}