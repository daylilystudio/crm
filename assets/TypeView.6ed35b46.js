import{d as N,i as j,A as I,b as R,r as z,e as O,o as q,f as u,K,L as U,k as e,p as l,l as i,w as a,g as v,v as E,x as L,F as $,m as f,j as d,h as x,s as w,a as H,P as J,Q as W,R as X,S as Y,T as Z,U as ee,V as te}from"./index.f9e09ed2.js";const ae={key:0},le={key:0},oe={key:0},ne={key:0},ue={class:"text-right"},se=N({__name:"TypeForm",props:{type:{type:String,default:"view"},id:{type:Number,default:0},path:{type:String,default:""}},emits:["toggleModal"],setup(A,{emit:y}){const _=A,t=j(I),c=R(),m=z(),s=z({id:0,name:"",top:!1,company:{id:null},grading:1}),b=O(()=>({name:[{required:!0,message:"\u8ACB\u8F38\u5165\u540D\u7A31",trigger:"blur"},{max:50,message:"\u6700\u5927\u9577\u5EA6\u70BA50",trigger:"blur"}],company:{id:[{required:!0,message:"\u8ACB\u9078\u64C7",trigger:"change"}]}}));return q(async()=>{if(_.id>0){const n=await c.dispatch("getModalData",{http:t,path:_.path,id:_.id});n&&(s.value=n.data)}c.state.company.length&&_.type!=="edit"&&(s.value.company.id=c.state.company[0].id)}),(n,r)=>{const B=u("el-option"),V=u("el-select"),h=u("el-form-item"),g=u("el-input"),F=u("el-input-number"),D=u("el-switch"),k=u("el-button"),C=u("el-form"),S=K("loading");return U((l(),i(C,{ref_key:"formRef",ref:m,model:s.value,rules:b.value,"label-width":"100px"},{default:a(()=>[e(c).state.user.superUser?(l(),i(h,{key:0,label:"\u6240\u5C6C\u516C\u53F8",prop:"company.id"},{default:a(()=>[_.type==="view"?(l(),v("label",ae,E(s.value.company.name),1)):(l(),i(V,{key:1,modelValue:s.value.company.id,"onUpdate:modelValue":r[0]||(r[0]=p=>s.value.company.id=p),placeholder:"\u8ACB\u9078\u64C7",filterable:""},{default:a(()=>[(l(!0),v($,null,L(e(c).state.company,p=>(l(),i(B,{key:p.id,label:p.name,value:p.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]))]),_:1})):f("",!0),d(h,{label:"\u90E8\u9580\u985E\u5225\u540D",prop:"name"},{default:a(()=>[_.type==="view"?(l(),v("label",le,E(s.value.name),1)):(l(),i(g,{key:1,modelValue:s.value.name,"onUpdate:modelValue":r[1]||(r[1]=p=>s.value.name=p),clearable:""},null,8,["modelValue"]))]),_:1}),d(h,{label:"\u7B49\u7D1A",prop:"grading"},{default:a(()=>[_.type==="view"?(l(),v("label",oe,E(s.value.grading),1)):(l(),i(F,{key:1,modelValue:s.value.grading,"onUpdate:modelValue":r[2]||(r[2]=p=>s.value.grading=p),min:1,max:999,clearable:""},null,8,["modelValue"]))]),_:1}),d(h,{label:"\u6700\u9AD8\u7D1A",prop:"top"},{default:a(()=>[_.type==="view"?(l(),v("label",ne,E(s.value.top?"\u662F":"\u5426"),1)):(l(),i(D,{key:1,modelValue:s.value.top,"onUpdate:modelValue":r[3]||(r[3]=p=>s.value.top=p),"active-text":"\u662F","inactive-text":"\u5426"},null,8,["modelValue"]))]),_:1}),x("div",ue,[d(k,{onClick:r[4]||(r[4]=p=>y("toggleModal",!1))},{default:a(()=>[w("\u95DC\u9589")]),_:1}),_.type!=="view"?(l(),i(k,{key:0,type:"primary",onClick:r[5]||(r[5]=p=>e(c).dispatch("saveData",{http:e(t),path:A.path,form:s.value,ref:m.value}))},{default:a(()=>[w("\u5132\u5B58")]),_:1})):f("",!0)])]),_:1},8,["model","rules"])),[[S,e(c).state.progressing]])}}}),ie=x("div",{class:"card-header"},"\u67E5\u8A62\u689D\u4EF6",-1),de={class:"grid sm:gap-x-8 sm:grid-cols-2"},pe={class:"card-header flex justify-between items-center"},re=x("span",null,"\u67E5\u8A62\u7D50\u679C",-1),me=N({__name:"TypeView",setup(A){const y=j(I),_=H(),t=R(),c=z(_.path),m=J({name:"",company:{id:null}});q(async()=>{await t.dispatch("getCompany",{http:y}),t.state.company.length&&(m.company.id=Number(t.state.user.companyId))});const s=O(()=>{const b={page:t.state.page,pageSize:t.state.pageSize};return m.name.length>0&&(b.name=m.name),m.company.id>0&&(b.companyId=m.company.id),b});return(b,n)=>{const r=u("el-option"),B=u("el-select"),V=u("el-form-item"),h=u("el-input"),g=u("el-button"),F=u("el-form"),D=u("el-card"),k=u("el-table-column"),C=u("el-tooltip"),S=u("el-button-group"),p=u("el-table"),P=u("el-pagination"),Q=u("el-space"),G=u("el-dialog"),T=K("loading");return l(),v($,null,[d(Q,{size:20,fill:!0,class:"w-full px-4"},{default:a(()=>[U((l(),i(D,{class:"box-card"},{header:a(()=>[ie]),default:a(()=>[d(F,{"label-position":"left"},{default:a(()=>[x("div",de,[e(t).state.user.superUser?(l(),i(V,{key:0,label:"\u6240\u5C6C\u516C\u53F8",prop:"company.id"},{default:a(()=>[d(B,{modelValue:m.company.id,"onUpdate:modelValue":n[0]||(n[0]=o=>m.company.id=o),placeholder:"\u8ACB\u9078\u64C7",filterable:""},{default:a(()=>[(l(!0),v($,null,L(e(t).state.company,o=>(l(),i(r,{key:o.id,label:o.name,value:o.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})):f("",!0),d(V,{label:"\u90E8\u9580\u985E\u5225\u540D",prop:"name"},{default:a(()=>[d(h,{modelValue:m.name,"onUpdate:modelValue":n[1]||(n[1]=o=>m.name=o),placeholder:"\u8F38\u5165\u90E8\u9580\u985E\u5225\u540D",clearable:""},null,8,["modelValue"])]),_:1})]),e(t).state.show.read?(l(),i(g,{key:0,icon:e(W),type:"primary",onClick:n[2]||(n[2]=o=>e(t).dispatch("getData",{http:e(y),path:c.value,data:s.value})),class:"!flex w-full sm:w-56 mx-auto"},{default:a(()=>[w("\u9EDE\u6211\u67E5\u8A62")]),_:1},8,["icon"])):f("",!0)]),_:1})]),_:1})),[[T,e(t).state.progressing]]),U((l(),i(D,{class:"box-card"},{header:a(()=>[x("div",pe,[re,e(t).state.show.create?(l(),i(g,{key:0,onClick:n[3]||(n[3]=o=>e(t).dispatch("action",{type:"add",id:0})),icon:e(X),type:"primary",plain:""},{default:a(()=>[w("\u65B0\u589E\u90E8\u9580\u985E\u5225")]),_:1},8,["icon"])):f("",!0)])]),default:a(()=>[d(p,{data:e(t).state.table,flexible:!0,border:""},{default:a(()=>[d(k,{prop:"name",label:"\u90E8\u9580\u985E\u5225\u540D"}),d(k,{prop:"grading",label:"\u7B49\u7D1A"}),d(k,{label:"\u64CD\u4F5C",fixed:"right",width:"150",align:"center"},{default:a(o=>[d(S,null,{default:a(()=>[e(t).state.show.detail?f("",!0):(l(),i(g,{key:0,icon:e(Y),round:"",disabled:""},{default:a(()=>[w("\u7121\u6B0A\u9650")]),_:1},8,["icon"])),e(t).state.show.detail?(l(),i(C,{key:1,class:"box-item",effect:"dark",content:"\u700F\u89BD",placement:"top","hide-after":0},{default:a(()=>[d(g,{onClick:M=>e(t).dispatch("action",{type:"view",id:o.row.id}),icon:e(Z)},null,8,["onClick","icon"])]),_:2},1024)):f("",!0),e(t).state.show.update?(l(),i(C,{key:2,class:"box-item",effect:"dark",content:"\u7DE8\u8F2F",placement:"top","hide-after":0},{default:a(()=>[d(g,{onClick:M=>e(t).dispatch("action",{type:"edit",id:o.row.id}),icon:e(ee)},null,8,["onClick","icon"])]),_:2},1024)):f("",!0),e(t).state.show.delete?(l(),i(C,{key:3,class:"box-item",effect:"dark",content:"\u522A\u9664",placement:"top","hide-after":0},{default:a(()=>[d(g,{onClick:M=>e(t).dispatch("handleDelete",{http:e(y),path:c.value,data:s.value,row:o.row}),icon:e(te),type:"danger",plain:""},null,8,["onClick","icon"])]),_:2},1024)):f("",!0)]),_:2},1024)]),_:1})]),_:1},8,["data"]),e(t).state.table.length>0?(l(),i(P,{key:0,onSizeChange:n[4]||(n[4]=o=>e(t).dispatch("handleSizeChange",{http:e(y),path:c.value,data:s.value,val:o})),onCurrentChange:n[5]||(n[5]=o=>e(t).dispatch("handleCurrentChange",{http:e(y),path:c.value,data:s.value,val:o})),"current-page":e(t).state.page,"onUpdate:currentPage":n[6]||(n[6]=o=>e(t).state.page=o),"page-size":e(t).state.pageSize,"onUpdate:pageSize":n[7]||(n[7]=o=>e(t).state.pageSize=o),"page-sizes":[10,25,50,100],total:e(t).state.total,layout:"total, sizes, prev, pager, next",class:"flex flex-wrap justify-center mt-4"},null,8,["current-page","page-size","total"])):f("",!0)]),_:1})),[[T,e(t).state.progressing]])]),_:1}),d(G,{modelValue:e(t).state.modalOpen,"onUpdate:modelValue":n[9]||(n[9]=o=>e(t).state.modalOpen=o),title:e(t).getters.actionTitle,"append-to-body":!0,"close-on-click-modal":!1,width:"95%",style:{"max-width":"600px"}},{default:a(()=>[(l(),i(se,{key:e(t).state.actionType+e(t).state.actionId,onToggleModal:n[8]||(n[8]=o=>e(t).commit("updateModalOpen",o)),type:e(t).state.actionType,id:e(t).state.actionId,path:c.value},null,8,["type","id","path"]))]),_:1},8,["modelValue","title"])],64)}}});export{me as default};
