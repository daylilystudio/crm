<template>
  <el-space :size="20" :fill="true" class="w-full px-4">
    <el-card class="box-card" v-loading="store.state.progressing">
      <template #header>
        <div class="card-header">Search Filter</div>
      </template>
      <el-form label-position="left">
        <div class="grid sm:gap-x-8 sm:grid-cols-2">
          <el-form-item label="所屬公司" prop="company.id" v-if="store.state.user.superUser">
            <el-select v-model="filterForm.company.id" placeholder="Please Choose" filterable>
              <el-option
                v-for="item in store.state.company"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部門代號" prop="code">
            <el-input v-model="filterForm.code" placeholder="Enter 部門代號" maxlength="20" clearable />
          </el-form-item>
          <el-form-item label="部門Name" prop="name">
            <el-input v-model="filterForm.name" placeholder="Enter 部門Name" clearable />
          </el-form-item>
        </div>
        <el-button v-if="store.state.show.read" :icon="Search" type="primary" @click="store.dispatch('getData', { http, path, data })" class="!flex w-full sm:w-56 mx-auto">Search</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card" v-loading="store.state.progressing">
      <template #header>
        <div class="card-header flex justify-between items-center">
          <span>Result</span>
          <el-button v-if="store.state.show.create" @click="store.dispatch('action', {type:'add', id:0})" :icon="Plus" type="primary" plain>Add部門</el-button>
        </div>
      </template>
      <el-table :data="store.state.table" :flexible="true" border>
        <el-table-column prop="code" label="部門 ID" />
        <el-table-column prop="name" label="部門Name" />
        <el-table-column prop="principal.name" label="負責人" />
        <el-table-column label="Operate" fixed="right" width="150" align="center">
          <template #default="scope">
            <el-button-group>
              <el-button v-if="!store.state.show.detail" :icon="Hide" round disabled>無權限</el-button>
              <el-tooltip v-if="store.state.show.detail" class="box-item" effect="dark" content="瀏覽" placement="top" :hide-after="0">
                <el-button @click="store.dispatch('action', {type:'view', id:scope.row.id})" :icon="View" />
              </el-tooltip>
              <el-tooltip v-if="store.state.show.update" class="box-item" effect="dark" content="編輯" placement="top" :hide-after="0">
                <el-button @click="store.dispatch('action', {type:'edit', id:scope.row.id})" :icon="EditPen" />
              </el-tooltip>
              <el-tooltip v-if="store.state.show.delete" class="box-item" effect="dark" content="刪除" placement="top" :hide-after="0">
                <el-button @click="store.dispatch('handleDelete', { http, path, data, row:scope.row })" :icon="Delete" type="danger" plain />
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
  <el-dialog v-model="store.state.modalOpen" :title="store.getters.actionTitle" :append-to-body="true" :close-on-click-modal="false" width="95%" style="max-width: 600px;">
    <InfoForm :key="store.state.actionType+store.state.actionId" @toggle-modal="v=>store.commit('updateModalOpen', v)" :type="store.state.actionType" :id="store.state.actionId" :path="path" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { useStore } from '../../store/store'
import { useRoute } from 'vue-router'
import { Search, Plus, View, EditPen, Delete, Hide } from '@element-plus/icons-vue'
import InfoForm from '../../components/dept/InfoForm.vue'

import { injectStrict } from '../../utils/injectTyped'
import { AxiosKey } from '../../utils/symbols'
const http = injectStrict(AxiosKey)

const route = useRoute()
const store = useStore()
const path = ref(route.path)

// form
const filterForm: any = reactive({
  code: '',
  name: '',
  company: {
    id: null
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
    page: store.state.page,
    pageSize: store.state.pageSize
  }
  if (filterForm.code.length > 0) {
    obj.code = filterForm.code
  }
  if (filterForm.name.length > 0) {
    obj.name = filterForm.name
  }
  if (filterForm.company.id > 0) {
    obj.companyId = filterForm.company.id
  }
  return obj
})
</script>
