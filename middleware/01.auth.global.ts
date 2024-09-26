import {useAuthStore} from "~/stores/auth";


export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore();

    if (!auth.token) {
        if (to.path !== '/login') return navigateTo('/login');
    } else {
        if (to.path === '/login') return navigateTo('/');
    }
});