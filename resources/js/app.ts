import {addRoutes, useRouterInApp} from './services/router';
import {checkIfLoggedIn} from 'domains/auth';
import {createApp} from 'vue';
import {routes} from './routes';
import App from './App.vue';

const app = createApp(App);

addRoutes(routes);

try {
    checkIfLoggedIn();
} catch (_) {
    // so we dont get stuck in an endless loop of refreshing and checking if logged in
    // Nope, here be infinite loops if it's async and you reload the page.
} finally {
    useRouterInApp(app);
    app.mount('#app');
}