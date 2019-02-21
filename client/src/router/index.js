import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const route = new Router({
    routes: [
        /**
         * [首页]
         */
        {
            path: '/',redirect: '/index'
        },
        {
            path: '/index',
            name: 'index',
            component: resolve => require(['@/components/Index'],resolve),
            meta: {
                title: '大前端'
            },
            children:[
                {
                    path: '',
                    component: resolve => require(['@/components/Home'],resolve),
                    meta: {
                        title: ''
                    }
                },
                {
                    path: '/home',
                    name: 'home',
                    component: resolve => require(['@/components/Home'],resolve),
                    meta: {
                        title: ''
                    }
                },
                {
                    path: '/login',
                    name: 'login',
                    component: resolve => require(['@/components/Login'],resolve),
                    meta: {
                        title: '登录'
                    }
                },
                {
                    path: '/register',
                    name: 'register',
                    component: resolve => require(['@/components/Register'],resolve),
                    meta: {
                        title: '注册'
                    }
                },
                {
                    path: '/resetPassword',
                    name: 'resetPassword',
                    component: resolve => require(['@/components/ResetPassword'],resolve),
                    meta: {
                        title: '找回密码'
                    }
                },
                {
                    path: '/resetPasswordByUrl',
                    name: 'resetPasswordByUrl',
                    component: resolve => require(['@/components/ResetPasswordByUrl'],resolve),
                    meta: {
                        title: '重置密码'
                    }
                },
                {
                    path: '/search',
                    name: 'search',
                    component: resolve => require(['@/components/Search'],resolve),
                    meta: {
                        title: '搜索'
                    }
                },
                {
                    path: '/myresume',
                    name: 'myresume',
                    component: resolve => require(['@/components/Myresume'],resolve),
                    meta: {
                        title: '简历中心'
                    }
                },
                {
                    path: '/create-profile',
                    name: 'create-profile',
                    component: resolve => require(['@/components/CreateProfile'],resolve),
                    meta: {
                        title: '创建个人资料'
                    }
                },
                {
                    path: '/editProfile/:id',
                    name: 'editProfile',
                    component: resolve => require(['@/components/EditProfile'],resolve),
                    meta: {
                        title: '编辑个人资料'
                    }
                },
                {
                    path: '/add-experience',
                    name: 'add-experience',
                    component: resolve => require(['@/components/AddExperience'],resolve),
                    meta: {
                        title: '添加个人经验'
                    }
                },
                 {
                    path: '/add-education',
                    name: 'add-education',
                    component: resolve => require(['@/components/AddEducation'],resolve),
                    meta: {
                        title: '添加教育经验'
                    }
                },
                {
                    path: '/editExperience',
                    name: 'editExperience',
                    component: resolve => require(['@/components/EditExperience'],resolve),
                    meta: {
                        title: '编辑个人经验'
                    }
                },
                {
                    path: '/editEducation',
                    name: 'editEducation',
                    component: resolve => require(['@/components/EditEducation'],resolve),
                    meta: {
                        title: '编辑教育经验'
                    }
                },
                {
                    path: '/profiles',
                    name: 'profiles',
                    component: resolve => require(['@/components/Profiles'],resolve),
                    meta: {
                        title: '开发者们'
                    }
                },
                {
                    path: '/profile/:handle',
                    name: 'profile',
                    component: resolve => require(['@/components/Profile/Profile'],resolve),
                    meta: {
                        title: '查看个人简历'
                    }
                },
                {
                    path: '/feed',
                    name: 'feed',
                    component: resolve => require(['@/components/Posts/Posts'],resolve),
                    meta: {
                        title: '查看私信'
                    }
                },
                {
                    path: '/post/:id',
                    name: 'post',
                    component: resolve => require(['@/components/Posts/Post'],resolve),
                    meta: {
                        title: '私信'
                    }
                },
                {
                    path: '/artadd',
                    name: 'artadd',
                    component: resolve => require(['@/components/Ideas/IdeasAdd'],resolve),
                    meta: {
                        title: '发布作品'
                    }
                },    
                {
                    path: '/artlist',
                    name: 'artlist',
                    component: resolve => require(['@/components/Ideas/IdeasList'],resolve),
                    meta: {
                        title: '作品列表'
                    }
                },
                {
                    path: '/artdetail',
                    name: 'artdetail',
                    component: resolve => require(['@/components/Ideas/IdeasDetail'],resolve)
                },
                {
                    path: '/artedit',
                    name: 'artedit',
                    component: resolve => require(['@/components/Ideas/IdeasEdit'],resolve),
                    meta: {
                        title: '编辑文章'
                    }
                },
                {
                    path: '/topicLis',
                    name: 'topicLis',
                    component: resolve => require(['@/components/Ideas/TopicLis'],resolve),
                    meta: {
                        title: '专题列表'
                    }
                },
                {
                    path: '/topicDetail/:id',
                    name: 'topicDetail',
                    component: resolve => require(['@/components/Ideas/TopicDetail'],resolve),
                    meta: {
                        title: '查看专题'
                    }
                },
                {
                    path: '/setavator',
                    name: 'setavator',
                    component: resolve => require(['@/components/Setavator'],resolve),
                    meta: {
                        title: '修改头像'
                    }
                },
                /**
                * [移动设备上拉加载 下拉刷新]
                */
                {
                    path: '/Moments',
                    name: 'Moments',
                    component: resolve => require(['@/components/mobile/Moments'],resolve),
                    meta: {
                        title: '文章列表'
                    }
                },
                /**
                * [ 题库，主路由，子路由五个 ]
                */
                {
                    path: '/Questions',
                    name: 'Questions',
                    component: resolve => require(['@/components/technology/Questions'],resolve),
                    children:[
                        /**
                        * [ 前端考核题 ]
                        */
                        {
                            path: '/testPaper',
                            name: 'testPaper',
                            component: resolve => require(['@/components/technology/TestPaper'],resolve),
                            meta: {
                                title: '考核题'
                            }
                        },
                        /**
                        * [ 答题列表 ]
                        */
                        {
                            path: '/answerList',
                            name: 'answerList',
                            component: resolve => require(['@/components/technology/AnswerList'],resolve),
                            meta: {
                                title: '答题列表'
                            }
                        },
                        /**
                        * [ 学生答卷列表 ]
                        */
                        {
                            path: '/stuTestPaperList',
                            name: 'stuTestPaperList',
                            component: resolve => require(['@/components/technology/StuTestPaperList'],resolve),
                            meta: {
                                title: '试卷列表(考试)'
                            }
                        },
                        /**
                        * [ 试卷列表 ]
                        */
                        {
                            path: '/testPaperList',
                            name: 'testPaperList',
                            component: resolve => require(['@/components/technology/TestPaperList'],resolve),
                            meta: {
                                title: '试卷列表'
                            }
                        },
                        /**
                        * [ 试卷详情 ]
                        */
                        {
                            path: '/answerDetail/:id',
                            name: 'answerDetail',
                            component: resolve => require(['@/components/technology/AnswerDetail'],resolve),
                            meta: {
                                title: '试卷答案详情'
                            }
                        },
                        /**
                        * [ 试卷详情,考试 ]
                        */
                        {
                            path: '/stuTestPaperDetail/:id',
                            name: 'stuTestPaperDetail',
                            component: resolve => require(['@/components/technology/StuTestPaperDetail'],resolve),
                            meta: {
                                title: '考试试卷'
                            }
                        },
                        /**
                        * [ 单选 ]
                        */
                        {
                            path: '/single',
                            name: 'single',
                            component: resolve => require(['@/components/technology/Single'],resolve),
                            meta: {
                                title: '单选'
                            }
                        },
                        /**
                        * [ 多选 ]
                        */
                        {
                            path: '/multipleChoice',
                            name: 'multipleChoice',
                            component: resolve => require(['@/components/technology/MultipleChoice'],resolve),
                            meta: {
                                title: '多选'
                            }
                        },
                        /**
                        * [ 填空 ]
                        */
                        {
                            path: '/completion',
                            name: 'completion',
                            component: resolve => require(['@/components/technology/Completion'],resolve),
                            meta: {
                                title: '填空'
                            }
                        },
                        /**
                        * [ 论述 ]
                        */
                        {
                            path: '/discussion',
                            name: 'discussion',
                            component: resolve => require(['@/components/technology/Discussion'],resolve),
                            meta: {
                                title: '论述'
                            }
                        },
                        /**
                        * [ 考试答案展示 ]
                        */
                        {
                            path: '/answerPaper',
                            name: 'answerPaper',
                            component: resolve => require(['@/components/technology/AnswerPaper'],resolve),
                            meta: {
                                title: '考试答案展示'
                            }
                        },
                        /**
                        * [ 新增试卷 ]
                        */
                        {
                            path: '/addTestPaper',
                            name: 'addTestPaper',
                            component: resolve => require(['@/components/technology/AddTestPaper'],resolve),
                            meta: {
                                title: '新增试卷'
                            }
                        },
                    ]
                },
                {
                    path: '/frontend/:id',
                    name: 'frontend',
                    component: resolve => require(['@/components/Menu/Frontend'],resolve),
                    meta: {
                        title: '前端分类'
                    }
                },
                {
                    path: '/vuejs/:id',
                    name: 'vuejs',
                    component: resolve => require(['@/components/Menu/Vuejs'],resolve),
                    meta: {
                        title: 'Vue分类'
                    }
                },
                {
                    path: '/reactjs/:id',
                    name: 'reactjs',
                    component: resolve => require(['@/components/Menu/Reactjs'],resolve),
                    meta: {
                        title: 'react分类'
                    }
                },
                {
                    path: '/nodejs/:id',
                    name: 'nodejs',
                    component: resolve => require(['@/components/Menu/Nodejs'],resolve),
                    meta: {
                        title: 'nodejs分类'
                    }
                },
                {
                    path: '/mongodb/:id',
                    name: 'mongodb',
                    component: resolve => require(['@/components/Menu/Mongodb'],resolve),
                    meta: {
                        title: 'mongodb分类'
                    }
                },
                {
                    path: '/scroll',
                    name: 'scroll',
                    component: resolve => require(['@/components/scroll'],resolve),
                    meta: {
                        title: ''
                    }
                }
            ]
        },
        /**
        *[后台管理系统]
        */
        // {
        //     path:'/admin',redirect:'/admin'
        // },
        {
            path: '/admin',
            name: 'admin',
            component: resolve => require(['@/components/Admin'],resolve),
            meta: {
                title: '后台管理系统'
            },
            children:[
                {
                    path: '/admin',
                    name: 'admin',
                    component: resolve => require(['@/components/Admin/AdminHome'],resolve),
                    meta: {
                        title: '后台首页'
                    }
                },
                {
                    path: '/adminArtlist',
                    name: 'adminArtlist',
                    component: resolve => require(['@/components/Admin/Artlist'],resolve),
                    meta: {
                        title: '后台管理文章'
                    }
                },
                {
                    path: '/adminAddArticle',
                    name: 'adminAddArticle',
                    component: resolve => require(['@/components/Admin/AddArticle'],resolve),
                    meta: {
                        title: '后台添加文章'
                    }
                },
                {
                    path: '/editart',
                    name: 'editart',
                    component: resolve => require(['@/components/Admin/EditArticle'],resolve),
                    meta: {
                        title: '编辑文章'
                    }
                },
                {
                    path: '/userList',
                    name: 'serList',
                    component: resolve => require(['@/components/Admin/UserList'],resolve),
                    meta: {
                        title: '用户信息'
                    }
                },
                {
                    path: '/adminAnswerList',
                    name: 'adminAnswerList',
                    component: resolve => require(['@/components/Admin/AnswerList'],resolve),
                    meta: {
                        title: '成绩列表'
                    }
                },
                {
                    path: '/adminStuTestPaperList',
                    name: 'adminStuTestPaperList',
                    component: resolve => require(['@/components/Admin/StuTestPaperList'],resolve),
                    meta: {
                        title: '试卷列表(考试用)'
                    }
                },
                {
                    path: '/adminAddTestPaper',
                    name: 'adminAddTestPaper',
                    component: resolve => require(['@/components/Admin/AddTestPaper'],resolve),
                    meta: {
                        title: '新增试卷'
                    }
                },
                {
                    path: '/topicList',
                    name: 'topicList',
                    component: resolve => require(['@/components/Admin/TopicList'],resolve),
                    meta: {
                        title: '添加专题'
                    }
                },
                // {
                //     path: '/addTopic',
                //     name: 'addTopic',
                //     component: resolve => require(['@/components/Admin/AddTopic'],resolve),
                //     meta: {
                //         title: '添加专题'
                //     }
                // },
                {
                    path: '/addTopicDetails',
                    name: 'addTopicDetails',
                    component: resolve => require(['@/components/Admin/AddTopicDetails'],resolve),
                    meta: {
                        title: '添加专题'
                    }
                },
                {
                    path: '/editTopicDetails',
                    name: 'editTopicDetails',
                    component: resolve => require(['@/components/Admin/EditTopicDetails'],resolve),
                    meta: {
                        title: '编辑专题内容'
                    }
                },
                {
                    path: '/topicShow',
                    name: 'topicShow',
                    component: resolve => require(['@/components/Admin/TopicShow'],resolve),
                    meta: {
                        title: '专题分类'
                    }
                },
                
                // {
                //     path: '/adminAnswerPaper',
                //     name: 'adminAnswerPaper',
                //     component: resolve => require(['@/components/Admin/AnswerPaper'],resolve),
                //     meta: {
                //         title: '考试答案展示'
                //     }
                // },
                // {
                //     path: '/adminStuTestPaperDetail',
                //     name: 'adminStuTestPaperDetail',
                //     component: resolve => require(['@/components/Admin/StuTestPaperDetail'],resolve),
                //     meta: {
                //         title: '考试试卷'
                //     }
                // },
            ]
        },
        {
            path: '/loginAdmin',
            name: 'login',
            component: resolve => require(['@/components/Admin/loginAdmin'],resolve),
            meta: {
                title: '登录后台'
            }
        },
    ],
    mode: "history",
    linkActiveClass:"active"
})    

// 添加路由守卫
route.beforeEach((to, from, next) => {
    const isLogin = localStorage.jwtToken ? true : false;
    // console.log(isLogin)
    if (to.meta.title) {
        document.title = to.meta.title + "-关注前端开发者社区"
    }
    
    if (to.path == "/login" || to.path == "/register" || to.path == '/') {
        next();
    } else if(to.path == "/admin" || to.path == "/adminArtlist" || to.path == '/adminAnswerList' || to.path == '/userList'){
        isLogin ? next() : next("/loginAdmin");
    } else {
        // isLogin ? next() : next("/login");
        next();
    }
})

export default route





