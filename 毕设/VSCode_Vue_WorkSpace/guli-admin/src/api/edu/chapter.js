import request from '@/utils/request'

export default {
    getAllChapters(id) {
        return request({
            url: `eduservice/chapter/getChapterVideo/${id}`,
            method: 'get',
        })
    },
    addChapter(chapter) {
        return request({
            url: `eduservice/chapter/addChapter`,
            method: 'post',
            data: chapter
        })
    },
    getChapter(id) {
        return request({
            url: `eduservice/chapter/getChapterInfo/${id}`,
            method: 'get',
        })
    },
    updateChapter(chapter) {
        return request({
            url: `eduservice/chapter/updateChapter`,
            method: 'post',
            data:chapter
        })
    },
    deleteChapter(id) {
        return request({
            url: `eduservice/chapter/deleteChapter/${id}`,
            method: 'delete',
        })
    }
}