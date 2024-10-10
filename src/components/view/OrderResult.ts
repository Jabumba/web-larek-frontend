import { IOrderResult } from "../../types";

export class OrderResult implements IOrderResult {
    orderElement: HTMLDivElement;
    totalElement: HTMLParagraphElement;
    button: HTMLButtonElement;

    constructor(template: HTMLTemplateElement) {
        this.orderElement = template.content.querySelector('.order-success');
        this.totalElement = this.orderElement.querySelector('.order-success__description');
        this.totalElement.textContent = '';
        this.button = this.orderElement.querySelector('.button');
    }

    render(total: number) {
        this.totalElement.textContent = `Списано ${total} синапсов`
        return this.orderElement
    }
}