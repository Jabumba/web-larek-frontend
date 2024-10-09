import { IForm } from "../../types";
import { Form } from "./Form";

export class OrderForm extends Form implements IForm {
	protected inputAddressField: HTMLInputElement;

	constructor(formTemplate: HTMLTemplateElement) {
		super(formTemplate);
		this.inputAddressField = this.form.getElementsByName('address');
	}

    isValidForm() {
        return this.isValid(this.inputAddressField)
	}

	getValue() {
		return this.inputAddressField.value;
	}
}