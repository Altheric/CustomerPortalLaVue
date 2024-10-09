import {storeModuleFactory} from 'services/store';
import type { Category } from './types';


export const CATEGORY_DOMAIN_NAME = 'categories';

export const categoryStore = storeModuleFactory<Category>(CATEGORY_DOMAIN_NAME);