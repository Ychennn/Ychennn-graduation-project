import request from '@/utils/request'
export default {
    //登录
    submitLoginUser(memberInfo) {
        return request({
            url: `/educenter/member/login`,
            method: 'post',
            data: memberInfo
        })
    },

    //获取登录用户的信息
    getLoginInfo() {
        return request({
            url: `/educenter/member/getMemberInfo`,
            method: 'get'
        })
    }
}