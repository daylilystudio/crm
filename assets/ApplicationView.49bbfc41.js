import{d as Z,i as ee,A as te,b as ae,r as A,e as O,o as le,f as m,K as ue,L as U,k as u,p,l as c,w as e,j as t,h as d,v as i,s as v,g as z,x as j,F as L,m as E,I as me,Y as T,a as ce,O as fe,P as H,_ as J,Q as _e,$ as ge,n as be,S as ve,T as he,U as De,a0 as ye,a1 as W,a2 as X}from"./index.cafc66af.js";import{f as R,b as Fe,h as Ee,c as Ce,d as we,n as Ae,e as ke}from"./mixin.fa525c43.js";const Be=["href"],xe=["href"],Ve={class:"text-right"},Se=Z({__name:"ApplicationForm",props:{type:{type:String,default:"view"},id:{type:Number,default:0},path:{type:String,default:""},status:{type:Array,default(){return[]}}},emits:["toggleModal"],setup(Y,{emit:y}){const k=Y,o=ee(te),f=ae(),B=A(),l=A({id:0,company:{name:""},seller:{name:""},name:"",contractTitle:"",contactTime:"",bDay:"",gender:"",contractArea:"",phone:"",email:"",status:0,createdAt:!1,remark:"",fromCompany:"",insType:"",product:"",assortments:"",hasAnnuityEvaluation:!1}),I=O(()=>l.value.product.length>0?l.value.product.split(","):[]);le(async()=>{if(k.id>0){const h=await f.dispatch("getModalData",{http:o,path:k.path,id:k.id});h&&(l.value=h.data)}});const V=()=>{f.commit("updateProgressing",!0),o.get(`${k.path}/AnnuityEvaluationPDF/${k.id}`).then(h=>{f.commit("updateProgressing",!1);const C=Fe(h.data),r=new Blob([C],{type:"application/pdf"}),S="\u9000\u4F11\u91D1\u8A66\u7B97"+Ee(new Date).format("YYYYMMDDhhmmss")+".pdf";Ce(r,S)}).catch(h=>{f.commit("updateProgressing",!1),T.error(h.toString())})};return(h,C)=>{const r=m("el-form-item"),S=m("el-tag"),x=m("el-button"),b=m("el-form"),N=ue("loading");return U((p(),c(b,{ref_key:"formRef",ref:B,model:l.value,"label-width":"100px"},{default:e(()=>[t(r,{label:"\u7DE8\u865F",prop:"id"},{default:e(()=>[d("label",null,i(Y.id),1)]),_:1}),t(r,{label:"\u516C\u53F8",prop:"company.name"},{default:e(()=>[d("label",null,i(l.value.company.name),1)]),_:1}),t(r,{label:"\u696D\u52D9\u54E1",prop:"seller.name"},{default:e(()=>{var F;return[d("label",null,i((F=l.value.seller)==null?void 0:F.name),1)]}),_:1}),t(r,{label:"\u806F\u7D61\u4EBA\u59D3\u540D",prop:"name"},{default:e(()=>[d("label",null,i(l.value.name),1)]),_:1}),t(r,{label:"\u806F\u7D61\u4EBA\u7A31\u8B02",prop:"contractTitle"},{default:e(()=>[d("label",null,i(l.value.contractTitle==="M"?"\u5148\u751F":"\u5C0F\u59D0"),1)]),_:1}),t(r,{label:"\u806F\u7D61\u4EBA\u5730\u5340",prop:"contractArea"},{default:e(()=>[d("label",null,i(l.value.contractArea),1)]),_:1}),t(r,{label:"\u806F\u7D61\u4EBA\u96FB\u8A71",prop:"phone"},{default:e(()=>[d("label",null,i(l.value.phone),1)]),_:1}),t(r,{label:"\u806F\u7D61\u4EBAEmail",prop:"email"},{default:e(()=>[d("label",null,i(l.value.email),1)]),_:1}),t(r,{label:"\u53EF\u806F\u7D61\u6642\u9593",prop:"contactTime"},{default:e(()=>[d("label",null,i(l.value.contactTime),1)]),_:1}),t(r,{label:"\u88AB\u4FDD\u4EBA\u6027\u5225",prop:"gender"},{default:e(()=>[d("label",null,i(l.value.gender==="0"?"\u7537":"\u5973"),1)]),_:1}),t(r,{label:"\u88AB\u4FDD\u4EBA\u751F\u65E5",prop:"bDay"},{default:e(()=>[d("label",null,i(u(R)(l.value.bDay)),1)]),_:1}),t(r,{label:"\u5EFA\u7ACB\u6642\u9593",prop:"createdAt"},{default:e(()=>[d("label",null,i(u(R)(l.value.createdAt)),1)]),_:1}),t(r,{label:"\u72C0\u614B",prop:"status"},{default:e(()=>[t(S,null,{default:e(()=>[v(i(Y.status.filter((F,s)=>l.value.status===s)[0]),1)]),_:1})]),_:1}),t(r,{label:"\u806F\u7D61\u72C0\u6CC1",prop:"remark"},{default:e(()=>[d("label",null,i(l.value.remark),1)]),_:1}),t(r,{label:"\u9032\u4EF6\u516C\u53F8",prop:"fromCompany"},{default:e(()=>[d("label",null,i(l.value.fromCompany),1)]),_:1}),t(r,{label:"\u9700\u6C42",prop:"insType"},{default:e(()=>[d("label",null,i(l.value.insType),1)]),_:1}),l.value.product.length>0?(p(),c(r,{key:0,label:"\u6709\u8208\u8DA3\u5546\u54C1",prop:"productList"},{default:e(()=>[(p(!0),z(L,null,j(I.value,F=>(p(),z("div",{key:`product-${F}`},[d("a",{href:"https://finfo.tw/products/"+F,target:"_blank"},i(F),9,Be)]))),128))]),_:1})):E("",!0),l.value.assortments.length>0?(p(),c(r,{key:1,label:"\u4FDD\u96AA\u7D44\u5408",prop:"assortments"},{default:e(()=>[d("a",{href:"https://finfo.tw/assortments/"+l.value.assortments,target:"_blank"},"https://finfo.tw/assortments/"+i(l.value.assortments),9,xe)]),_:1})):E("",!0),l.value.hasAnnuityEvaluation?(p(),c(r,{key:2,label:"\u9000\u4F11\u91D1\u8A66\u7B97",prop:"hasAnnuityEvaluation"},{default:e(()=>[t(x,{color:"#3D9A9F",icon:u(me),onClick:V},{default:e(()=>[v("PDF \u4E0B\u8F09")]),_:1},8,["icon"])]),_:1})):E("",!0),d("div",Ve,[t(x,{onClick:C[0]||(C[0]=F=>y("toggleModal",!1))},{default:e(()=>[v("\u95DC\u9589")]),_:1}),k.type!=="view"?(p(),c(x,{key:0,type:"primary",onClick:C[1]||(C[1]=F=>u(f).dispatch("saveData",{http:u(o),path:Y.path,form:l.value,ref:B.value}))},{default:e(()=>[v("\u5132\u5B58")]),_:1})):E("",!0)])]),_:1},8,["model"])),[[N,u(f).state.progressing]])}}}),Me=d("div",{class:"card-header"},"\u67E5\u8A62\u689D\u4EF6",-1),Te={class:"grid sm:gap-x-8 sm:grid-cols-2"},Ye=d("div",{class:"card-header flex justify-between items-center"},[d("span",null,"\u67E5\u8A62\u7D50\u679C")],-1),$e={class:"text-right"},Le=Z({__name:"ApplicationView",setup(Y){const y=ee(te),k=ce(),o=ae(),f=A(k.path),B=A(!1);fe(()=>{we()});const l=H({company:{id:null},name:"",phone:"",dateStart:null,dateEnd:null}),I=O(()=>({dateStart:[{validator:(s,n,g)=>Ae(s,n,g,l.dateEnd),trigger:"blur"}],dateEnd:[{validator:(s,n,g)=>ke(s,n,g,l.dateStart),trigger:"blur"}]}));le(async()=>{await o.dispatch("getCompany",{http:y}),o.state.company.length&&(l.company.id=Number(o.state.user.companyId))});const V=O(()=>{const s={companyId:l.company.id,page:o.state.page,pageSize:o.state.pageSize};return l.name.length>0&&(s.name=l.name),l.phone.length>0&&(s.phone=l.phone),l.dateStart!==null&&(s.dateStart=l.dateStart),l.dateEnd!==null&&(s.dateEnd=l.dateEnd),s}),h=A(!1),C=A(null),r=async s=>{if(!o.state.show.assign)return;h.value=!0,C.value=s.id;const n=A(s.seller.id);let g=[];const $={companyId:s.company.id,isCustomerApplication:!0};await y.get("/personnel/info/option",{params:$}).then(_=>{g=_.data,h.value=!1}).catch(_=>{h.value=!1,T.error(_.toString())}),await ye({title:"\u6307\u6D3E\u696D\u52D9\u54E1",message:()=>W(J,{modelValue:n.value,"onUpdate:modelValue":_=>{n.value=_},filterable:!0},{default:()=>g.map(_=>W(X,{label:`${_.name} - ${_.dept.name}`,value:_.id,key:_.code}))})}).then(async()=>{const _={id:s.id,company:s.company,seller:{id:n.value}};await y.put(f.value+"/assign/"+s.id,_).then(async()=>{T.success("\u6307\u6D3E\u4EBA\u54E1\u6210\u529F"),await o.dispatch("getData",{http:y,path:f.value,data:V.value})}).catch(w=>{T.error(w.toString())})}).catch(()=>{})},S=A(["\u5F85\u8655\u7406","\u5DF2\u806F\u7D61","\u806F\u7D61\u4E2D","\u5DF2\u63D0\u4F9B\u8CC7\u6599","\u7B49\u5F85\u56DE\u8986","\u5DF2\u53D7\u7406","\u5DF2\u62D2\u7D55","\u6301\u7E8C\u8FFD\u8E64"]),x=A(!1),b=H({id:null,company:{id:null},status:0,remark:""}),N=s=>{B.value=!0,b.id=s.id,b.company.id=s.company.id,b.status=s.status,b.remark=s.remark},F=()=>{x.value=!0,y.put(`${f.value}/${b.id}`,b).then(()=>{x.value=!1,B.value=!1,T.success("\u8CC7\u6599\u5DF2\u5132\u5B58\u6210\u529F"),o.dispatch("getData",{http:y,path:f.value,data:V.value})}).catch(s=>{x.value=!1,T.error(s.toString())})};return(s,n)=>{const g=m("el-form-item"),$=m("el-input"),_=m("el-date-picker"),w=m("el-button"),K=m("el-form"),q=m("el-card"),D=m("el-table-column"),Q=m("el-tooltip"),oe=m("el-button-group"),ne=m("el-table"),se=m("el-pagination"),re=m("el-space"),G=m("el-dialog"),de=m("el-radio"),ie=m("el-radio-group"),P=ue("loading");return p(),z(L,null,[t(re,{size:20,fill:!0,class:"w-full px-4"},{default:e(()=>[U((p(),c(q,{class:"box-card"},{header:e(()=>[Me]),default:e(()=>[t(K,{rules:I.value,model:l,"label-position":"left"},{default:e(()=>[d("div",Te,[u(o).state.user.superUser?(p(),c(g,{key:0,label:"\u516C\u53F8",prop:"company.id"},{default:e(()=>[t(u(J),{modelValue:l.company.id,"onUpdate:modelValue":n[0]||(n[0]=a=>l.company.id=a),placeholder:"\u8ACB\u9078\u64C7",filterable:""},{default:e(()=>[(p(!0),z(L,null,j(u(o).state.company,a=>(p(),c(u(X),{key:a.id,label:a.name,value:a.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})):E("",!0),t(g,{label:"\u806F\u7D61\u4EBA",prop:"name"},{default:e(()=>[t($,{modelValue:l.name,"onUpdate:modelValue":n[1]||(n[1]=a=>l.name=a),placeholder:"\u8F38\u5165\u59D3\u540D",clearable:""},null,8,["modelValue"])]),_:1}),t(g,{label:"\u96FB\u8A71",prop:"phone"},{default:e(()=>[t($,{modelValue:l.phone,"onUpdate:modelValue":n[2]||(n[2]=a=>l.phone=a),placeholder:"\u8F38\u5165\u96FB\u8A71",clearable:""},null,8,["modelValue"])]),_:1}),t(g,{label:"\u63D0\u51FA\u958B\u59CB\u65E5",prop:"dateStart"},{default:e(()=>[t(_,{modelValue:l.dateStart,"onUpdate:modelValue":n[3]||(n[3]=a=>l.dateStart=a),type:"date",format:"YYYY/MM/DD","value-format":"YYYY-MM-DD",placeholder:"\u958B\u59CB\u65E5"},null,8,["modelValue"])]),_:1}),t(g,{label:"\u63D0\u51FA\u7D50\u675F\u65E5",prop:"dateEnd"},{default:e(()=>[t(_,{modelValue:l.dateEnd,"onUpdate:modelValue":n[4]||(n[4]=a=>l.dateEnd=a),type:"date",format:"YYYY/MM/DD","value-format":"YYYY-MM-DD",placeholder:"\u7D50\u675F\u65E5"},null,8,["modelValue"])]),_:1})]),u(o).state.show.read?(p(),c(w,{key:0,icon:u(_e),type:"primary",onClick:n[5]||(n[5]=a=>u(o).dispatch("getData",{http:u(y),path:f.value,data:V.value})),class:"!flex w-full sm:w-56 mx-auto"},{default:e(()=>[v("\u9EDE\u6211\u67E5\u8A62")]),_:1},8,["icon"])):E("",!0)]),_:1},8,["rules","model"])]),_:1})),[[P,u(o).state.progressing]]),U((p(),c(q,{class:"box-card"},{header:e(()=>[Ye]),default:e(()=>[t(ne,{data:u(o).state.table,flexible:!0,border:""},{default:e(()=>[t(D,{prop:"id",label:"\u7DE8\u865F",width:"65"}),t(D,{prop:"seller.name",label:u(o).state.show.assign?"\u6307\u6D3E\u696D\u52D9\u54E1":"\u696D\u52D9\u54E1",width:"110"},{default:e(a=>[t(w,{loading:h.value&&C.value===a.row.id,onClick:M=>r(a.row),icon:u(o).state.show.assign&&!a.row.seller.name?u(ge):null,class:be(["w-full",{"hover:!text-blue-500":u(o).state.show.assign,"text-center":u(o).state.show.assign&&!a.row.seller.name}]),title:u(o).state.show.assign?"\u9EDE\u6211\u6307\u6D3E":"",link:""},{default:e(()=>[v(i(a.row.seller.name),1)]),_:2},1032,["loading","onClick","icon","class","title"])]),_:1},8,["label"]),t(D,{prop:"name",label:"\u806F\u7D61\u4EBA",width:"110"}),t(D,{prop:"contractTime",label:"\u53EF\u806F\u7D61\u6642\u9593",width:"100"},{default:e(a=>[v(i(a.row.contactTime==="0"?"":a.row.contactTime),1)]),_:1}),t(D,{prop:"contractArea",label:"\u5730\u5340",width:"80"}),t(D,{prop:"phone",label:"\u96FB\u8A71",width:"110"}),t(D,{prop:"insType",label:"\u9700\u6C42"}),t(D,{prop:"remark",label:"\u806F\u7D61\u72C0\u6CC1"}),t(D,{prop:"status",label:"\u72C0\u614B",width:"95"},{default:e(a=>[v(i(S.value.filter((M,pe)=>a.row.status===pe)[0]),1)]),_:1}),t(D,{prop:"fromCompany",label:"\u9032\u4EF6\u516C\u53F8"}),t(D,{prop:"createdAt",label:"\u63D0\u51FA\u6642\u9593",width:"130"},{default:e(a=>[v(i(u(R)(a.row.createdAt)),1)]),_:1}),t(D,{label:"\u64CD\u4F5C",fixed:"right",width:"110",align:"center"},{default:e(a=>[t(oe,null,{default:e(()=>[u(o).state.show.detail?E("",!0):(p(),c(w,{key:0,icon:u(ve),round:"",disabled:""},{default:e(()=>[v("\u7121\u6B0A\u9650")]),_:1},8,["icon"])),u(o).state.show.detail?(p(),c(Q,{key:1,class:"box-item",effect:"dark",content:"\u700F\u89BD",placement:"top","hide-after":0},{default:e(()=>[t(w,{onClick:M=>u(o).dispatch("action",{type:"view",id:a.row.id}),icon:u(he)},null,8,["onClick","icon"])]),_:2},1024)):E("",!0),u(o).state.show.update?(p(),c(Q,{key:2,class:"box-item",effect:"dark",content:"\u8B8A\u66F4\u72C0\u614B",placement:"top","hide-after":0},{default:e(()=>[t(w,{onClick:M=>N(a.row),icon:u(De)},null,8,["onClick","icon"])]),_:2},1024)):E("",!0)]),_:2},1024)]),_:1})]),_:1},8,["data"]),u(o).state.table.length>0?(p(),c(se,{key:0,onSizeChange:n[6]||(n[6]=a=>u(o).dispatch("handleSizeChange",{http:u(y),path:f.value,data:V.value,val:a})),onCurrentChange:n[7]||(n[7]=a=>u(o).dispatch("handleCurrentChange",{http:u(y),path:f.value,data:V.value,val:a})),"current-page":u(o).state.page,"onUpdate:currentPage":n[8]||(n[8]=a=>u(o).state.page=a),"page-size":u(o).state.pageSize,"onUpdate:pageSize":n[9]||(n[9]=a=>u(o).state.pageSize=a),"page-sizes":[10,25,50,100],total:u(o).state.total,layout:"total, sizes, prev, pager, next",class:"flex flex-wrap justify-center mt-4"},null,8,["current-page","page-size","total"])):E("",!0)]),_:1})),[[P,u(o).state.progressing]])]),_:1}),t(G,{modelValue:u(o).state.modalOpen,"onUpdate:modelValue":n[11]||(n[11]=a=>u(o).state.modalOpen=a),title:u(o).getters.actionTitle,"append-to-body":!0,"close-on-click-modal":!1,width:"95%",style:{"max-width":"600px"}},{default:e(()=>[(p(),c(Se,{key:u(o).state.actionType+u(o).state.actionId,onToggleModal:n[10]||(n[10]=a=>u(o).commit("updateModalOpen",a)),status:S.value,type:u(o).state.actionType,id:u(o).state.actionId,path:f.value},null,8,["status","type","id","path"]))]),_:1},8,["modelValue","title"]),t(G,{modelValue:B.value,"onUpdate:modelValue":n[16]||(n[16]=a=>B.value=a),title:"\u8B8A\u66F4\u6848\u4EF6\u72C0\u614B","append-to-body":!0,"close-on-click-modal":!1,width:"95%",style:{"max-width":"460px"}},{default:e(()=>[U((p(),c(K,{model:b},{default:e(()=>[t(g,null,{default:e(()=>[t(ie,{modelValue:b.status,"onUpdate:modelValue":n[12]||(n[12]=a=>b.status=a)},{default:e(()=>[(p(!0),z(L,null,j(S.value,(a,M)=>(p(),c(de,{label:M,key:"changeStatus"+M},{default:e(()=>[v(i(a),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(g,{prop:"remark"},{default:e(()=>[t($,{modelValue:b.remark,"onUpdate:modelValue":n[13]||(n[13]=a=>b.remark=a),maxlength:"255",type:"textarea",autosize:{minRows:4,maxRows:4},placeholder:"\u806F\u7D61\u72C0\u6CC1",clearable:""},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])),[[P,x.value]]),d("div",$e,[t(w,{onClick:n[14]||(n[14]=a=>B.value=!1)},{default:e(()=>[v("\u95DC\u9589")]),_:1}),t(w,{type:"primary",onClick:n[15]||(n[15]=a=>F())},{default:e(()=>[v("\u5132\u5B58")]),_:1})])]),_:1},8,["modelValue"])],64)}}});export{Le as default};