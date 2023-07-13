<template>
  <el-form ref="formRef" :model="form" v-loading="store.state.progressing" label-width="100px">
    <el-form-item label="編號" prop="id">
      <label>{{ id }}</label>
    </el-form-item>
    <el-form-item label="公司" prop="company.name">
      <label>{{ form.company.name }}</label>
    </el-form-item>
    <el-form-item label="業務員" prop="seller.name">
      <label>{{ form.seller?.name }}</label>
    </el-form-item>
    <el-form-item label="聯絡人Name" prop="name">
      <label>{{ form.name }}</label>
    </el-form-item>
    <el-form-item label="聯絡人稱謂" prop="contractTitle">
      <label>{{ form.contractTitle === 'M' ? '先生' : '小姐' }}</label>
    </el-form-item>
    <el-form-item label="聯絡人地區" prop="contractArea">
      <label>{{ form.contractArea }}</label>
    </el-form-item>
    <el-form-item label="聯絡人Phone" prop="phone">
      <label>{{ form.phone }}</label>
    </el-form-item>
    <el-form-item label="聯絡人Email" prop="email">
      <label>{{ form.email }}</label>
    </el-form-item>
    <el-form-item label="可聯絡時間" prop="contactTime">
      <label>{{ form.contactTime }}</label>
    </el-form-item>
    <el-form-item label="被保人性別" prop="gender">
      <label>{{ form.gender === '0' ? '男' : '女' }}</label>
    </el-form-item>
    <el-form-item label="被保人生日" prop="bDay">
      <label>{{ formatDateYMD(form.bDay) }}</label>
    </el-form-item>
    <el-form-item label="建立時間" prop="createdAt">
      <label>{{ formatDateYMD(form.createdAt) }}</label>
    </el-form-item>
    <el-form-item label="狀態" prop="status">
      <el-tag>{{ status.filter((item,i)=>form.status === i)[0] }}</el-tag>
    </el-form-item>
    <el-form-item label="聯絡狀況" prop="remark">
      <label>{{ form.remark }}</label>
    </el-form-item>
    <el-form-item label="進件公司" prop="fromCompany">
      <label>{{ form.fromCompany }}</label>
    </el-form-item>
    <el-form-item label="需求" prop="insType">
      <label>{{ form.insType }}</label>
    </el-form-item>
    <el-form-item v-if="form.product.length > 0" label="有興趣商品" prop="productList">
      <div v-for="item in productList" :key="`product-${item}`">
        <a :href="'https://finfo.tw/products/' + item" target="_blank">{{item}}</a>
      </div>
    </el-form-item>
    <el-form-item v-if="form.assortments.length > 0" label="保險組合" prop="assortments">
      <a :href="'https://finfo.tw/assortments/' + form.assortments" target="_blank">https://finfo.tw/assortments/{{form.assortments}}</a>
    </el-form-item>
    <el-form-item v-if="form.hasAnnuityEvaluation" label="退休金試算" prop="hasAnnuityEvaluation">
      <el-button color="#3D9A9F" :icon="Document" @click="downloadExcel">PDF 下載</el-button>
    </el-form-item>
    <div class="text-right">
      <el-button @click="emit('toggleModal', false)">Close</el-button>
      <el-button v-if="props.type!=='view'" type="primary" @click="store.dispatch('saveData', { http, path, form, ref: formRef })">Save</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from '../../store/store'
import moment from 'moment'
import { formatDateYMD, base64ToArrayBuffer, createDownload } from '../../utils/mixin'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Document } from '@element-plus/icons-vue'

import { injectStrict } from '../../utils/injectTyped'
import { AxiosKey } from '../../utils/symbols'
const http = injectStrict(AxiosKey)

const store = useStore()
const emit = defineEmits(['toggleModal'])
const props = defineProps({
  type: {
    type: String,
    default: 'view'
  },
  id: {
    type: Number,
    default: 0
  },
  path: {
    type: String,
    default: ''
  },
  status: {
    type: Array,
    default () {
      return []
    }
  }
})

const formRef = ref<FormInstance>()
const form = ref({
  id: 0,
  company: {
    name: ''
  },
  seller: {
    name: ''
  },
  name: '',
  contractTitle: '',
  contactTime: '',
  bDay: '',
  gender: '',
  contractArea: '',
  phone: '',
  email: '',
  status: 0,
  createdAt: false,
  remark: '',
  fromCompany: '',
  insType: '',
  product: '',
  assortments: '',
  hasAnnuityEvaluation: false
})
const productList = computed(() => {
  if (form.value.product.length > 0) {
    return form.value.product.split(',')
  }
  return []
})

// getData
onBeforeMount(async () => {
  if (props.id > 0) {
    const res = await store.dispatch('getModalData', { http, path: props.path, id: props.id })
    if (res) {
      form.value = res.data
    }
  }
})
// 下載
const downloadExcel = () => {
  store.commit('updateProgressing', true)
  http.get(`${props.path}/AnnuityEvaluationPDF/${props.id}`).then(res => {
    store.commit('updateProgressing', false)
    const b = base64ToArrayBuffer(res.data)
    const blob = new Blob([b], { type: 'application/pdf' })
    const fileName = '退休金試算' + moment(new Date()).format('YYYYMMDDhhmmss') + '.pdf'
    createDownload(blob, fileName)
  }).catch(e => {
    store.commit('updateProgressing', false)
    ElMessage.error(e.toString())
  })
}
</script>
