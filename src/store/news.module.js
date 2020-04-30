import { newsService } from '../services/news.service';
const state = {};

const actions = {
    async getNewsList({commit}, {sources, limit, prev, prevPublished}) {
        const response = await newsService.getNewsList(sources, limit, prev, prevPublished);

        return response;
    },
    async crawlNews({commit}, {sources}) {
        const response = await newsService.crawlNews(sources);

        return response;
    }
}

const mutations = {

}

export const newsModule = {
    namespaced: true,
    state,
    actions,
    mutations
}