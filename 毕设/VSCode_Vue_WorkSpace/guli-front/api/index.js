import request from '@/utils/request'
export default {
  getIndexData() {
    return request({
      url: `/eduservice/index_front/index`,
      method: 'get'
    })
  }
}