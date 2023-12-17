import request from '@/utils/request'

export default {
    getSystemCount() {
        return request({
            url: '/admin/get/sys/count',
            method: 'get'
        })
    },
    getPulisherData() { 
        return request({
            url: '/admin/get/pulisher/top',
            method: 'get'
        })
    },
    getRoleData() { 
        return request({
            url: '/admin/get/role/count',
            method: 'get'
        })
    },
    getSectionData(){
        return request({
            url: "/admin/get/section/count",
            method:'get'
        })
    }
}
