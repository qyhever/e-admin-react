(this["webpackJsonpe-admin-react"]=this["webpackJsonpe-admin-react"]||[]).push([[23],{455:function(e,t,a){"use strict";a.r(t);a(115),a(233),a(953);var c=a(954),n=a(304),o=a(157),r=a(0),s=a.n(r);t.default=s.a.memo((function(e){var t=e.resourceTree,a=e.value,u=e.onChange,b=Object(r.useState)(t.map((function(e){return e.key}))),i=Object(o.a)(b,2),l=i[0],d=i[1],h=Object(r.useState)(!0),p=Object(o.a)(h,2),f=p[0],k=p[1];return s.a.createElement(c.a,{checkable:!0,selectable:!1,onExpand:function(e){d(e),k(!1)},expandedKeys:l,autoExpandParent:f,onCheck:function(e,t){var a=t.halfCheckedKeys,c=[].concat(Object(n.a)(e),Object(n.a)(a));u({totalKeys:c,totalSubKeys:e})},checkedKeys:a.totalSubKeys,treeData:t})}))}}]);