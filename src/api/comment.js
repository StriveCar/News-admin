import request from '@/utils/request'

export default {
    firstCommentList(FirstCommentListQueryDTO) {
        return request({
            url: '/comment/first',
            method: 'post',
            data: FirstCommentListQueryDTO
        })
    },
    secondCommentList(SecondCommentListQueryDTO) {
        return request({
            url: '/comment/second',
            method: 'post',
            data: SecondCommentListQueryDTO
        })
    },
}
