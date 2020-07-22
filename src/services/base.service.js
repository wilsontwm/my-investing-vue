const constants = {
    appUrl: process.env.VUE_APP_URL,
    apiUrl: process.env.VUE_APP_API_URL,
}

const actions = {
    async handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if(!response.ok || (data && !data.success)) {
                // Unauthorized access
                if(response.status === 401) {
                    // Remove the user store in local storage and redirect to login page
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                    return null;
                }

                const error = (data && data.error) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        })
    },
    async handleError(error) {
        const data = {
            success: false,
            message: error,
            data: null
        };
        return data;
    },
    getAuthToken() {
        let user = JSON.parse(localStorage.getItem('user'));
        
        if (user && user.token) {
            return 'Bearer ' + user.token;
        }

        return '';
    }
}

export const baseService = {
    namespaced: true,
    constants,
    actions
}