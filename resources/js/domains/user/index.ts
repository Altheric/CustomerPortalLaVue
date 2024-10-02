import {UserResource} from './types';
import {storeModuleFactory} from 'services/store';

export const USER_DOMAIN_NAME = 'users';

export const userStore = storeModuleFactory<UserResource>(USER_DOMAIN_NAME);