import request from '@/utils/request'

export default{
    getTeacherListPage(curr ,limit ,teacherQuery){
        return request({
            url: `eduservice/teacher/pageTeacherCondition/${curr}/${limit}`,
            method: 'post',
            //data 表示把对象转换成json格式进行传递到接口
            data: teacherQuery
          })
    },
    removeDataById(id){
        return request({
            url: `eduservice/teacher/delete/${id}`,
            method: 'delete',
          })
    },
    addTeacher(teacher){
        return request({
            url: `eduservice/teacher/addTeacher`,
            method: 'post',
            //data 表示把对象转换成json格式进行传递到接口
            data: teacher
          })
    },
    getTeacherInfo(id){
        return request({
            url: `/eduservice/teacher/getTeacher/${id}`,
            method: 'get'
          })
    },
    updateTeacheInfo(teacher){
        return request({
            url: `eduservice/teacher/updateTeacher`,
            method: 'post',
            data:teacher
          })
    }
}