<template>
  <el-form ref="formRef" :model="form" :rules="rules" v-loading="store.state.progressing" label-width="100px">
    <el-form-item label="公司代號" prop="code">
      <label v-if="props.type==='view'">{{ form.code }}</label>
      <el-input v-else v-model="form.code" maxlength="10" clearable />
    </el-form-item>
    <el-form-item label="公司名稱" prop="name">
      <label v-if="props.type==='view'">{{ form.name }}</label>
      <el-input v-else v-model="form.name" clearable />
    </el-form-item>
    <el-form-item label="公司統編" prop="uniNo">
      <label v-if="props.type==='view'">{{ form.uniNo }}</label>
      <el-input v-else v-model="form.uniNo" maxlength="10" clearable />
    </el-form-item>
    <el-form-item label="公司地址" prop="address">
      <label v-if="props.type==='view'">{{ form.address }}</label>
      <el-input v-else v-model="form.address" clearable />
    </el-form-item>
    <el-form-item label="負責人姓名" prop="principalName">
      <label v-if="props.type==='view'">{{ form.principalName }}</label>
      <el-input v-else v-model="form.principalName" clearable />
    </el-form-item>
    <el-form-item label="負責人電話" prop="principalPhone">
      <label v-if="props.type==='view'">{{ form.principalPhone }}</label>
      <el-input v-else v-model="form.principalPhone" clearable />
    </el-form-item>
    <el-form-item label="負責人Email" prop="principalEmail">
      <label v-if="props.type==='view'">{{ form.principalEmail }}</label>
      <el-input v-else v-model="form.principalEmail" clearable />
    </el-form-item>
    <el-form-item label="成立日期" prop="establishDate">
      <label v-if="props.type==='view'">{{ formatDateYMD(form.establishDate) }}</label>
      <el-date-picker v-else
        v-model="form.establishDate"
        type="date"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        placeholder="請選擇" />
    </el-form-item>
    <el-form-item label="註銷日期" prop="writeoffDate">
      <label v-if="props.type==='view'">{{ formatDateYMD(form.writeoffDate) }}</label>
      <el-date-picker v-else
        v-model="form.writeoffDate"
        type="date"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        placeholder="請選擇" />
    </el-form-item>
    <el-form-item label="備註" prop="remark">
      <label v-if="props.type==='view'">{{ form.remark }}</label>
      <el-input v-else v-model="form.remark" clearable />
    </el-form-item>
    <el-form-item label="公司網站">
      <add-item :arrays="form.webItems" label-title="網址" :can-save="props.type!=='view'" ref="web" />
    </el-form-item>
    <el-form-item label="公司Email">
      <add-item :arrays="form.emailItems" label-title="Email" :can-save="props.type!=='view'" keyWord="email" ref="email" />
    </el-form-item>
    <el-form-item label="公司電話">
      <add-item :arrays="form.phoneItems" label-title="電話" :can-save="props.type!=='view'" ref="phone" />
    </el-form-item>
    <el-form-item label="公司傳真">
      <add-item :arrays="form.faxItems" label-title="傳真" :can-save="props.type!=='view'" ref="fax" />
    </el-form-item>
    <div class="text-right">
      <el-button @click="emit('toggleModal', false)">關閉</el-button>
      <el-button v-if="props.type!=='view'" type="primary" @click="store.dispatch('saveData', { http, path, form, ref: formRef })">儲存</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, onMounted } from 'vue'
import { useStore } from '../../store/store'
import { formatDateYMD, dateInputmode, onlyAllowLettersAndDigits, onlyAllowDigits, validEmail } from '../../utils/mixin'
import type { FormInstance } from 'element-plus'
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
const form = ref({
  id: 0,
  code: '',
  name: '',
  uniNo: '',
  address: '',
  principalName: '',
  principalPhone: '',
  principalEmail: '',
  establishDate: '',
  writeoffDate: null,
  remark: '',
  webItems: [],
  emailItems: [],
  phoneItems: [],
  faxItems: []
})
const rules = computed(() => {
  return {
    code: [
      { required: true, message: '請輸入代碼', trigger: 'blur' },
      { min: 6, max: 10, message: '長度介於6~10', trigger: 'blur' },
      { validator: onlyAllowLettersAndDigits, trigger: 'blur' }
    ],
    name: [
      { required: true, message: '請輸入名稱', trigger: 'blur' },
      { max: 30, message: '最大長度為30', trigger: 'blur' }
    ],
    uniNo: [
      { required: true, message: '請輸入統一編號', trigger: 'blur' },
      { min: 6, max: 10, message: '長度介於6~10', trigger: 'blur' },
      { validator: onlyAllowDigits, trigger: 'blur' }
    ],
    address: [
      { required: true, message: '請輸入地址', trigger: 'blur' },
      { max: 255, message: '最大長度為255', trigger: 'blur' }
    ],
    principalName: [
      { required: true, message: '請輸入姓名', trigger: 'blur' },
      { max: 30, message: '最大長度為30', trigger: 'blur' }
    ],
    principalPhone: [
      { required: true, message: '請輸入電話', trigger: 'blur' },
      { max: 50, message: '最大長度為50', trigger: 'blur' }
    ],
    principalEmail: [
      { required: true, message: '請輸入Email', trigger: 'blur' },
      { max: 255, message: '最大長度為255', trigger: 'blur' },
      { validator: validEmail, trigger: 'blur' }
    ],
    establishDate: [
      { required: true, message: '請選擇', trigger: 'change' }
    ],
    writeoffDate: [
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
