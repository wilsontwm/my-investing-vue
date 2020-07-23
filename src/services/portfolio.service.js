import { baseService } from './base.service';

export const portfolioService = {
    getAccounts, createAccount, updateAccount, deleteAccount
}

// Get all the accounts that belong to the user
function getAccounts() {
    let url = `${baseService.constants.apiUrl}/auth/account/list`;
        
    const requestOption = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': baseService.actions.getAuthToken()},
    };
    
    return fetch(url, requestOption)
            .then(baseService.actions.handleResponse)
            .catch(baseService.actions.handleError);
}

// Create a new account
function createAccount({title}) {
    let url = `${baseService.constants.apiUrl}/auth/account/create`;
    let data = {
        Title: title,
    };

    const requestOption = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': baseService.actions.getAuthToken()},
        body: JSON.stringify(data)
    };

    return fetch(url, requestOption)
            .then(baseService.actions.handleResponse)
            .catch(baseService.actions.handleError);
}

// Update an existing account
function updateAccount({id, title}) {
    let url = `${baseService.constants.apiUrl}/auth/account/update`;
    let data = {
        ID: id,
        Title: title,
    };

    const requestOption = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': baseService.actions.getAuthToken()},
        body: JSON.stringify(data)
    };
    
    return fetch(url, requestOption)
            .then(baseService.actions.handleResponse)
            .catch(baseService.actions.handleError);
}

// Delete an existing account
function deleteAccount({id}) {
    let url = `${baseService.constants.apiUrl}/auth/account/delete`;
    let data = {
        ID: id,
    };

    const requestOption = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': baseService.actions.getAuthToken()},
        body: JSON.stringify(data)
    };

    return fetch(url, requestOption)
            .then(baseService.actions.handleResponse)
            .catch(baseService.actions.handleError);
}