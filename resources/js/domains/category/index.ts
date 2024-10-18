//Imports
import {storeModuleFactory} from 'services/store';
import { setTranslation } from 'services/translation';
import { createOverviewRoute,  createCreateRoute, createEditRoute} from 'services/router/factory';
//Page Imports
import OverviewPage from './pages/Overview.vue';
import CreatePage from './pages/Create.vue';
import EditPage from './pages/Edit.vue';
//Type Imports
import type { Category } from './types';


//Route Definition
export const CATEGORY_DOMAIN_NAME = 'categories';

setTranslation(CATEGORY_DOMAIN_NAME, {
    singular: 'categorie',
    plural: 'categorieen',
});

export const categoryRoutes = [
    createOverviewRoute(CATEGORY_DOMAIN_NAME, OverviewPage),
    createCreateRoute(CATEGORY_DOMAIN_NAME, CreatePage),
    createEditRoute(CATEGORY_DOMAIN_NAME, EditPage)
]

//Store Definition
export const categoryStore = storeModuleFactory<Category>(CATEGORY_DOMAIN_NAME);