<template>
  <el-form ref="formRef" :model="form" :rules="rules" v-loading="store.state.progressing" label-width="100px">
    <el-form-item label="角色代號" prop="code">
      <label v-if="props.type==='view'">{{ form.code }}</label>
      <el-input v-else v-model="form.code" clearable />
    </el-form-item>
    <el-form-item label="角色名稱" prop="name">
      <label v-if="props.type==='view'">{{ form.name }}</label>
      <el-input v-else v-model="form.name" clearable />
    </el-form-item>
    <el-form-item label="是否開啟" prop="activation">
      <label v-if="props.type==='view'">{{ form.activation ? '是' : '否' }}</label>
      <el-switch v-else v-model="form.activation" active-text="是" inactive-text="否" />
    </el-form-item>
    <div class="text-right">
      <el-button @click="emit('toggleModal', false)">關閉</el-button>
      <el-button v-if="props.type!=='view'" type="primary" @click="store.dispatch('saveData', { http, path, form, ref: formRef })">儲存</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from '../../store/store'
import type { FormInstance } from 'element-plus'
import { onlyAllowLettersAndDigits } from '../../utils/mixin'

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
  }
})

const formRef = ref<FormInstance>()
const form:any = ref({
  id: 0,
  code: '',
  name: '',
  activation: false
})
const rules = computed(() => {
  return {
    code: [
      { required: true, message: '請輸入代號', trigger: 'blur' },
      { max: 30, message: '最大長度為30', trigger: 'blur' },
      { validator: onlyAllowLettersAndDigits, trigger: 'blur' }
    ],
    name: [
      { required: true, message: '請輸入名稱', trigger: 'blur' },
      { max: 50, message: '最大長度為50', trigger: 'blur' }
    ]
  }
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
</script>
