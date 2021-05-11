import request from '@/utils/request'

export default {
    deleteCourseById(id) {
        return request({
            url: `/eduservice/course/deleteCourse/${id}`,
            method: 'delete'
        })
    },
    addCourseInfo(course) {
        return request({
            url: `/eduservice/course/addCourseInfo`,
            method: 'post',
            //data 表示把对象转换成json格式进行传递到接口
            data: course
        })
    },
    getTeacherList() {
        return request({
            url: `/eduservice/teacher/selectAll`,
            method: 'get',
        })
    },
    getCourseInfoById(id) {
        return request({
            url: `/eduservice/course/getCourseInfo/${id}`,
            method: 'get',
        })
    },
    updateCourseInfo(info) {
        return request({
            url: `/eduservice/course/updateCourseInfo`,
            method: 'post',
            data: info
        })
    },
    getPublishCourseInfo(id) {
        return request({
            url: `/eduservice/course/getCoursePublishVo/${id}`,
            method: 'get',
        })
    },
    publishCourse(id) {
        return request({
            url: `/eduservice/course/publishCourse/${id}`,
            method: 'post',
        })
    },
    getCourseList() {
        return request({
            url: `/eduservice/course/getCourseList`,
            method: 'get',
        })
    }
}