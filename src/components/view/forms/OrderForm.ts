import { IForm } from "../../../types";
import { Form } from "./Form";

export class OrderForm extends Form implements IForm {
	protected inputAddressField: HTMLInputElement;
	protected buttonPayment: HTMLButtonElement[];

	constructor(formTemplate: HTMLTemplateElement) {
		super(formTemplate);
		this.inputAddressField = this.form.querySelector('.form__input');
		this.buttonPayment = [...this.form.querySelectorAll('.button_alt')] as HTMLButtonElement[];
		this.submitButton = this.form.querySelector('.order__button');
		
		this.buttonPayment[0].classList.add('button_alt-active');

		this.buttonPayment.forEach((button) => {
			button.addEventListener('click', () => {
				const activeButton = this.form.querySelector('.button_alt-active');
				activeButton.classList.remove('button_alt-active');

				button.classList.add('button_alt-active');
			})
		})

		this.submitButton.addEventListener('submit', (evt) => {
			console.log('форма');
			evt.preventDefault()
			this.eventSubmit();
		})
	}

	isValidForm() {
		return this.inputAddressField.value.length !== 0 ? true : false
	}

	getValue() {
		return {
			payment: this.form.querySelector('.button_alt-active').textContent,
			address: String(this.inputAddressField.value)
		}
	}
}