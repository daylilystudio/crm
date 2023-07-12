import{d as K,i as L,A as I,b as T,r as B,o as Z,f as d,K as q,L as z,k as i,p as r,l as C,w as l,g as b,j as e,C as G,s as c,h as s,v as u,F as v,m as y,E as S,Z as U,x as H}from"./index.f9e09ed2.js";import{_ as J}from"./_plugin-vue_export-helper.cdc0426e.js";const O={class:"text-right"},P=K({__name:"AssignForm",props:{type:{type:String,default:"view"},id:{type:Number,default:0},path:{type:String,default:""}},emits:["toggleModal"],setup(k,{emit:M}){const o=k,w=L(I),n=T(),E=B(),t=B({id:0,company:{id:0,code:"",name:""},personnel:{id:0,username:"",name:""},pattens:[]}),h=B([]);Z(async()=>{if(o.id>0){if(n.state.show.update){const _=await n.dispatch("getModalData",{http:w,path:o.path,id:o.id});_&&(t.value=_.data),t.value.id=o.id}if(o.type==="assign"&&n.state.show.roleUpdate){const _=await n.dispatch("getModalData",{http:w,path:`${o.path}/role`,id:o.id});_&&(h.value=_.data),h.value.id=o.id}}});const N=async()=>{n.state.show.update&&await n.dispatch("saveData",{http:w,path:o.path,form:t.value,ref:E.value}),o.type==="assign"&&n.state.show.roleUpdate&&await n.dispatch("saveData",{http:w,path:`${o.path}/role`,form:h.value,ref:E.value})};return(_,D)=>{const A=d("el-icon"),g=d("el-divider"),m=d("el-form-item"),f=d("el-table-column"),F=d("el-checkbox"),R=d("el-checkbox-group"),x=d("el-table"),V=d("el-button"),$=d("el-form"),j=q("loading");return z((r(),C($,{class:"!-mt-4",ref_key:"formRef",ref:E,model:t.value,"label-width":"90px"},{default:l(()=>[t.value.company?(r(),b(v,{key:0},[e(g,null,{default:l(()=>[e(A,null,{default:l(()=>[e(i(G))]),_:1}),c(" \u516C\u53F8\u8CC7\u8A0A")]),_:1}),e(m,{label:"\u516C\u53F8\u4EE3\u865F",prop:"company.code"},{default:l(()=>[s("label",null,u(t.value.company.code),1)]),_:1}),e(m,{label:"\u516C\u53F8\u540D\u7A31",prop:"company.name"},{default:l(()=>[s("label",null,u(t.value.company.name),1)]),_:1})],64)):y("",!0),t.value.personnel?(r(),b(v,{key:1},[e(g,null,{default:l(()=>[e(A,null,{default:l(()=>[e(i(S))]),_:1}),c(" \u4EBA\u54E1\u8CC7\u8A0A")]),_:1}),e(m,{label:"\u4EBA\u54E1\u4EE3\u865F",prop:"personnel.code"},{default:l(()=>[s("label",null,u(t.value.personnel.code),1)]),_:1}),e(m,{label:"\u4EBA\u54E1\u540D\u7A31",prop:"personnel.name"},{default:l(()=>[s("label",null,u(t.value.personnel.name),1)]),_:1})],64)):y("",!0),t.value.role?(r(),b(v,{key:2},[e(g,null,{default:l(()=>[e(A,null,{default:l(()=>[e(i(S))]),_:1}),c(" \u89D2\u8272\u8CC7\u8A0A")]),_:1}),e(m,{label:"\u89D2\u8272\u4EE3\u865F",prop:"role.code"},{default:l(()=>[s("label",null,u(t.value.role.code),1)]),_:1}),e(m,{label:"\u89D2\u8272\u540D\u7A31",prop:"role.name"},{default:l(()=>[s("label",null,u(t.value.role.name),1)]),_:1})],64)):y("",!0),i(n).state.show.update?(r(),b(v,{key:3},[e(g,null,{default:l(()=>[e(A,null,{default:l(()=>[e(i(U))]),_:1}),c(" "+u(k.type==="assign"?"\u4EBA\u54E1":"\u89D2\u8272")+"\u6B0A\u9650\u8A2D\u5B9A",1)]),_:1}),e(x,{border:"",stripe:"",data:t.value.pattens,class:"mb-14"},{default:l(()=>[e(f,{label:"\u529F\u80FD\u985E\u5225"},{default:l(a=>[s("span",null,u(a.row.block.name)+" - "+u(a.row.block.code),1)]),_:1}),e(f,{label:"\u529F\u80FD"},{default:l(a=>[s("span",null,u(a.row.name)+" - "+u(a.row.code),1)]),_:1}),e(f,{label:"\u6B0A\u9650"},{default:l(a=>[e(R,{modelValue:a.row.selected,"onUpdate:modelValue":p=>a.row.selected=p},{default:l(()=>[(r(!0),b(v,null,H(a.row.permissions,p=>(r(),C(F,{label:p.code,key:p.code,disabled:o.type==="view"},{default:l(()=>[c(u(p.name),1)]),_:2},1032,["label","disabled"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:1})]),_:1},8,["data"])],64)):y("",!0),k.type==="assign"&&i(n).state.show.roleUpdate?(r(),b(v,{key:4},[e(g,null,{default:l(()=>[e(A,null,{default:l(()=>[e(i(U))]),_:1}),c(" \u4EBA\u54E1\u89D2\u8272\u8A2D\u5B9A")]),_:1}),e(x,{border:"",stripe:"",data:h.value.roles,class:"mb-4"},{default:l(()=>[e(f,{label:"\u6B0A\u9650"},{default:l(a=>[e(F,{modelValue:a.row.isSelect,"onUpdate:modelValue":p=>a.row.isSelect=p,label:"\u958B\u555F"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),e(f,{label:"\u89D2\u8272\u4EE3\u865F"},{default:l(a=>[s("span",null,u(a.row.code),1)]),_:1}),e(f,{label:"\u89D2\u8272\u540D\u7A31"},{default:l(a=>[s("span",null,u(a.row.name),1)]),_:1})]),_:1},8,["data"])],64)):y("",!0),s("div",O,[e(V,{onClick:D[0]||(D[0]=a=>M("toggleModal",!1))},{default:l(()=>[c("\u95DC\u9589")]),_:1}),o.type!=="view"?(r(),C(V,{key:0,type:"primary",onClick:D[1]||(D[1]=a=>N())},{default:l(()=>[c("\u5132\u5B58")]),_:1})):y("",!0)])]),_:1},8,["model"])),[[j,i(n).state.progressing]])}}});const X=J(P,[["__scopeId","data-v-0825f78a"]]);export{X as A};