<template>
  <el-form ref="formRef" :model="form" :rules="rules" v-loading="store.state.progressing" label-width="100px">
    <el-form-item label="所屬公司" prop="company.id" v-if="store.state.user.superUser">
      <label v-if="props.type==='view'">{{ form.company.name }}</label>
      <el-select v-else v-model="form.company.id" :disabled="props.type==='edit'" placeholder="Please Choose" filterable>
        <el-option
          v-for="item in store.state.company"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="部門類別" prop="type.id">
      <label v-if="props.type==='view'">{{ form.type?.name }}</label>
      <el-select v-else v-model="form.type.id" placeholder="Please Choose" filterable>
        <el-option
          v-for="item in types"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="上位部門" prop="dept.id">
      <label v-if="props.type==='view'">{{ form.upper?.name }}</label>
      <el-select v-else v-model="form.upper.id" placeholder="Please Choose" filterable>
        <el-option
          v-for="item in upper"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="負責人" prop="principal.id">
      <label v-if="props.type==='view'">{{ form.principal?.name }}</label>
      <el-select v-else v-model="form.principal.id" placeholder="Please Choose" filterable>
        <el-option
          v-for="item in principal"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="部門代號" prop="code">
      <label v-if="props.type==='view'">{{ form.code }}</label>
      <el-input v-else v-model="form.code" maxlength="20" clearable />
    </el-form-item>
    <el-form-item label="部門Name" prop="name">
      <label v-if="props.type==='view'">{{ form.name }}</label>
      <el-input v-else v-model="form.name" clearable />
    </el-form-item>
    <el-form-item label="部門Address" prop="address">
      <label v-if="props.type==='view'">{{ form.address }}</label>
      <el-input v-else v-model="form.address" clearable />
    </el-form-item>
    <el-form-item label="成立日期" prop="establishDate">
      <label v-if="props.type==='view'">{{ formatDateYMD(form.establishDate) }}</label>
      <el-date-picker v-else
        v-model="form.establishDate"
        type="date"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        placeholder="Please Choose" />
    </el-form-item>
    <el-form-item label="註銷日期" prop="writeoffDate">
      <label v-if="props.type==='view'">{{ formatDateYMD(form.writeoffDate) }}</label>
      <el-date-picker v-else
        v-model="form.writeoffDate"
        type="date"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        placeholder="Please Choose" />
    </el-form-item>
    <el-form-item label="Remark" prop="remark">
      <label v-if="props.type==='view'">{{ form.remark }}</label>
      <el-input v-else v-model="form.remark" clearable />
    </el-form-item>
    <el-form-item label="部門網站">
      <add-item :arrays="form.webItems" label-title="網址" :can-save="props.type!=='view'" ref="web" />
    </el-form-item>
    <el-form-item label="部門Email">
      <add-item :arrays="form.emailItems" label-title="Email" :can-save="props.type!=='view'" keyWord="email" ref="email" />
    </el-form-item>
    <el-form-item label="部門Phone">
      <add-item :arrays="form.phoneItems" label-title="Phone" :can-save="props.type!=='view'" ref="phone" />
    </el-form-item>
    <el-form-item label="部門傳真">
      <add-item :arrays="form.faxItems" label-title="傳真" :can-save="props.type!=='view'" ref="fax" />
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
import { formatDateYMD, dateInputmode, onlyAllowLettersAndDigits } from '../../utils/mixin'
import AddItem from '../AddItem.vue'

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
  code: '',
  name: '',
  address: '',
  establishDate: '',
  writeoffDate: null,
  remark: '',
  company: {
    id: null
  },
  type: {
    id: null
  },
  upper: {
    id: null
  },
  principal: {
    id: null
  },
  webItems: [],
  emailItems: [],
  phoneItems: [],
  faxItems: []
})
const rules = computed(() => {
  return {
    code: [
      { required: true, message: 'Enter  ID', trigger: 'blur' },
      { max: 20, message: '最大長度為20', trigger: 'blur' },
      { validator: onlyAllowLettersAndDigits, trigger: 'blur' }
    ],
    name: [
      { required: true, message: 'Enter Name', trigger: 'blur' },
      { max: 50, message: '最大長度為50', trigger: 'blur' }
    ],
    address: [
      { required: true, message: 'Enter Address', trigger: 'blur' },
      { max: 255, message: '最大長度為255', trigger: 'blur' }
    ],
    establishDate: [
      { required: true, message: 'Please Choose', trigger: 'change' }
    ],
    company: {
      id: [
        { required: true, message: 'Please Choose', trigger: 'change' }
      ]
    },
    type: {
      id: [
        { required: true, message: 'Please Choose', trigger: 'change' }
      ]
    }
  }
})

// get 部門類別
const types: any = ref([])
// get 上位部門
const upper: any = ref([])
// get 負責人
const principal: any = ref([])
// getData
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
        if (props.type === 'add') {
          form.value.type.id = null
          form.value.principal.id = null
        }
        const params: any = { companyId: val }
        http.get('/dept/type/option', { params }).then(res => {
          types.value = res.data
        }).catch(e => {
          ElMessage.error(e.toString())
        })
        http.get('/personnel/info/option', { params }).then(res => {
          principal.value = res.data
        }).catch(e => {
          ElMessage.error(e.toString())
        })
      },
      { immediate: true }
    )
    const changeDeptTypeTimes = ref(0)
    watch(
      () => form.value.type.id,
      (val) => {
        changeDeptTypeTimes.value++
        const params = { companyId: form.value.company.id, overDeptTypeId: val }
        if (val !== null) {
          http.get('/dept/info/option', { params }).then(res => {
            upper.value = res.data
            if (changeDeptTypeTimes.value !== 1 || props.type !== 'edit') {
              form.value.upper.id = null
            }
          }).catch(e => {
            ElMessage.error(e.toString())
          })
        } else {
          upper.value = []
        }
      },
      { immediate: true }
    )
  }
})
</script>
