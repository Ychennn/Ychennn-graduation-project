import request from '@/utils/request'
export default {
    //验证码
    sendCode(phone) {
        return request({
            url: `/edumsm/msm/send/${phone}`,
            method: 'get'
        })
    },

    //注册
    registerMember(member) {
        return request({
            url: `/educenter/member/register`,
            method: 'post',
            data:member
        })
    }
}