webpackJsonp([19],{L9OG:function(t,e){},ZTsT:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"profileHader",data:function(){return{fa:"false"}},props:{profile:Object}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"card card-body bg-info text-white mb-3"},[s("div",{staticClass:"row"},[s("div",{staticClass:"text-right prel boxface"},[s("img",{staticClass:"rounded-circle pabs",attrs:{src:"/static/avatar/"+t.profile.user.avatar,alt:""}})])]),t._v(" "),s("div",{staticClass:"text-left connectInfo"},[s("h4",{staticClass:"display-6 text-left"},[s("img",{attrs:{src:"/static/images/people.png",width:"16"}}),t._v(t._s(t.profile.handle))]),t._v(" "),t.profile.status?s("p",[s("img",{attrs:{src:"/static/images/statue.png",width:"19"}}),t._v(t._s(t.profile.status))]):t._e(),t._v(" "),t.profile.company?s("p",[s("img",{attrs:{src:"/static/images/home.png",width:"16"}}),t._v(t._s(t.profile.company))]):t._e(),t._v(" "),t.profile.location?s("p",[s("img",{attrs:{src:"/static/images/local.png",width:"16"}}),t._v(t._s(t.profile.location))]):t._e(),t._v(" "),s("p",{staticClass:"aboutInfo"},[t._m(0),t._v(" "),t.profile.website?s("a",{attrs:{target:"_blank",href:"http://"+t.profile.website}},[t._v(t._s(t.profile.website)+"\n          ")]):t._e(),t._v(" "),t.profile.social&&t.profile.social.wechat?s("a",{},[s("i",{staticClass:"fab fa-weixin fa-2x"}),t._v(t._s(t.profile.social.wechat)+"\n          ")]):t._e(),t._v(" "),t.profile.social&&t.profile.social.QQ?s("a",{},[s("i",{staticClass:"fab fa-qq fa-2x"}),t._v(t._s(t.profile.social.QQ)+"\n          ")]):t._e(),t._v(" "),t.profile.social&&t.profile.social.tengxunkt&&1==t.fa?s("a",{staticClass:" p-2",attrs:{href:t.profile.social.tengxunkt}},[s("i",{staticClass:"fab fa-facebook fa-2x"})]):t._e(),t._v(" "),t.profile.social&&t.profile.social.wangyikt&&1==t.fa?s("a",{staticClass:" p-2",attrs:{href:t.profile.social.wangyikt}},[s("i",{staticClass:"fab fa-twitter fa-2x"})]):t._e()])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("img",{attrs:{src:"/static/images/more.png",width:"20"}})])}]};var r=s("VU/8")(i,a,!1,function(t){s("kqxh")},"data-v-4903d970",null).exports,n={name:"profileAbout",props:{profile:Object}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"card card-body bg-light mb-3"},[s("h3",{staticClass:"text-center text-info"},[t._v("个人介绍")]),t._v(" "),t.profile.bio?[s("div",{domProps:{innerHTML:t._s(t.profile.bio)}})]:[s("p",[t._v("\n                没有填写介绍信息\n              ")])],t._v(" "),s("hr"),t._v(" "),s("h3",{staticClass:"text-center text-info"},[t._v("个人技能")]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"d-flex flex-wrap justify-content-center align-items-center"},t._l(t.profile.skills,function(e,i){return s("div",{key:i,staticClass:"p-3"},[s("i",{staticClass:"fa fa-check"}),t._v(" "+t._s(e)+"\n                ")])}))])],2)])])},staticRenderFns:[]},l=s("VU/8")(n,o,!1,null,null,null).exports,c={name:"profileCreds",props:{experience:Array,education:Array}},f={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[t.experience.length>0?s("div",{staticClass:"col-md-12 mb15"},[s("h3",{staticClass:"text-center text-info"},[t._v("个人经历")]),t._v(" "),s("ul",{staticClass:"list-group"},t._l(t.experience,function(e,i){return s("li",{key:i,staticClass:"list-group-item"},[s("h4",[t._v(t._s(e.company))]),t._v(" "),s("p",[t._v(t._s(e.from)+" - "+t._s(e.to?e.to:"至今"))]),t._v(" "),s("p",[s("strong",[t._v("职位:")]),t._v(" "+t._s(e.title)+"\n                 ")]),t._v(" "),e.location?s("p",[s("strong",[t._v("地点:")]),t._v(" "+t._s(e.location)+"\n                 ")]):t._e(),t._v(" "),e.description?s("p",[s("strong",[t._v("岗位职责:")]),t._v(" "),s("pre",{staticStyle:{"white-space":"pre-line",padding:"0 15px",display:"inline",color:"#888"}},[t._v(t._s(e.description))])]):t._e()])}))]):t._e(),t._v(" "),t.education.length>0?s("div",{staticClass:"col-md-12"},[s("h3",{staticClass:"text-center text-info"},[t._v("教育经历")]),t._v(" "),s("ul",{staticClass:"list-group"},t._l(t.education,function(e,i){return s("li",{key:i,staticClass:"list-group-item"},[s("h4",[t._v(t._s(e.school))]),t._v(" "),s("p",[t._v(t._s(e.from)+" - "+t._s(e.to?e.to:"至今"))]),t._v(" "),s("p",[s("strong",[t._v("学历: ")]),t._v(t._s(e.degree))]),t._v(" "),e.fieldofstudy?s("p",[s("strong",[t._v("所学专业: ")]),t._v(t._s(e.fieldofstudy))]):t._e(),t._v(" "),s("p"),e.description?s("p",[s("strong",[t._v("描述:")]),t._v("\n                 "+t._s(e.description))]):t._e()])}))]):t._e()])},staticRenderFns:[]};var _=s("VU/8")(c,f,!1,function(t){s("L9OG")},"data-v-9271e620",null).exports,p={name:"profileGithub",data:function(){return{clientId:"d0800b2e1e4edf23758c",clientSecret:"c2171f07276237bf166715faacc686f4b5e7ba73",count:0,sort:"created: desc",repos:[]}},props:{username:String},created:function(){var t=this;fetch("https://api.github.com/users/"+this.username+"/repos?per_page="+this.count+"&sort="+this.sort+"&client_id="+this.clientId+"&client_secret="+this.clientSecret).then(function(t){return t.json()}).then(function(e){t.repos=e}).catch(function(t){return console.log(t)})}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("p",{staticStyle:{height:"30px"}}),t._v(" "),s("h3",{staticClass:"mb-4"},[t._v("Github仓库信息")]),t._v(" "),t._l(t.repos,function(e){return s("div",{key:e.id,staticClass:"card card-body mb-2"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("h4",[s("a",{staticClass:"text-info",attrs:{href:e.html_url,target:"_blank"}},[t._v(" \n                    "+t._s(e.name)+"\n                ")])]),t._v(" "),s("p",[t._v(t._s(e.description))])]),t._v(" "),s("div",{staticClass:"col-md-6"},[s("span",{staticClass:"badge badge-info mr-1"},[t._v("\n                Stars: "+t._s(e.stargazers_count)+"\n              ")]),t._v(" "),s("span",{staticClass:"badge badge-secondary mr-1"},[t._v("\n                Watchers: "+t._s(e.watchers_count)+"\n              ")]),t._v(" "),s("span",{staticClass:"badge badge-success"},[t._v("\n                Forks: "+t._s(e.forks_count)+"\n              ")])])])])})],2)},staticRenderFns:[]},v={name:"Profile",data:function(){return{profile:null}},components:{ProfileHeader:r,ProfileAbout:l,ProfileCreds:_,ProfileGithub:s("VU/8")(p,d,!1,null,null,null).exports},beforeRouteEnter:function(t,e,s){s(function(t){})},created:function(){this.getProfileByHandle(this.$route.params.handle)},methods:{getProfileByHandle:function(t){var e=this;this.$axios.get("/api/profile/handle/"+t).then(function(t){e.profile=t.data,console.log("-------------"),console.log(e.profile)}).catch(function(t){e.profile=null,console.log(t.response.data)})}}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"profile"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-6"},[s("a",{staticClass:"btn btn-light mb-3 float-left",on:{click:function(e){e.preventDefault(),t.$router.go(-1)}}},[t._v("返回个人信息")])])]),t._v(" "),t.profile?s("ProfileHeader",{attrs:{profile:t.profile}}):t._e(),t._v(" "),t.profile?s("ProfileAbout",{attrs:{profile:t.profile}}):t._e(),t._v(" "),t.profile&&(t.profile.education||t.profile.experience)?s("ProfileCreds",{attrs:{experience:t.profile.experience,education:t.profile.education}}):t._e(),t._v(" "),t.profile&&t.profile.githubusername?s("ProfileGithub",{attrs:{username:t.profile.githubusername}}):t._e()],1)])},staticRenderFns:[]},h=s("VU/8")(v,u,!1,null,null,null);e.default=h.exports},kqxh:function(t,e){}});