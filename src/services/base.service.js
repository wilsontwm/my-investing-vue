const constants = {
    apiUrl: process.env.VUE_APP_API_URL,
}

const actions = {
    async handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if(!response.ok || (data && !data.success)) {
                // Unauthorized access
                if(response.status === 401) {
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
    }
}

export const baseService = {
    namespaced: true,
    constants,
    actions
}