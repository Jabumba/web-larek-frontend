import { IPopup } from "../../types";

export class Popup implements IPopup {
    protected modal: HTMLDivElement;
    protected container: HTMLDivElement;
    protected buttonClose: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(modal: HTMLDivElement) {
        this.modal = modal;
        this.container = modal.querySelector('.modal__container');
        this.buttonClose = modal.querySelector('.modal__close');
        this._content = modal.querySelector('.modal__content');

        this.buttonClose.addEventListener('click', this.changeVisibility.bind(this));
        this.modal.addEventListener('click', this.changeVisibility.bind(this));
    }

    set content(el: HTMLElement) {
        this._content.replaceChildren(el);
    }

    get content() {
        return this._content;
    }

    changeVisibility() {
        this.container.classList.toggle('modal_active')
    }

    // open() {
	// 	this.container.classList.add('modal_active');
	// }

	// close() {
	// 	this.container.classList.remove('modal_active');
	// 	this.content = null;
	// }
}