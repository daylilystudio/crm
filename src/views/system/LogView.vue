<template>
  <el-space :size="20" :fill="true" class="w-full px-4">
    <el-card class="box-card" v-loading="store.state.progressing">
      <template #header>
        <div class="card-header">查詢條件</div>
      </template>
      <el-form ref="filterFormRef" :rules="rules" :model="filterForm" label-position="left">
        <div class="grid sm:gap-x-8 sm:grid-cols-2">
          <el-form-item label="操作期間" prop="dateStart">
            <el-date-picker
              v-model="filterForm.dateStart"
              type="date"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              placeholder="開始日" />
          </el-form-item>
          <el-form-item label="至" prop="dateEnd">
            <el-date-picker
              v-model="filterForm.dateEnd"
              type="date"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              placeholder="結束日" />
          </el-form-item>
          <el-form-item label="功能" prop="patten">
            <el-cascader
              :props="{ expandTrigger: 'hover' }"
              ref="cascaderMallCatergory"
              filterable
              clearable
              :show-all-levels="false"
              :options="pattenOption"
              v-model="filterForm.patten">
            </el-cascader>
          </el-form-item>
          <el-form-item label="操作人員" prop="name">
            <el-input v-model="filterForm.name" placeholder="輸入操作人員" clearable />
          </el-form-item>
        </div>
        <el-button v-if="store.state.show.read" :icon="Search" type="primary" @click="getData(filterFormRef)" class="!flex w-full sm:w-56 mx-auto">點我查詢</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card" v-loading="store.state.progressing">
      <template #header>
        <div class="card-header flex justify-between items-center">
          <span>查詢結果</span>
        </div>
      </template>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="🦄 異 動 資 料" name="excute">
          <el-table :data="store.state.table" :flexible="true" border>
            <el-table-column prop="opTime" label="操作時間">
              <template #default="scope">{{ formatDateYMDhms(scope.row.opTime) }}</template>
            </el-table-column>
            <el-table-column prop="opName" label="操作人員" />
            <el-table-column prop="pattenName" label="功能" />
            <el-table-column prop="permission" label="動作">
              <template #default="scope">{{ permissionFilters(scope.row.permission) }}</template>
            </el-table-column>
            <el-table-column label="#" fixed="right" width="110" align="center">
              <template #default="scope">
                <el-button-group>
                  <el-button v-if="!store.state.show.detail" :icon="Hide" round disabled>無權限</el-button>
                  <el-tooltip v-if="store.state.show.detail" class="box-item" effect="dark" content="瀏覽" placement="top" :hide-after="0">
                    <el-button @click="store.dispatch('action', {type:'view', id:scope.row.id});listType='excute'" :icon="View" />
                  </el-tooltip>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="store.state.table.length>0"
            @size-change="(val:number)=>store.dispatch('handleSizeChange', { http, path: path + '/excute', data, val })"
            @current-change="(val:number)=>store.dispatch('handleCurrentChange', { http, path: path + '/excute', data, val })"
            v-model:current-page="store.state.page"
            v-model:page-size="store.state.pageSize"
            :page-sizes="[10, 25, 50, 100]"
            :total="store.state.total"
            layout="total, sizes, prev, pager, next"
            class="flex flex-wrap justify-center mt-4">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="👻 查 詢 資 料" name="query">
          <el-table :data="store.state.tableQ" :flexible="true" border>
            <el-table-column prop="opTime" label="操作時間">
              <template #default="scope">{{ formatDateYMDhms(scope.row.opTime) }}</template>
            </el-table-column>
            <el-table-column prop="opName" label="操作人員" />
            <el-table-column prop="pattenName" label="功能" />
            <el-table-column prop="permission" label="動作">
              <template #default="scope">{{ permissionFilters(scope.row.permission) }}</template>
            </el-table-column>
            <el-table-column label="#" fixed="right" width="110" align="center">
              <template #default="scope">
                <el-button-group>
                  <el-button v-if="!store.state.show.detail" :icon="Hide" round disabled>無權限</el-button>
                  <el-tooltip v-if="store.state.show.detail" class="box-item" effect="dark" content="瀏覽" placement="top" :hide-after="0">
                    <el-button @click="store.dispatch('action', {type:'view', id:scope.row.id});listType='query'" :icon="View" />
                  </el-tooltip>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="store.state.tableQ.length>0"
            @size-change="(val:number)=>store.dispatch('handleSizeChange', { http, path: path + '/query', data:dataQ, val })"
            @current-change="(val:number)=>store.dispatch('handleCurrentChange', { http, path: path + '/query', data:dataQ, val })"
            v-model:current-page="store.state.pageQ"
            v-model:page-size="store.state.pageSizeQ"
            :page-sizes="[10, 25, 50, 100]"
            :total="store.state.totalQ"
            layout="total, sizes, prev, pager, next"
            class="flex flex-wrap justify-center mt-4">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </el-space>
  <el-dialog v-model="store.state.modalOpen" :title="store.getters.actionTitle" :append-to-body="true" :close-on-click-modal="false" width="95%" style="max-width: 600px;">
    <LogForm :key="listType+store.state.actionId" @toggle-modal="v=>store.commit('updateModalOpen', v)" :type="store.state.actionType" :id="store.state.actionId" :path="path" :listType="listType" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from '../../store/store'
import { useRoute } from 'vue-router'
import { Search, View, Hide } from '@element-plus/icons-vue'
import { ElMessage, FormInstance } from 'element-plus'
import LogForm from '../../components/system/LogForm.vue'
import { permissionFilters, notLargeThenEnd, notLessThenStart, dateInputmode, formatDateYMDhms } from '../../utils/mixin'

import { injectStrict } from '../../utils/injectTyped'
import { AxiosKey } from '../../utils/symbols'
const http = injectStrict(AxiosKey)

const route = useRoute()
const store = useStore()
const path = ref(route.path)
const listType = ref('')
onMounted(() => {
  dateInputmode()
  document.querySelector('.el-cascader input')?.setAttribute('inputmode', 'none')
})

// tabs
const activeTab = ref('excute')
// form
const filterFormRef = ref<FormInstance>()
const filterForm: any = reactive({
  dateStart: new Date().toISOString().slice(0, 10),
  dateEnd: new Date().toISOString().slice(0, 10),
  patten: [],
  name: ''
})
const rules = computed(() => {
  return {
    dateStart: [
      { required: true, message: '請選擇開始日', trigger: 'change' },
      { validator: (rule:any, value:any, callback: any) => notLargeThenEnd(rule, value, callback, filterForm.dateEnd), trigger: 'blur' }
    ],
    dateEnd: [
      { required: true, message: '請選擇結束日', trigger: 'change' },
      { validator: (rule:any, value:any, callback: any) => notLessThenStart(rule, value, callback, filterForm.dateStart), trigger: 'blur' }
    ],
    patten: [
      { required: true, message: '請選擇功能', trigger: 'change' }
    ]
  }
})
const pattenOption = ref([])
http.get('/permission/info/option').then((res) => {
  pattenOption.value = res.data
}).catch(e => {
  ElMessage.error(e.toString())
})
// data
const data = computed(() => {
  const obj: any = {
    page: store.state.page,
    pageSize: store.state.pageSize,
    companyId: 0
  }
  if (filterForm.dateStart !== null) {
    obj.dateStart = filterForm.dateStart
  }
  if (filterForm.dateEnd !== null) {
    obj.dateEnd = filterForm.dateEnd
  }
  if (filterForm.patten.length > 0) {
    obj.pattenCode = filterForm.patten[0] + '.' + filterForm.patten[1]
  }
  if (filterForm.name.length > 0) {
    obj.name = filterForm.name
  }
  return obj
})
const dataQ = computed(() => {
  const obj: any = {
    page: store.state.page,
    pageSize: store.state.pageSize,
    companyId: 0
  }
  if (filterForm.dateStart !== null) {
    obj.dateStart = filterForm.dateStart
  }
  if (filterForm.dateEnd !== null) {
    obj.dateEnd = filterForm.dateEnd
  }
  if (filterForm.patten.length > 0) {
    obj.pattenCode = filterForm.patten[0] + '.' + filterForm.patten[1]
  }
  if (filterForm.name.length > 0) {
    obj.name = filterForm.name
  }
  return obj
})
const getData = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      await store.dispatch('getData', { http, path: path.value + '/excute', data: data.value })
      await store.dispatch('getData', { http, path: path.value + '/query', data: dataQ.value })
    }
  })
}
</script>
