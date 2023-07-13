<template>
  <el-form class="!-mt-4" ref="formRef" :model="form" v-loading="store.state.progressing" label-width="90px">
    <template v-if="form.company">
      <el-divider><el-icon><office-building/></el-icon> 公司資訊</el-divider>
      <el-form-item label="Company ID" prop="company.code">
        <label>{{ form.company.code }}</label>
      </el-form-item>
      <el-form-item label="Company Name" prop="company.name">
        <label>{{ form.company.name }}</label>
      </el-form-item>
    </template>
    <template v-if="form.personnel">
      <el-divider><el-icon><user/></el-icon> 人員資訊</el-divider>
      <el-form-item label="人員代號" prop="personnel.code">
        <label>{{ form.personnel.code }}</label>
      </el-form-item>
      <el-form-item label="人員Name" prop="personnel.name">
        <label>{{ form.personnel.name }}</label>
      </el-form-item>
    </template>
    <template v-if="form.role">
      <el-divider><el-icon><user/></el-icon> 角色資訊</el-divider>
      <el-form-item label="角色代號" prop="role.code">
        <label>{{ form.role.code }}</label>
      </el-form-item>
      <el-form-item label="角色Name" prop="role.name">
        <label>{{ form.role.name }}</label>
      </el-form-item>
    </template>
    <template v-if="store.state.show.update">
      <el-divider><el-icon><lock/></el-icon> {{ type==='assign'?'人員':'角色' }}權限設定</el-divider>
      <el-table border stripe :data="form.pattens" class="mb-14">
        <el-table-column label="功能類別">
          <template #default="scope">
            <span>{{scope.row.block.name}} - {{scope.row.block.code}}</span>
          </template>
        </el-table-column>
        <el-table-column label="功能">
          <template #default="scope">
            <span>{{scope.row.name}} - {{scope.row.code}}</span>
          </template>
        </el-table-column>
        <el-table-column label="權限">
          <template #default="scope">
            <el-checkbox-group v-model="scope.row.selected">
              <el-checkbox v-for="pms in scope.row.permissions" :label="pms.code" :key="pms.code" :disabled="props.type==='view'">{{pms.name}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-if="type==='assign' && store.state.show.roleUpdate">
      <el-divider><el-icon><lock/></el-icon> 人員角色設定</el-divider>
      <el-table border stripe :data="formRole.roles" class="mb-4">
        <el-table-column label="權限">
          <template #default="scope">
            <el-checkbox v-model="scope.row.isSelect" label="開啟" />
          </template>
        </el-table-column>
        <el-table-column label="角色代號">
          <template #default="scope">
            <span>{{scope.row.code}}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色Name">
          <template #default="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="text-right">
      <el-button @click="emit('toggleModal', false)">Close</el-button>
      <el-button v-if="props.type!=='view'" type="primary" @click="saveAssign()">Save</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useStore } from '../../store/store'
import type { FormInstance } from 'element-plus'
import { OfficeBuilding, User, Lock } from '@element-plus/icons-vue'

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
  company: {
    id: 0,
    code: '',
    name: ''
  },
  personnel: {
    id: 0,
    username: '',
    name: ''
  },
  pattens: []
})
const formRole:any = ref([])

// getData
onBeforeMount(async () => {
  if (props.id > 0) {
    if (store.state.show.update) {
      const res = await store.dispatch('getModalData', { http, path: props.path, id: props.id })
      if (res) form.value = res.data
      form.value.id = props.id
    }
    if (props.type === 'assign' && store.state.show.roleUpdate) {
      const resRole = await store.dispatch('getModalData', { http, path: `${props.path}/role`, id: props.id })
      if (resRole) formRole.value = resRole.data
      formRole.value.id = props.id
    }
  }
})
// save
const saveAssign = async () => {
  if (store.state.show.update) await store.dispatch('saveData', { http, path: props.path, form: form.value, ref: formRef.value })
  if (props.type === 'assign' && store.state.show.roleUpdate) {
    await store.dispatch('saveData', { http, path: `${props.path}/role`, form: formRole.value, ref: formRef.value })
  }
}
</script>

<style scoped>
:deep(.el-divider__text) {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}
</style>
