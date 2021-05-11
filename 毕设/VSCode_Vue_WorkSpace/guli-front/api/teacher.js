import request from '@/utils/request'
export default {
    //分页查询老师
    getTeacherList(page,limit) {
        return request({
            url: `/eduservice/teacher_front/getTeacherFrontList/${page}/${limit}`,
            method: 'get'
        })
    },
    getTeacherInfo(id) {
        return request({
            url: `/eduservice/teacher_front/getTeacherFrontInfo/${id}`,
            method: 'get'
        })
    }
}