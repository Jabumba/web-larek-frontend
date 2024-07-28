import { IView } from '../../base/view';

export type ElementsMap = Record<string, HTMLElement>;

export interface IItemData {
	id: string;
}

export interface IListData<T> {
	items: T[];
}

export interface IListSettings<T> {
	item: IView<T, unknown>;
	activeItemClass: string;
	itemClass: string;
}