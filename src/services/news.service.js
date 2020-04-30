import { baseService } from './base.service';

export const newsService = {
    getNewsList, crawlNews
}

function getNewsList(sources, limit, prev, prevPublished) {
    let url = `${baseService.constants.apiUrl}/articles`;
    let params = {sources, limit, prev, prevPublished};
    
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

function crawlNews(sources) {
    let url = `${baseService.constants.apiUrl}/articles/crawl`;
    const requestOption = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({sources})
    };

    return fetch(url, requestOption)
            .then(baseService.actions.handleResponse)
            .catch(baseService.actions.handleError);
}
