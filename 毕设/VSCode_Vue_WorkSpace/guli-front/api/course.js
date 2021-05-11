import request from '@/utils/request'
export default {
    //分页条件查询课程
    getCourseList(page, limit, vo) {
        return request({
            url: `/eduservice/course_front/getCourseList/${page}/${limit}`,
            method: 'post',
            data: vo
        })
    },
    //查询课程的分类
    getAllSubject() {
        return request({
            url: `/eduservice/subject/getAllSubject`,
            method: 'get',
        })
    },
    //查询课程的详细信息
    getCourseInfo(id) {
        return request({
            url: `/eduservice/course_front/getCourseInfo/${id}`,
            method: 'get',
        })
    }
}