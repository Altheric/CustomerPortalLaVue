//Imports
import { authRoutes } from 'domains/auth';
import { ticketRoutes } from 'domains/tickets';
import { categoryRoutes } from 'domains/category';

//Routes
export const routes: any[]= [...authRoutes, ...ticketRoutes, ...categoryRoutes];