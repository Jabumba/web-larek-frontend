import { IForm } from "../../types";
import { Form } from "./Form";

export class ContactsForm extends Form implements IForm {
	protected inputEmailField: HTMLInputElement;
	protected inputPhoneField: HTMLInputElement;

	constructor(formTemplate: HTMLTemplateElement) {
		super(formTemplate);
		this.inputEmailField = this.form.getElementsByName('email');
		this.inputPhoneField = this.form.getElementsByName('phone');
	}

	isValidForm() {
        return this.isValid(this.inputEmailField) && this.isValid(this.inputPhoneField)
	}

	getValue() {
		return this.inputEmailField.value;
	}
}