/* 
* name: api请求地址
* author: 
* time: 2018-8-28
* remark: axios基本请求用java_api，PHP的接口用php_api
*/
import $http from 'axios'
import qs from 'qs'

export default {
    //获取个人的简历详情
    profile(params) {
        return new Promise(resolve => {
            $http.get('/api/profile', params).then(data => {
                resolve(data)
            })
        })
    },
    //获取所有人的简历
    profiles(params) {
        return new Promise(resolve => {
            $http.get('/api/profile/all', params).then(data => {
                resolve(data)
            })
        })
    },
    //登录
    login(params) {
        return new Promise(resolve => {
            $http.post('/api/users/login', params).then(data => {
                resolve(data)
            })
        })
    },
    //注册
    register(params) {
        return new Promise(resolve => {
            $http.post('/api/users/register', params).then(data => {
                resolve(data)
            })
        })
    },
    //插入题库
    addQuestionItem(params) {
        return new Promise(resolve => {
            $http.post('/api/teach/add', params).then(data => {
                resolve(data)
            })
        })
    },  
    //新增试题
    addTestPaper(params){
        return new Promise(resolve => {
            $http.post('/api/teach/addTestPaper', params).then(data => {
                resolve(data)
            })
        })
    },
    // getCourSewareIndex(params){
    //     return new Promise(resolve => {
    //         $http.get('/Common/Helper/index',qs.stringify(params)).then(data => {
    //             resolve(data)
    //         })
    //     })
    // },
    //获取题库列表
    getQuestionItemList(params){
        // console.log(params)
        return new Promise(resolve => {
            $http.post('/api/teach/listAll',params).then(data => {
                resolve(data)
            })
        })
    },
    //获取题库所有
    getTestPaper(params){
        // console.log(params)
        return new Promise(resolve => {
            $http.post('/api/teach/testPaper',params).then(data => {
                resolve(data)
            })
        })
    },

    //获取分类菜单列表
    getSubjectMenuList(params){
        // console.log(params)
        return new Promise(resolve => {
            $http.get('/api/teach/listMenu',params).then(data => {
                resolve(data)
            })
        })
    },
    //获取分类文章列表,如 vuejs,web前端
    getMenuList(params){
        return new Promise(resolve => {
            $http.post('/api/ideas/memu/list',params).then(data => {
                resolve(data)
            })
        })
    },
    //获取全部分类数据
    getlistAlls(params){
        return new Promise(resolve => {
            $http.post('/api/ideas/listAlls',params).then(data => {
                resolve(data)
            })
        })
    },
     //学生提交试卷
     submitAnswer(params){
        return new Promise(resolve => {
            $http.post('/api/teach/submitAnswer', params).then(data => {
                resolve(data)
            })
        })
    },
    //学生提交试卷
    stuSubmitAnswer(params){
        return new Promise(resolve => {
            $http.post('/api/teach/stuSubmitAnswer', params).then(data => {
                resolve(data)
            })
        })
    },
    //查询用户提交的答案，返回改卷信息
    getAnswerPaper(params){
        return new Promise(resolve => {
            $http.post('/api/teach/getAnswerPaper', params).then(data => {
                resolve(data)
            })
        })
    },
    //查询所有试题
    getTestPaperList(params){
        return new Promise(resolve => {
            $http.post('/api/teach/getTestPaperList', params).then(data => {
                resolve(data)
            })
        })
    },
    //获取试题详情及答案
    getTestPaperDetail(params){
        return new Promise(resolve => {
            $http.post('/api/teach/getTestPaperDetail', params).then(data => {
                resolve(data)
            })
        })
    },
    //获取试题详情及答案
    getStuPaperDetail(params){
        return new Promise(resolve => {
            $http.post('/api/teach/getStuPaperDetail', params).then(data => {
                resolve(data)
            })
        })
    },
    //查询用户提交的答案，返回改卷信息
    getAnswerList(params){
        return new Promise(resolve => {
            $http.post('/api/teach/getAnswerList', params).then(data => {
                resolve(data)
            })
        })
    }
}