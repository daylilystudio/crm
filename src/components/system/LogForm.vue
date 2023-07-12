<template>
  <el-form ref="formRef" :model="form" v-loading="store.state.progressing" label-width="100px">
    <el-form-item label="序號" prop="id">
      <label>{{ form.id }}</label>
    </el-form-item>
    <el-form-item label="動作" prop="permission">
      <label>{{ permissionFilters(form.permission) }}</label>
    </el-form-item>
    <el-form-item label="功能" prop="pattenName">
      <label>{{ form.pattenName }}</label>
    </el-form-item>
    <el-form-item label="操作人員" prop="opName">
      <label>{{ form.opName }}</label>
    </el-form-item>
    <el-form-item label="操作時間" prop="opTime">
      <label>{{ formatDateYMDhms(form.opTime) }}</label>
    </el-form-item>
    <el-form-item label="資料內容" prop="content">
      <pre v-if="form.content" class="whitespace-pre-wrap">{{ JSON.stringify(JSON.parse(form.content), null, 2) }}</pre>
    </el-form-item>
    <div class="text-right">
      <el-button @click="emit('toggleModal', false)">關閉</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useStore } from '../../store/store'
import { permissionFilters, formatDateYMDhms } from '../../utils/mixin'
import type { FormInstance } from 'element-plus'

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
  listType: {
    type: String,
    default: ''
  }
})

const formRef = ref<FormInstance>()
const form = ref({
  id: 0,
  type: '',
  permission: '',
  pattenName: '',
  opName: '',
  opTime: '',
  content: ''
})

// getData
onBeforeMount(async () => {
  if (props.id > 0) {
    const res = await store.dispatch('getModalData', { http, path: `${props.path}/${props.listType}`, id: props.id })
    if (res) {
      form.value = res.data
    }
  }
})
</script>
