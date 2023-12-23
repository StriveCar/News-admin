import request from '@/utils/request'

export default {
    firstCommentList(FirstCommentListQueryDTO) {
        return request({
            url: '/comment/admin/first',
            method: 'post',
            data: FirstCommentListQueryDTO
        })
    },
    secondCommentList(SecondCommentListQueryDTO) {
        return request({
            url: '/comment/admin/second',
            method: 'post',
            data: SecondCommentListQueryDTO
        })
    },
    delFirstComment(commentId){
        console.log(commentId);
        return request({
            url: `/comment/first/del/${commentId}`,
            method: 'delete',
            
        })
    },
    delSecondComment(commentId){
        return request({
            url: `/comment/second/del/${commentId}`,
            method: 'delete',
        })
    },
}
