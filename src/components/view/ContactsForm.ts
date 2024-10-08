import { IForm } from "../../types";
import { Form } from "./Form";

export class ContactsForm extends Form implements IForm {
	protected inputEmailField: HTMLInputElement;
	protected inputPhoneField: HTMLInputElement;

	constructor(formTemplate: HTMLTemplateElement) {
		super(formTemplate);
		this.submitButton = this.form.querySelector('.button');
		// this.inputEmailField = this.form.getElementsByName('email');
		// this.inputPhoneField = this.form.getElementsByName('phone');
		// {this.inputEmailField, this.inputPhoneField} = ...this.inputList;
		this.inputList.filter((input) => {
			switch (input.name) {
				case 'email':
					this.inputEmailField = input;
					break;
				case 'phone':
					this.inputPhoneField = input;
					break
			}
		})
	}

	isValidForm() {
		return this.inputEmailField.value.length !== 0 && this.inputPhoneField.value.length !== 0 ? true : false
	}

	getValue() {
		return {
			email: this.inputEmailField.value,
			phone: this.inputPhoneField.value
		}
	}
}