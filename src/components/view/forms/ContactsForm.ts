import { IForm } from "../../../types";
import { Form } from "./Form";

export class ContactsForm extends Form implements IForm {
	protected inputEmailField: HTMLInputElement;
	protected inputPhoneField: HTMLInputElement;

	constructor(formTemplate: HTMLTemplateElement) {
		super(formTemplate);
		this.submitButton = this.form.querySelector('.button');
		
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

	getValue() {
		return {
			email: this.inputEmailField.value,
			phone: this.inputPhoneField.value
		}
	}
}