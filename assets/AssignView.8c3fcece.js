import{d as T,i as I,a as O,b as M,r as P,P as R,o as $,e as K,f as s,K as L,g as C,j as n,w as o,k as e,F as k,A as Q,p,L as w,l as r,h as g,x as q,m as f,Q as G,s as h,R as H,U as J,S as W}from"./index.b0b44b5a.js";import{A as X}from"./AssignForm.37a1ef2f.js";import"./plugin-vueexport-helper.2444895f.js";const Y=g("div",{class:"card-header"},"Search Filter",-1),Z={class:"grid sm:gap-x-8 sm:grid-cols-2"},ee={class:"card-header flex justify-between items-center"},te=g("span",null,"Result",-1),ue=T({__name:"AssignView",setup(ae){const i=I(Q),A=O(),t=M(),d=P(A.path),u=R({username:"",name:"",company:{id:null}});$(async()=>{await t.dispatch("getCompany",{http:i}),t.state.company.length&&(u.company.id=Number(t.state.user.companyId))});const y=K(()=>{const m={page:t.state.page,pageSize:t.state.pageSize,companyId:u.company.id};return u.username.length>0&&(m.username=u.username),u.name.length>0&&(m.name=u.name),m});return(m,l)=>{const V=s("el-option"),B=s("el-select"),b=s("el-form-item"),E=s("el-input"),c=s("el-button"),z=s("el-form"),v=s("el-card"),_=s("el-table-column"),S=s("el-tooltip"),F=s("el-button-group"),N=s("el-table"),U=s("el-pagination"),j=s("el-space"),D=s("el-dialog"),x=L("loading");return p(),C(k,null,[n(j,{size:20,fill:!0,class:"w-full px-4"},{default:o(()=>[w((p(),r(v,{class:"box-card"},{header:o(()=>[Y]),default:o(()=>[n(z,{"label-position":"left"},{default:o(()=>[g("div",Z,[e(t).state.user.superUser?(p(),r(b,{key:0,label:"\u6240\u5C6C\u516C\u53F8",prop:"company.id"},{default:o(()=>[n(B,{modelValue:u.company.id,"onUpdate:modelValue":l[0]||(l[0]=a=>u.company.id=a),placeholder:"Please Choose",filterable:""},{default:o(()=>[(p(!0),C(k,null,q(e(t).state.company,a=>(p(),r(V,{key:a.id,label:a.name,value:a.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})):f("",!0),n(b,{label:"\u4EBA\u54E1\u4EE3\u865F",prop:"username"},{default:o(()=>[n(E,{modelValue:u.username,"onUpdate:modelValue":l[1]||(l[1]=a=>u.username=a),placeholder:"Enter \u4EBA\u54E1\u5E33\u865F",clearable:""},null,8,["modelValue"])]),_:1}),n(b,{label:"\u4EBA\u54E1Name",prop:"name"},{default:o(()=>[n(E,{modelValue:u.name,"onUpdate:modelValue":l[2]||(l[2]=a=>u.name=a),placeholder:"Enter \u4EBA\u54E1Name",clearable:""},null,8,["modelValue"])]),_:1})]),e(t).state.show.read?(p(),r(c,{key:0,icon:e(G),type:"primary",onClick:l[3]||(l[3]=a=>e(t).dispatch("getData",{http:e(i),path:d.value,data:y.value})),class:"!flex w-full sm:w-56 mx-auto"},{default:o(()=>[h("Search")]),_:1},8,["icon"])):f("",!0)]),_:1})]),_:1})),[[x,e(t).state.progressing]]),w((p(),r(v,{class:"box-card"},{header:o(()=>[g("div",ee,[te,e(t).state.show.create?(p(),r(c,{key:0,onClick:l[4]||(l[4]=a=>e(t).dispatch("action",{type:"add",id:0})),icon:e(H),type:"primary",plain:""},{default:o(()=>[h("Add\u4EBA\u54E1")]),_:1},8,["icon"])):f("",!0)])]),default:o(()=>[n(N,{data:e(t).state.table,flexible:!0,border:""},{default:o(()=>[n(_,{prop:"dept.name",label:"\u90E8\u9580"}),n(_,{prop:"username",label:"\u4EBA\u54E1\u4EE3\u865F"}),n(_,{prop:"name",label:"\u4EBA\u54E1Name"}),n(_,{label:"Operate",fixed:"right",width:"110",align:"center"},{default:o(a=>[n(F,null,{default:o(()=>[e(t).state.show.detail||e(t).state.show.roleDetail?(p(),r(S,{key:0,class:"box-item",effect:"dark",content:"\u6B0A\u9650\u8A2D\u5B9A",placement:"top","hide-after":0},{default:o(()=>[n(c,{onClick:le=>e(t).dispatch("action",{type:"assign",id:a.row.id}),icon:e(J)},null,8,["onClick","icon"])]),_:2},1024)):(p(),r(c,{key:1,icon:e(W),round:"",disabled:""},{default:o(()=>[h("\u7121\u6B0A\u9650")]),_:1},8,["icon"]))]),_:2},1024)]),_:1})]),_:1},8,["data"]),e(t).state.table.length>0?(p(),r(U,{key:0,onSizeChange:l[5]||(l[5]=a=>e(t).dispatch("handleSizeChange",{http:e(i),path:d.value,data:y.value,val:a})),onCurrentChange:l[6]||(l[6]=a=>e(t).dispatch("handleCurrentChange",{http:e(i),path:d.value,data:y.value,val:a})),"current-page":e(t).state.page,"onUpdate:currentPage":l[7]||(l[7]=a=>e(t).state.page=a),"page-size":e(t).state.pageSize,"onUpdate:pageSize":l[8]||(l[8]=a=>e(t).state.pageSize=a),"page-sizes":[10,25,50,100],total:e(t).state.total,layout:"total, sizes, prev, pager, next",class:"flex flex-wrap justify-center mt-4"},null,8,["current-page","page-size","total"])):f("",!0)]),_:1})),[[x,e(t).state.progressing]])]),_:1}),n(D,{modelValue:e(t).state.modalOpen,"onUpdate:modelValue":l[10]||(l[10]=a=>e(t).state.modalOpen=a),title:e(t).getters.actionTitle,"append-to-body":!0,"close-on-click-modal":!1,width:"95%",style:{"max-width":"800px"}},{default:o(()=>[(p(),r(X,{key:e(t).state.actionType+e(t).state.actionId,onToggleModal:l[9]||(l[9]=a=>e(t).commit("updateModalOpen",a)),type:e(t).state.actionType,id:e(t).state.actionId,path:d.value},null,8,["type","id","path"]))]),_:1},8,["modelValue","title"])],64)}}});export{ue as default};