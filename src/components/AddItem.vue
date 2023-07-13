<template>
  <el-form :model="form" :rules="form.rules" label-position="right" label-width="auto" class="w-full">
    <el-table v-if="form.tableData.length>0" :data="form.tableData" :show-header="false" border>
      <el-table-column>
        <template #default="scope">
          <div v-show="showMajor">
            <el-radio v-model="major" :label="scope.$index" v-if="canSave">&nbsp;</el-radio>
            <span v-else-if="scope.row.major">＊</span>
          </div>
          <el-form-item :prop="'tableData.' + scope.$index + '.info'" :rules='form.rules.info'>
            <el-input v-model="scope.row.info" :placeholder="'Enter '+labelTitle" v-if="canSave" />
            <span v-else>{{scope.row.info}}</span>
          </el-form-item>
          <el-form-item label="Remark" :prop="'tableData.' + scope.$index + '.remark'" :rules='form.rules.remark'>
            <el-input v-model="scope.row.remark" v-if="canSave" />
            <span v-else>{{scope.row.remark}}</span>
          </el-form-item>
          <el-button v-if="canSave" :icon="Delete" type="danger" @click="popArray(scope.$index)" plain round />
        </template>
      </el-table-column>
    </el-table>
    <a v-if="canSave" @click="addTable" class="inline-flex items-center cursor-pointer">
      <el-button :icon="Plus" type="primary" class="mr-1" size="small" plain round />Add a new one
    </a>
  </el-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { validEmail } from '../utils/mixin'
import { Delete, Plus } from '@element-plus/icons-vue'

const props = defineProps({
  arrays: {
    type: Array,
    default: () => []
  },
  labelTitle: {
    type: String,
    default: ''
  },
  keyWord: {
    type: String,
    default: 'other'
  },
  canSave: {
    type: Boolean,
    default: false
  },
  showMajor: {
    type: Boolean,
    default: false
  }
})
type formType = {
  tableData: any[],
  rules: any
}
const form = ref<formType>({
  tableData: [],
  rules: {
    info: [{ required: true, message: '', trigger: 'blur' }]
  }
})
const major = ref(0)
const addTable = () => {
  form.value.tableData.push({
    major: false,
    info: '',
    remark: ''
  })
}
const popArray = (index: number) => {
  form.value.tableData.splice(index, 1)
}
const formatArray = (array: Array<any>) => {
  for (let i = 0; i < array.length; i++) {
    const obj = array[i]
    if (obj.id) {
      delete obj.id
    }
  }
  return array
}
const check = () => {
  if (props.keyWord === 'email') {
    form.value.rules.info.push({ validator: validEmail, trigger: 'blur' })
  }
}
watch(
  () => props.arrays,
  (val) => {
    formatArray(val)
    check()
    form.value.tableData = val
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
:deep(.cell) {
  display: flex;
  gap: 5px;
  flex-direction: column;
  @media (min-width:640px) {
    flex-direction: row;
  }
}
</style>
