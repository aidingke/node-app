webpackJsonp([10],{B42K:function(t,s){},"FW+x":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=e("Nl8x"),a=e("VayU"),i={name:"postform",data:function(){return{text:"",errors:"",defaultMsg:"",ue1:"ue1",config1:{initialFrameWidth:null,initialFrameHeight:200,autoHeightEnabled:!1,autoFloatEnabled:!0,maximumWords:500,toolbars:[["Source","Undo","Redo","Emotion"]],elementPathEnabled:!1}}},components:{TextArea:n.a,UE:a.a},methods:{submit:function(){var t=this,s=this.$store.getters.user,e={text:this.$refs.ue1.getContent(),name:s.name,avater:s.avater};this.$axios.post("/api/posts",e).then(function(s){t.errors="",t.defaultMsg="",t.$emit("update")}).catch(function(s){t.errors=s.response.data})}}},o={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"post-form mb-3"},[e("div",{staticClass:"card card-info"},[e("div",{staticClass:"card-header bg-info text-white"},[t._v("\n        私信...\n        ")]),t._v(" "),e("div",{staticClass:"card-body"},[e("form",{on:{submit:function(s){return s.preventDefault(),t.submit(s)}}},[""==t.defaultMsg?[e("UE",{ref:"ue1",attrs:{defaultMsg:t.defaultMsg,config:t.config1,id:t.ue1}})]:t._e(),t._v(" "),e("input",{staticClass:"btn btn-dark",attrs:{type:"submit"}})],2)])])])},staticRenderFns:[]};var r={name:"posts",data:function(){return{posts:[],errors:""}},components:{PostForm:e("VU/8")(i,o,!1,function(t){e("B42K")},"data-v-47dc6c7b",null).exports,PostFeed:e("r78V").a},beforeRouteEnter:function(t,s,e){e(function(t){t.getPosts()})},methods:{getPosts:function(){var t=this;this.$axios.get("/api/posts").then(function(s){t.posts=s.data,t.errors=""}).catch(function(s){t.errors=s.response.data})}}},c={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"feed"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("PostForm",{on:{update:t.getPosts}}),t._v(" "),t._l(t.posts,function(s){return e("PostFeed",{key:s._id,attrs:{post:s,showAction:!0},on:{update:t.getPosts}})})],2)])])])},staticRenderFns:[]},u=e("VU/8")(r,c,!1,null,null,null);s.default=u.exports},r78V:function(t,s,e){"use strict";var n={name:"postfeed",data:function(){return{userLike:!1}},props:{post:Object,showAction:Boolean},computed:{user:function(){return this.$store.getters.user},findUserLike:function(){var t=this.$store.getters.user;return this.post.likes.length>0&&this.post.likes.filter(function(s){return s.user==t.id}).length>0}},methods:{deleteClick:function(t){var s=this;this.$axios.delete("/api/posts/"+t).then(function(t){s.$emit("update")}).catch(function(t){console.log(t.response.data)})},likeClick:function(t){var s=this;this.$axios.post("/api/posts/like/"+t).then(function(t){s.$emit("update")}).catch(function(t){alert(t.response.data.alreadyliked)})},unLikeClick:function(t){var s=this;this.$axios.post("/api/posts/unlike/"+t).then(function(t){s.$emit("update")}).catch(function(t){alert(t.response.data.notliked)})}}},a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"posts"},[e("div",{staticClass:"card card-body mb-3"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-2"},[e("a",[e("img",{staticClass:"rounded-circle d-nonse d-md-block",staticStyle:{width:"70px"},attrs:{src:"/static/avatar/"+t.post.user.avatar,alt:""}})]),t._v(" "),e("br"),t._v(" "),e("p",{staticClass:"text-center"},[t._v(t._s(t.post.name))])]),t._v(" "),e("div",{staticClass:"col-md-10"},[e("p",{staticClass:"lead",domProps:{innerHTML:t._s(t.post.text)}}),t._v(" "),t.showAction?e("span",[e("button",{staticClass:"btn btn-light mr-1",attrs:{type:"button"},on:{click:function(s){t.likeClick(t.post._id)}}},[e("i",{staticClass:"fas fa-thumbs-up",class:{"text-info":t.findUserLike}}),t._v(" "),e("span",{staticClass:"badge badge-light"},[t._v(t._s(t.post.likes.length))])]),t._v(" "),e("button",{staticClass:"btn btn-light mr-1",attrs:{type:"button"},on:{click:function(s){t.unLikeClick(t.post._id)}}},[e("i",{staticClass:"text-secondary fas fa-thumbs-down"})]),t._v(" "),null!=t.user&&t.user.id==t.post.user?e("button",{staticClass:"btn btn-danger mr-1",attrs:{type:"button"},on:{click:function(s){t.deleteClick(t.post._id)}}},[e("i",{staticClass:"fas fa-times"})]):t._e()]):t._e()])])])])},staticRenderFns:[]},i=e("VU/8")(n,a,!1,null,null,null);s.a=i.exports}});