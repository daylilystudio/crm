<template>
  <el-space :size="20" :fill="true" class="w-full px-4">
    <el-card class="box-card" v-loading="store.state.progressing">
      <template #header>
        <div class="card-header">Search Filter</div>
      </template>
      <el-form :rules="rules" :model="filterForm" label-position="left">
        <div class="grid sm:gap-x-8 sm:grid-cols-2">
          <el-form-item label="公司" prop="company.id" v-if="store.state.user.superUser">
            <el-select v-model="filterForm.company.id" placeholder="Please Choose" filterable>
              <el-option
                v-for="item in store.state.company"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="聯絡人" prop="name">
            <el-input v-model="filterForm.name" placeholder="Enter Name" clearable />
          </el-form-item>
          <el-form-item label="Phone" prop="phone">
            <el-input v-model="filterForm.phone" placeholder="Enter Phone" clearable />
          </el-form-item>
          <el-form-item label="提出開始日" prop="dateStart">
            <el-date-picker
              v-model="filterForm.dateStart"
              type="date"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              placeholder="開始日" />
          </el-form-item>
          <el-form-item label="提出結束日" prop="dateEnd">
            <el-date-picker
              v-model="filterForm.dateEnd"
              type="date"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              placeholder="結束日" />
          </el-form-item>
        </div>
        <el-button v-if="store.state.show.read" :icon="Search" type="primary" @click="store.dispatch('getData', { http, path, data })" class="!flex w-full sm:w-56 mx-auto">Search</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card" v-loading="store.state.progressing">
      <template #header>
        <div class="card-header flex justify-between items-center">
          <span>Result</span>
        </div>
      </template>
      <el-table :data="store.state.table" :flexible="true" border>
        <el-table-column prop="id" label="編號" width="65" />
        <el-table-column prop="seller.name" :label="store.state.show.assign?'指派業務員':'業務員'" width="110">
          <template #default="scope">
            <el-button :loading="assignLoading&&assignActive===scope.row.id" @click="assign(scope.row)" :icon="store.state.show.assign&&!scope.row.seller.name?Pointer:null" class="w-full" :class="{'hover:!text-blue-500':store.state.show.assign,'text-center':store.state.show.assign&&!scope.row.seller.name}" :title="store.state.show.assign?'點我指派':''" link>
              {{ scope.row.seller.name }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="聯絡人" width="110" />
        <el-table-column prop="contractTime" label="可聯絡時間" width="100">
          <template #default="scope">{{ scope.row.contactTime === '0' ? '' : scope.row.contactTime }}</template>
        </el-table-column>
        <el-table-column prop="contractArea" label="地區" width="80" />
        <el-table-column prop="phone" label="Phone" width="110" />
        <el-table-column prop="insType" label="需求" />
        <el-table-column prop="remark" label="聯絡狀況" />
        <el-table-column prop="status" label="狀態" width="95">
          <template #default="scope">
            {{ status.filter((item,i)=>scope.row.status === i)[0] }}
          </template>
        </el-table-column>
        <el-table-column prop="fromCompany" label="進件公司" />
        <el-table-column prop="createdAt" label="提出時間" width="130">
          <template #default="scope">{{ formatDateYMD(scope.row.createdAt) }}</template>
        </el-table-column>
        <el-table-column label="Operate" fixed="right" width="110" align="center">
          <template #default="scope">
            <el-button-group>
              <el-button v-if="!store.state.show.detail" :icon="Hide" round disabled>無權限</el-button>
              <el-tooltip v-if="store.state.show.detail" class="box-item" effect="dark" content="瀏覽" placement="top" :hide-after="0">
                <el-button @click="store.dispatch('action', {type:'view', id:scope.row.id})" :icon="View" />
              </el-tooltip>
              <el-tooltip v-if="store.state.show.update" class="box-item" effect="dark" content="變更狀態" placement="top" :hide-after="0">
                <el-button @click="handleStatus(scope.row)" :icon="EditPen" />
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="store.state.table.length>0"
        @size-change="(val:number)=>store.dispatch('handleSizeChange', { http, path, data, val })"
        @current-change="(val:number)=>store.dispatch('handleCurrentChange', { http, path, data, val })"
        v-model:current-page="store.state.page"
        v-model:page-size="store.state.pageSize"
        :page-sizes="[10, 25, 50, 100]"
        :total="store.state.total"
        layout="total, sizes, prev, pager, next"
        class="flex flex-wrap justify-center mt-4">
      </el-pagination>
    </el-card>
  </el-space>
  <!-- 瀏覽 Modal -->
  <el-dialog v-model="store.state.modalOpen" :title="store.getters.actionTitle" :append-to-body="true" :close-on-click-modal="false" width="95%" style="max-width: 600px;">
    <ApplicationForm :key="store.state.actionType+store.state.actionId" @toggle-modal="v=>store.commit('updateModalOpen', v)" :status="status" :type="store.state.actionType" :id="store.state.actionId" :path="path" />
  </el-dialog>
  <!-- 變更狀態 Modal -->
  <el-dialog v-model="statusModalOpen" title="變更案件狀態" :append-to-body="true" :close-on-click-modal="false" width="95%" style="max-width: 460px;">
    <el-form :model="statusForm" v-loading="statusLoading">
      <el-form-item>
        <el-radio-group v-model="statusForm.status">
          <el-radio :label="i" :key="'changeStatus'+i" v-for="(item, i) in status">{{ item }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="remark">
        <el-input v-model="statusForm.remark" maxlength="255" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="聯絡狀況" clearable />
      </el-form-item>
    </el-form>
    <div class="text-right">
      <el-button @click="statusModalOpen=false">Close</el-button>
      <el-button type="primary" @click="savaStatus()">Save</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeMount, h } from 'vue'
import { useStore } from '../../store/store'
import { useRoute } from 'vue-router'
import { Search, View, EditPen, Pointer, Hide } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, ElSelect, ElOption } from 'element-plus'
import ApplicationForm from '../../components/customer/ApplicationForm.vue'
import { notLargeThenEnd, notLessThenStart, dateInputmode, formatDateYMD } from '../../utils/mixin'

import { injectStrict } from '../../utils/injectTyped'
import { AxiosKey } from '../../utils/symbols'
const http = injectStrict(AxiosKey)

const route = useRoute()
const store = useStore()
const path = ref(route.path)
const statusModalOpen = ref(false)
onMounted(() => {
  dateInputmode()
})

// form
const filterForm: any = reactive({
  company: {
    id: null
  },
  name: '',
  phone: '',
  dateStart: null,
  dateEnd: null
})
const rules = computed(() => {
  return {
    dateStart: [
      { validator: (rule:any, value:any, callback: any) => notLargeThenEnd(rule, value, callback, filterForm.dateEnd), trigger: 'blur' }
    ],
    dateEnd: [
      { validator: (rule:any, value:any, callback: any) => notLessThenStart(rule, value, callback, filterForm.dateStart), trigger: 'blur' }
    ]
  }
})
// get company
onBeforeMount(async () => {
  await store.dispatch('getCompany', { http })
  if (store.state.company.length) {
    filterForm.company.id = Number(store.state.user.companyId)
  }
})
// data
const data = computed(() => {
  const obj: any = {
    companyId: filterForm.company.id,
    page: store.state.page,
    pageSize: store.state.pageSize
  }
  if (filterForm.name.length > 0) {
    obj.name = filterForm.name
  }
  if (filterForm.phone.length > 0) {
    obj.phone = filterForm.phone
  }
  if (filterForm.dateStart !== null) {
    obj.dateStart = filterForm.dateStart
  }
  if (filterForm.dateEnd !== null) {
    obj.dateEnd = filterForm.dateEnd
  }
  return obj
})
// assign
const assignLoading = ref(false)
const assignActive = ref(null)
const assign = async (row: any) => {
  if (!store.state.show.assign) return
  assignLoading.value = true
  assignActive.value = row.id
  const assignSeller: any = ref(row.seller.id)
  let list: string[] = []
  const params = { companyId: row.company.id, isCustomerApplication: true }
  await http.get('/personnel/info/option', { params }).then(res => {
    list = res.data
    assignLoading.value = false
  }).catch((e) => {
    assignLoading.value = false
    ElMessage.error(e.toString())
  })
  await ElMessageBox({
    title: '指派業務員',
    message: () => h(
      ElSelect, {
        modelValue: assignSeller.value,
        'onUpdate:modelValue': (val: number) => { assignSeller.value = val },
        filterable: true
      },
      {
        default: () => list.map((item: any) => {
          return h(ElOption, { label: `${item.name} - ${item.dept.name}`, value: item.id, key: item.code })
        })
      }
    )
  }).then(async () => {
    const req = { id: row.id, company: row.company, seller: { id: assignSeller.value } }
    await http.put(path.value + '/assign/' + row.id, req).then(async () => {
      ElMessage.success('指派人員成功')
      await store.dispatch('getData', { http, path: path.value, data: data.value })
    }).catch((e) => {
      ElMessage.error(e.toString())
    })
  }).catch(() => {
    // 按下Cancel後的動作
  })
}
// status
const status = ref(['待處理', '已聯絡', '聯絡中', '已提供資料', '等待回覆', '已受理', '已拒絕', '持續追蹤'])
const statusLoading = ref(false)
const statusForm = reactive({
  id: null,
  company: {
    id: null
  },
  status: 0,
  remark: ''
})
const handleStatus = (row:any) => {
  statusModalOpen.value = true
  statusForm.id = row.id
  statusForm.company.id = row.company.id
  statusForm.status = row.status
  statusForm.remark = row.remark
}
const savaStatus = () => {
  statusLoading.value = true
  http.put(`${path.value}/${statusForm.id}`, statusForm).then(() => {
    statusLoading.value = false
    statusModalOpen.value = false
    ElMessage.success('資料已儲存成功')
    store.dispatch('getData', { http, path: path.value, data: data.value })
  }).catch(e => {
    statusLoading.value = false
    ElMessage.error(e.toString())
  })
}
</script>
