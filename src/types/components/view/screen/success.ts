import { IHeaderData } from '../common/header';

export interface ISuccessData {
	content: IHeaderData;
	isActive: boolean;
};

export interface ISuccessSettings {
	onClose: () => void;
};