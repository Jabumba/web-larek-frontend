import { AppStateModals } from './app-state';

export type IModalChange = {
	previous: AppStateModals;
	current: AppStateModals;
};