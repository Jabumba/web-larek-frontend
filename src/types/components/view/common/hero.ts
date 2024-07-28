import { IClickable } from '../../base/view';
import { IView } from '../../base/view';

export interface IHeroData<T> {
	cover: string;
	content: T;
}

export interface IHeroSettings<T> extends IClickable<T> {
	action: string;
	background: string;
	content: string;
	contentView: IView<T>;
}