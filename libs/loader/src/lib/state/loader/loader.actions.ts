import { createAction, props } from '@ngrx/store';

export const startLoader = createAction('[Loader] Start Loader');

export const stopLoader = createAction('[Loader] Stop Loader');
