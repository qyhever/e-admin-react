(this["webpackJsonpe-admin-react"]=this["webpackJsonpe-admin-react"]||[]).push([[31],{519:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return C}));a(117),a(209),a(320);var n=a(138),r=(a(175),a(86)),c=(a(469),a(253)),o=a(173),u=(a(471),a(132)),s=a(0),i=a.n(s),l=a(939),d=(a(309),a(115)),p=a.n(d),m=(a(310),a(95)),b=(a(174),a(176)),f=a(215),h=a(259),v=a.n(h),_=a(1194),g=a.n(_),E=(a(1290),a(956));function j(e){var t=e.value,a=e.onChange,n=Object(f.a)(e,["value","onChange"]),r=Object(s.useRef)(null),c=Object(s.useMemo)((function(){return v()((function(e){a&&a(e)}),100)}),[a]),o=Object(s.useCallback)(function(){var e=Object(b.a)(p.a.mark((function e(t){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(E.d)(t.file,"",(function(e){t.progress(e.loaded/e.total*100)}));case 3:a=e.sent,t.success({url:a,meta:{id:t.id,title:t.id,alt:"\u52a0\u8f7d\u5931\u8d25"}}),setTimeout((function(){r.current.forceRender()}),20),e.next=13;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0),m.b.destroy(),m.b.error("\u4e0a\u4f20\u5931\u8d25");case 13:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}(),[]);return i.a.createElement(g.a,Object.assign({ref:r},n,{value:g.a.createEditorState(t),onChange:c,media:{uploadFn:o}}))}var O=u.a.Item;function C(){var e=u.a.useForm(),t=Object(o.a)(e,1)[0];Object(s.useEffect)((function(){var e=setTimeout((function(){t.setFieldsValue({content:"<p>Hello <b>Braft!</b></p>"})}),1e3);return function(){clearTimeout(e)}}),[t]);return i.a.createElement(l.a,null,i.a.createElement(u.a,{form:t,onFinish:function(e){var t={title:e.title,content:e.content.toHTML()};console.log(t)}},i.a.createElement(O,{name:"title",label:"\u6587\u7ae0\u6807\u9898",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6807\u9898"}]},i.a.createElement(c.a,{placeholder:"\u8bf7\u8f93\u5165\u6807\u9898",maxLength:20,style:{width:"300px"},autoComplete:"off"})),i.a.createElement(O,{name:"content",label:"\u6587\u7ae0\u6b63\u6587",trigger:"onBlur",validateTrigger:"onBlur",rules:[{required:!0,validator:function(e,t){return t.isEmpty()?Promise.reject("\u8bf7\u8f93\u5165\u6b63\u6587\u5185\u5bb9"):Promise.resolve()}}]},i.a.createElement(j,{className:"braft-editor",placeholder:"\u8bf7\u8f93\u5165\u6b63\u6587\u5185\u5bb9"})),i.a.createElement(O,null,i.a.createElement(n.a,{justify:"end"},i.a.createElement(r.a,{type:"primary",htmlType:"submit"},"\u63d0\u4ea4")))))}},937:function(e,t,a){e.exports={pageWrapper:"index_pageWrapper__1clcZ",hasBread:"index_hasBread__1Q_ch",isColumn:"index_isColumn__uSOTi",pageContainer:"index_pageContainer__1enpq",transparent:"index_transparent__1vH8A",bread:"index_bread__2_CKz",backTop:"index_backTop__1hSwH"}},939:function(e,t,a){"use strict";a(128),a(942);var n=a(946),r=a(308),c=a(0),o=a.n(c),u=a(6),s=a.n(u),i=(a(202),a(113),a(307),a(943),a(945)),l=a(114),d=a(944),p=a(937),m=a.n(p),b=function(e){var t=e.breadcrumbs;return o.a.createElement(i.a,{className:m.a.bread},t.map((function(e){return o.a.createElement(i.a.Item,{key:e.key},"/"===e.match.url?o.a.createElement(l.b,{to:e.match.url},e.breadcrumb.props.children):o.a.createElement("span",null,e.breadcrumb.props.children))})))},f=function(e){var t=e.breads,a=void 0===t?[]:t,n=Object(d.a)(a)(b);return o.a.createElement(n,null)},h=a(203),v=function(e){var t,a=Object(h.b)().userStore,c=e.wrapperClass,u=e.containerClass,i=e.hasBread,l=e.isColumn,d=e.transparent,p=a.breads,b=s()(m.a.pageWrapper,c,(t={},Object(r.a)(t,m.a.hasBread,i),Object(r.a)(t,m.a.isColumn,l),Object(r.a)(t,m.a.transparent,d),t));return o.a.createElement("div",{className:b},i&&o.a.createElement(f,{breads:p}),o.a.createElement("div",{className:"".concat(m.a.pageContainer," ").concat(u)},e.children),o.a.createElement(n.a,{className:m.a.backTop}))};v.defaultProps={wrapperClass:"",containerClass:"",hasBread:!0,isColumn:!1,transparent:!1};t.a=v},956:function(e,t,a){"use strict";a.d(t,"a",(function(){return l})),a.d(t,"d",(function(){return d})),a.d(t,"c",(function(){return p})),a.d(t,"b",(function(){return m}));a(145);var n=a(115),r=a.n(n),c=(a(174),a(176)),o=a(147),u=a(204),s=a.n(u),i=a(72),l=function(e){return Object(o.b)({method:"get",url:"/upload/qiniu_token",params:e})},d=function(){var e=Object(c.a)(r.a.mark((function e(t,a){var n,c,o,u,d,p=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=p.length>2&&void 0!==p[2]?p[2]:function(){},e.next=3,l();case 3:return c=e.sent,o=c.token,(u=new FormData).append("file",t),u.append("key",a||Object(i.e)()+t.name),u.append("token",o),e.next=11,s()({method:"post",url:window.QINIU_UPLOAD_URL,data:u,onUploadProgress:n});case 11:return d=e.sent,e.abrupt("return",window.QINIU_PREFIX+d.data.key);case 13:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),p=function(){return Object(o.b)({method:"get",url:"/role/total"})},m=function(e){return Object(o.b)({method:"get",url:"/resource/total",params:e})}}}]);