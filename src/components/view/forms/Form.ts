import { IForm } from "../../../types";

export interface IFormConstructor {
    new (template: HTMLTemplateElement): IForm
}

export abstract class Form implements IForm {
	form: HTMLFormElement;
	submitButton: HTMLButtonElement;
	errorField: HTMLSpanElement;
	inputList: HTMLInputElement[];
	eventSubmit: Function;
	eventInput: Function;

	constructor(formTemplate: HTMLTemplateElement) {
		this.form = formTemplate.content.querySelector('.form') as HTMLFormElement;
		this.errorField = this.form.querySelector('.form__errors');
		this.inputList = [...this.form.querySelectorAll('.form__input')] as HTMLInputElement[];

		// this.inputList.forEach((input) => {
		// 	input.addEventListener('input', () => {
		// 		if(this.isValidForm()) {
		// 			this.submitButton.removeAttribute('onclick'); 
		// 			this.errorField.textContent = '';
		// 			this.submitButton.removeAttribute('disabled');
		// 			this.submitButton.onclick = (evt) => {
		// 				evt.preventDefault();
		// 				this.eventSubmit();
		// 			}
		// 		} else {
		// 			this.errorField.textContent = 'Заполните все поля';
		// 			this.submitButton.setAttribute('disabled', 'true');
		// 		}
		// 	})
		// })

		this.inputList.forEach((input) => {
			input.addEventListener('input', () => {
				this.eventInput(this.getValue());
			})
		})

		// this.submitButton.addEventListener('submit', (evt) => {
		// 	evt.preventDefault()
		// 	this.eventSubmit();
		// })
	}

	submitOn() {
        this.errorField.textContent = '';
        this.submitButton.removeAttribute('disabled');
	}

	submitOff() {
		this.errorField.textContent = 'Корректно заполните все поля';
		this.submitButton.setAttribute('disabled', 'true');
	}

	abstract getValue(): { 
		payment?: string,
        address?: string,
        email?: string,
        phone?: string
     }

	setEventSubmit(event: Function) {
		this.eventSubmit = () => {
			event();
		}
    }

	setEventInput(event: Function) {
		this.eventInput = event; 
	}

	clearValue() {
		this.form.reset();
	}

	abstract isValidForm(): boolean

	render() {
		return this.form;
	}
}