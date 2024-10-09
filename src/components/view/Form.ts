import { IForm } from "../../types";

export interface IFormConstructor {
    new (template: HTMLTemplateElement): IForm
}

export abstract class Form implements IForm {
	form: HTMLFormElement;
	submitButton: HTMLButtonElement;
	errorField: HTMLSpanElement;
	inputList: HTMLInputElement[];

	constructor(formTemplate: HTMLTemplateElement) {
		this.form = formTemplate.content.querySelector('.form') as HTMLFormElement;
		this.submitButton = this.form.querySelector('.button');
		this.errorField = this.form.querySelector('.form__errors');
		this.inputList = [...this.form.content.querySelectorAll('.form__input')]; 
		this.inputList.forEach((input) => {
			input.addEventListener('input', this.isValid);
		})
	}

	abstract getValue(): string

	setSubmitEvent(event: Function) {
        this.form.addEventListener('submit', ((evt) => {
			evt.preventDefault();
            event(this);
        }))
    }

	clearValue() {
		this.form.reset();
	}

	isValid() {
		this.inputList.forEach((input) => {
			if(input.value = ' ') {
				this.errorField.textContent = `Заполните поле ${input.name}`;
			}
		})
	}

	render() {
		return this.form;
	}
}