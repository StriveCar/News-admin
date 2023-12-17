import request from '@/utils/request'

export default {
  sectionDataList(page, size) {
    return request({
      url: '/section/get/data',
      method: 'get',
      params: {
        page,
        size
      }
    })
  },
  sectionList(page, size) {
    return request({
      url: '/section/get/list',
      method: 'get',
      params: {
        page,
        size
      }
    })
  },
  addSection(name) {
    return request({
      url: '/section/add',
      method: 'post',
      params: {
        name
      }
    })
  },
  updateSection(section) {
    return request({
      url: '/section/update',
      method: 'post',
      data: section
    })
  },
  delSection(id){
    return request({
      url: `/section/del`,
      method: 'delete',
      params:{
        id
      }
    })
  }
}
