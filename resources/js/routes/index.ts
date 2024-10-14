//Imports
import { authRoutes } from 'domains/auth';
import { ticketRoutes } from 'domains/tickets';

//Routes
export const routes: any[]= [...authRoutes, ...ticketRoutes];