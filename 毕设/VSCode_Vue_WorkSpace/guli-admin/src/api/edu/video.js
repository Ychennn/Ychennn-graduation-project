import request from '@/utils/request'

export default {
    addVideo(video) {
        return request({
            url: `/eduservice/video/addVideo`,
            method: 'post',
            data: video
        })
    },
    updateVideo(video) {
        return request({
            url: `eduservice/video/updateVideo`,
            method: 'post',
            data: video
        })
    },
    deleteVideo(id) {
        return request({
            url: `/eduservice/video/deleteVideo/${id}`,
            method: 'delete',
        })
    },
    getVideoById(id){
        return request({
            url: `/eduservice/video/getVideo/${id}}`,
            method: 'get',
        })
    },
    deleteAliVideoById(id){
        return request({
            url: `/eduvod/video/removeVideo/${id}`,
            method: 'delete',
        })
    }
}