<template>
  <el-form ref="formRef" :model="form" :rules="rules" v-loading="store.state.progressing" label-width="100px">
    <el-form-item label="人員代號" prop="username">
      <label v-if="props.type==='view'">{{ form.username }}</label>
      <el-input v-else v-model="form.username" maxlength="50" clearable />
    </el-form-item>
    <el-form-item label="人員Name" prop="name">
      <label v-if="props.type==='view'">{{ form.name }}</label>
      <el-input v-else v-model="form.name" clearable />
    </el-form-item>
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
    <el-form-item label="部門" prop="dept.id">
      <label v-if="props.type==='view'">{{ form.dept?.name }}</label>
      <el-select v-else v-model="form.dept.id" placeholder="Please Choose" filterable>
        <el-option
          v-for="item in dept"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="報聘日" prop="applyDate">
      <label v-if="props.type==='view'">{{ formatDateYMD(form.applyDate) }}</label>
      <el-date-picker v-else
        v-model="form.applyDate"
        type="date"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        placeholder="Please Choose" />
    </el-form-item>
    <el-form-item label="離職日" prop="leaveDate">
      <label v-if="props.type==='view'">{{ formatDateYMD(form.leaveDate) }}</label>
      <el-date-picker v-else
        v-model="form.leaveDate"
        type="date"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        placeholder="Please Choose" />
    </el-form-item>
    <el-form-item v-if="props.type==='add'" label="密碼" prop="password">
      <el-input
        v-model="form.password"
        type="password"
        maxlength="20"
        placeholder="密碼"
        clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="啟用" prop="activation">
      <label v-if="props.type==='view'">{{ form.activation ? '是' : '否' }}</label>
      <el-switch v-else v-model="form.activation" active-text="是" inactive-text="否" />
    </el-form-item>
    <div class="text-right">
      <el-button @click="emit('toggleModal', false)">Close</el-button>
      <el-button v-if="props.type!=='view'" type="primary" @click="store.dispatch('saveData', { http, path, form, ref: formRef })">Save</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, onMounted, watch } from 'vue'
import { useStore } from '../../store/store'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { dateInputmode, formatDateYMD, onlyAllowLettersAndDigits } from '../../utils/mixin'

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
onMounted(() => {
  dateInputmode()
})

const formRef = ref<FormInstance>()
const form:any = ref({
  id: 0,
  company: {
    id: null
  },
  username: '',
  name: '',
  dept: {
    id: null
  },
  applyDate: null,
  leaveDate: null,
  password: '',
  activation: false
})
const rules = computed(() => {
  return {
    username: [
      { required: true, message: 'Enter 代號', trigger: 'blur' },
      { max: 50, message: '最大長度為50', trigger: 'blur' },
      { validator: onlyAllowLettersAndDigits, trigger: 'blur' }
    ],
    name: [
      { required: true, message: 'Enter Name', trigger: 'blur' },
      { max: 30, message: '最大長度為30', trigger: 'blur' }
    ],
    applyDate: [
      { required: true, message: 'Please Choose', trigger: 'change' }
    ],
    company: {
      id: [
        { required: true, message: 'Please Choose', trigger: 'change' }
      ]
    },
    dept: {
      id: [
        { required: true, message: 'Please Choose', trigger: 'change' }
      ]
    },
    password: [
      { required: true, min: 8, max: 20, message: 'Enter ，長度介於8~20', trigger: 'blur' },
      { validator: onlyAllowLettersAndDigits, trigger: 'blur' }
    ]
  }
})

// get dept (部門)
const dept: any = ref([])
// getData
const changeCompanyTimes = ref(0)
onBeforeMount(async () => {
  if (props.id > 0) {
    const res = await store.dispatch('getModalData', { http, path: props.path, id: props.id })
    if (res) {
      form.value = res.data
    }
  }
  if (store.state.company.length && props.type !== 'edit') form.value.company.id = store.state.company[0].id
  if (props.type !== 'view') {
    watch(
      () => form.value.company.id,
      (val) => {
        changeCompanyTimes.value++
        const params = { companyId: val }
        http.get('/dept/info/option', { params }).then(res => {
          dept.value = res.data
          if (changeCompanyTimes.value !== 1 || props.type !== 'edit') {
            form.value.dept.id = null
          }
        }).catch(e => {
          ElMessage.error(e.toString())
        })
      },
      { immediate: true }
    )
  }
})
</script>
