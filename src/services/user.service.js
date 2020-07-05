import fb from '@/firebase';

export const userService = {
    login, logout
}

function login(serviceProvider) {
    return fb.login(serviceProvider);
}

function logout() {
    return fb.logout();
}