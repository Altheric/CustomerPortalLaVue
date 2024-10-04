//Imports
import { authRoutes } from 'domains/auth';
import { supportRoutes } from '../domains/support/index'

//Routes
export const routes: any[]= [...authRoutes, ...supportRoutes];