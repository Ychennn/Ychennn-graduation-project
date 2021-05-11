import request from '@/utils/request'

export default {
    //生成统计数据
    createStaData(day) {
        return request({
            url: `/staservice/sta/count/${day}`,
            method: 'post',
        })
    },
    showChart(searchObj) {
        return request({
            url: `/staservice/sta/show-chart/${searchObj.begin}/${searchObj.end}/${searchObj.type}`,
            method: 'get',
        })
    }
}