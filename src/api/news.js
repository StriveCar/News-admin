import request from '@/utils/request'

export default {
    newsList(newsListDTO) {
        return request({
            url: '/news/list',
            method: 'post',
            data: newsListDTO
        })
    },
    pulisherNewsList(dto) {
        return request({
            url: '/news/get/by-publisher',
            method: 'post',
            data: dto
        })
    },
    sectionNewsList(dto) {
        return request({
            url: '/news/get/by-section',
            method: 'post',
            data: dto
        })
    },
    pulishNews(newsId) {
        return request({
            url: '/news/publish',
            method: 'post',
            params: { newsId }
        })
    },
    pulisherNews(dto) {
        return request({
            url: '/news/get/by-publisher',
            method: 'get',
            data: dto
        })
    },
    updateNews(news) {
        return request({
            url: '/news/modify',
            method: 'post',
            data: news
        })
    },
    delNews(newsId) {
        return request({
            url: `/news/delete/${newsId}`,
            method: 'get'
        })
    }
}

