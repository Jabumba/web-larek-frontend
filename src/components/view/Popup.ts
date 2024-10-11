import { IPopup } from "../../types";

export class Popup implements IPopup {
    modal: HTMLDivElement;
    container: HTMLDivElement;
    buttonClose: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(modal: HTMLDivElement) {
        this.modal = modal;
        this.container = modal.querySelector('.modal__container');
        this.buttonClose = this.container.querySelector('.modal__close');
        this._content = this.container.querySelector('.modal__content');

        this.buttonClose.addEventListener('click', (() => {
            this.close();
        }));
        this.modal.addEventListener('click', (() => {
            this.close();
        }));
        this.container.addEventListener('click', (event) => event.stopPropagation());
    }

    set content(el: HTMLElement) {
        this._content.replaceChildren(el);
    }

    open() {
		this.modal.classList.add('modal_active');
	}

	close() {
		this.modal.classList.remove('modal_active');
		this.content = null;
	}
}