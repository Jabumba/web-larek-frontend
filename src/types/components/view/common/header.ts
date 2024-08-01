import { IClickable } from '../../base/view';

export interface IHeaderData {
	title: string;
	description: string;
	action?: string;
};

export interface IHeaderSettings extends IClickable<never> {
	action: string;
	title: string;
	description: string;
};