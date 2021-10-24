import { CreateBlog } from '@blog/home';
import { createAction, props } from '@ngrx/store';
import { BlogEntity } from './home.models';

export const init = createAction('[Home Page] Init');

export const loadHomeSuccess = createAction(
  '[Home/API] Load Home Success',
  props<{ payload: BlogEntity[] }>()
);

export const loadHomeFailure = createAction(
  '[Home/API] Load Home Failure',
  props<{ error: any }>()
);

export const createBlog = createAction(
  '[Home/API] Create Blog',
  props<{ request: CreateBlog }>()
);

export const createBlogSuccess = createAction(
  '[Home/API] Create Blog Success',
  props<{ payload: BlogEntity }>()
);

export const createBlogFailure = createAction('[Home/API] Create Blog Failure');
