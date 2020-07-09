import fb from '@/firebase';
import { baseService } from './base.service';

export const userService = {
    login, loginWithEmailLink, isSignInWithEmailLink, signInWithEmailLink, getToken, logout
}

async function login(serviceProvider) {
    let response = await fb.login(serviceProvider);

    if(response.success) {
        const token = await getToken();
        let user = {
            name: response.data.displayName, 
            email: response.data.email,
            source: serviceProvider,
            pic: response.data.photoURL, 
            token: token,
        };
        
        response = await loginAtBackend(user);
    }

    return response;
}

function loginWithEmailLink(email) {
    let url = `${baseService.constants.appUrl}/login/email`;
    let actionCodeSettings = {
        url: url,
        // This must be true.
        handleCodeInApp: true,
    };
    return fb.loginWithEmail(email, actionCodeSettings);  
}

function isSignInWithEmailLink(href) {
    return fb.isSignInWithEmailLink(href);
}

async function signInWithEmailLink(email, href) {
    let response = await fb.signInWithEmailLink(email, href);

    if(response.success) {
        const token = await getToken();
        let user = {
            name: response.data.displayName ? response.data.displayName : response.data.email, 
            email: response.data.email,
            source: "email-link",
            pic: response.data.photoURL, 
            token: token,
        };
        
        response = await loginAtBackend(user);
    }

    return response;
}

function getToken() {
    return fb.getToken();
}

function loginAtBackend({name, email, source, pic, token}) {
    let url = `${baseService.constants.apiUrl}/login`;
    let data = {
        Name: name,
        Email: email,
        Source: source,
        PicURL: pic,
        FirebaseToken: token,
    };
    const requestOption = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };

    return fetch(url, requestOption)
            .then(baseService.actions.handleResponse)
            .catch(baseService.actions.handleError);
}

function logout() {
    return fb.logout();
}