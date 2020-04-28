import { baseService } from './base.service';

export const newsService = {
    getNewsList
}

function getNewsList(sources, limit, prev, prevPublished) {
    let url = `${baseService.constants.apiUrl}/articles`;
    let params = JSON.stringify({sources, limit, prev, prevPublished});
    let query = Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');
    url = url + '?' + query;

    const requestOption = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    };
    
    return fetch(url, requestOption)
            .then(baseService.actions.handleResponse)
            .catch(baseService.actions.handleError);
}
