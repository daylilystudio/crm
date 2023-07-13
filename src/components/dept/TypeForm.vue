<template>
  <el-form ref="formRef" :model="form" :rules="rules" v-loading="store.state.progressing" label-width="100px">
    <el-form-item label="所屬公司" prop="company.id" v-if="store.state.user.superUser">
      <label v-if="props.type==='view'">{{ form.company.name }}</label>
      <el-select v-else v-model="form.company.id" placeholder="Please Choose" filterable>
        <el-option
          v-for="item in store.state.company"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="部門類別名" prop="name">
      <label v-if="props.type==='view'">{{ form.name }}</label>
      <el-input v-else v-model="form.name" clearable />
    </el-form-item>
    <el-form-item label="等級" prop="grading">
      <label v-if="props.type==='view'">{{ form.grading }}</label>
      <el-input-number v-else v-model="form.grading" :min="1" :max="999" clearable />
    </el-form-item>
    <el-form-item label="最高級" prop="top">
      <label v-if="props.type==='view'">{{ form.top ? '是' : '否' }}</label>
      <el-switch v-else v-model="form.top" active-text="是" inactive-text="否" />
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
  }
})

const formRef = ref<FormInstance>()
const form:any = ref({
  id: 0,
  name: '',
  top: false,
  company: {
    id: null
  },
  grading: 1
})
const rules = computed(() => {
  return {
    name: [
      { required: true, message: 'Enter Name', trigger: 'blur' },
      { max: 50, message: '最大長度為50', trigger: 'blur' }
    ],
    company: {
      id: [
        { required: true, message: 'Please Choose', trigger: 'change' }
      ]
    }
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
  if (store.state.company.length && props.type !== 'edit') form.value.company.id = store.state.company[0].id
})
</script>
