//Imports
import {storeModuleFactory} from 'services/store';
import { setTranslation } from 'services/translation';
import { createOverviewRoute, createShowRoute,  createCreateRoute, createEditRoute} from 'services/router/factory';
//Page Imports
import OverviewPage from './Pages/Overview.vue';
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
    // createShowRoute(CATEGORY_DOMAIN_NAME, OverviewPage),
    // createCreateRoute(CATEGORY_DOMAIN_NAME, CreatePage),
    // createEditRoute(CATEGORY_DOMAIN_NAME, EditPage)
]

//Store Definition
export const categoryStore = storeModuleFactory<Category>(CATEGORY_DOMAIN_NAME);