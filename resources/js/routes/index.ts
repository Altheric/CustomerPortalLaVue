//Imports
import { authRoutes } from 'domains/auth';
import { ticketRoutes } from 'domains/tickets';
import { categoryRoutes } from 'domains/category';
import { userRoutes } from 'domains/user';

//Routes
export const routes: any[]= [...authRoutes, ...userRoutes, ...ticketRoutes, ...categoryRoutes];