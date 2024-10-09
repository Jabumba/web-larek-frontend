import { IForm } from "../../types";
import { Form } from "./Form";

export class ContactsForm extends Form implements IForm {
	protected inputAddressField: HTMLInputElement;

	constructor(formTemplate: HTMLTemplateElement) {
		super(formTemplate);
		this.inputAddressField = this.form.querySelector('.form__input');
	}

	getValue() {
		return this.inputAddressField.value;
	}
}