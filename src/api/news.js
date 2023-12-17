import request from '@/utils/request'

export default {
    newsList(newsListDTO) {
        return request({
            url: '/news/list',
            method: 'post',
            data: newsListDTO
        })
    },
}

