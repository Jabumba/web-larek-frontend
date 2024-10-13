import { IForm, IFormData } from "../../../types";

export interface IFormConstructor {
    new (template: HTMLTemplateElement): IForm
}

export abstract class Form implements IForm {
	form: HTMLFormElement;
	submitButton: HTMLButtonElement;
	errorField: HTMLSpanElement;
	inputList: HTMLInputElement[];
	eventInput: Function;

	constructor(formTemplate: HTMLTemplateElement) {
		this.form = formTemplate.content.querySelector('.form') as HTMLFormElement;
		this.errorField = this.form.querySelector('.form__errors');
		this.inputList = [...this.form.querySelectorAll('.form__input')] as HTMLInputElement[];

		this.inputList.forEach((input) => {
			input.addEventListener('input', () => {
				this.eventInput(this.getValue());
			})
		})
	}

	submitOn() {
        this.errorField.textContent = '';
        this.submitButton.removeAttribute('disabled');
	}

	submitOff() {
		this.errorField.textContent = 'Корректно заполните все поля';
		this.submitButton.setAttribute('disabled', 'true');
	}

	abstract getValue(): IFormData

	setEventSubmit(event: Function) {
		this.form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			event();
		})
    }

	setEventInput(event: Function) {
		this.eventInput = event; 
	}

	clearValue() {
		this.form.reset();
	}

	render() {
		return this.form
	}
}