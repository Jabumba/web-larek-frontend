import { IClickable } from '../../base/view';

export interface IButtonData {
	label: string;
}

export interface IButtonSettings<T> extends IClickable<T> {}