// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'

export interface patten {
  Code: string,
  Index: string,
  Name: string,
  Permission: Array<string>
}

export interface block {
  Code: string,
  Index: string,
  Name: string,
  Patten: Array<patten>
}

export interface State {
  testModel: boolean,
  progressing: boolean,
  show: {
    create: boolean,
    read: boolean,
    delete: boolean,
    update: boolean,
    detail: boolean,
    roleUpdate: boolean,
    roleDetail: boolean,
    assign: boolean
  },
  user: {
    companyId: string,
    permission: {
      Block: Array<block>
    }
    id: number,
    superUser: boolean,
    username: string
  },
  authToken: string,
  table: Array<any>,
  page: number,
  pageSize: number,
  total: number,
  tableQ: Array<any>,
  pageQ: number,
  pageSizeQ: number,
  totalQ: number,
  modalOpen: boolean,
  actionType: string,
  actionId: number,
  company: Array<{id:number, [propName: string]: any}>
}

// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    testModel: true,
    // Status
    progressing: false,
    show: {
      create: false,
      read: false,
      delete: false,
      update: false,
      detail: false,
      roleUpdate: false,
      roleDetail: false,
      assign: false
    },
    // user info
    user: {
      companyId: '',
      permission: {
        Block: []
      },
      id: NaN,
      superUser: false,
      username: ''
    },
    authToken: sessionStorage.getItem('authToken') || '',
    // list
    table: [],
    page: 1,
    pageSize: 10,
    total: 0,
    // list query
    tableQ: [],
    pageQ: 1,
    pageSizeQ: 10,
    totalQ: 0,
    // Modal
    modalOpen: false,
    actionType: '',
    actionId: 0,
    // common data
    company: []
  },
  mutations: {
    updateProgressing (state, data) {
      state.progressing = data
    },
    updateShow (state, data) {
      state.show = data
    },
    updateUser (state, data) {
      state.user = data
    },
    updateTable (state, data) {
      state.table = data
    },
    updatePage (state, data) {
      state.page = data
    },
    updatePageSize (state, data) {
      state.pageSize = data
    },
    updateTotal (state, data) {
      state.total = data
    },
    updateTableQ (state, data) {
      state.tableQ = data
    },
    updatePageQ (state, data) {
      state.pageQ = data
    },
    updatePageSizeQ (state, data) {
      state.pageSizeQ = data
    },
    updateTotalQ (state, data) {
      state.totalQ = data
    },
    updateModalOpen (state, data) {
      state.modalOpen = data
    },
    updateActionType (state, data) {
      state.actionType = data
    },
    updateActionId (state, data) {
      state.actionId = data
    },
    updateCompany (state, data) {
      state.company = data
    }
  },
  actions: {
    login (context, payload) {
      sessionStorage.setItem('authToken', payload.authToken)
      context.commit('updateUser', payload.user)
    },
    async changePassword (context, payload) {
      // test
      if (store.state.testModel) return
      // actual
      await context.commit('updateProgressing', true)
      const data = await payload.http.put('/profile', payload.data).then(() => {
        context.commit('updateProgressing', false)
        ElMessage.success('Change password success !')
        return true
      }).catch((e: any) => {
        context.commit('updateProgressing', false)
        ElMessage.error(e.response.data)
        return false
      })
      return data
    },
    async getData (context, payload) {
      // test
      if (store.state.testModel) return
      // actual
      await context.commit('updateProgressing', true)
      const data = await payload.http.get(payload.path, { params: payload.data }).then((res: any) => {
        context.commit('updateProgressing', false)
        const updateTable = payload.path === '/system/log/query' ? 'updateTableQ' : 'updateTable'
        const updateTotal = payload.path === '/system/log/query' ? 'updateTotalQ' : 'updateTotal'
        context.commit(updateTable, res.data.result)
        context.commit(updateTotal, res.data.totalCount)
        // console.log('查詢資料', res)
        return res
      }).catch((e: any) => {
        context.commit('updateProgressing', false)
        ElMessage.error(e.toString())
        return false
      })
      return data
    },
    async getModalData (context, payload) {
      // test
      if (store.state.testModel) return
      // actual
      await context.commit('updateProgressing', true)
      const data = await payload.http.get(`${payload.path}/${payload.id}`).then((res: any) => {
        context.commit('updateProgressing', false)
        // console.log('Modal資料', res)
        return res
      }).catch((e: any) => {
        context.commit('updateProgressing', false)
        ElMessage.error(e.toString())
        return false
      })
      return data
    },
    async getCompany (context, payload) {
      // test
      if (store.state.testModel) return
      // actual
      const data = await payload.http.get('company/info/option').then((res: any) => {
        context.commit('updateCompany', res.data)
        return res
      }).catch((e: any) => {
        ElMessage.error(e.toString())
        return false
      })
      return data
    },
    action (context, payload) {
      context.commit('updateModalOpen', true)
      context.commit('updateActionType', payload.type)
      context.commit('updateActionId', payload.id)
    },
    saveData (context, payload) {
      payload.ref.validate((valid:any) => {
        if (valid) {
          context.commit('updateProgressing', true)
          let promise
          // edit
          if (payload.form.id > 0) {
            const data = {
              ...payload.form
            }
            promise = payload.http.put(`${payload.path}/${payload.form.id}`, data)
          // add
          } else {
            delete payload.form.id
            const data = {
              ...payload.form
            }
            promise = payload.http.post(payload.path, data)
          }
          // test
          if (store.state.testModel) return
          // actual
          promise.then((res: any) => {
            // console.log('儲存資料後的res', res)
            context.commit('updateProgressing', false)
            ElMessage.success({ message: '資料已儲存成功', grouping: true })
            if (!payload.path.match(/assign/)) context.commit('updateActionType', 'view') // 存權限設定，不變更燈箱狀態
            document.querySelector('.el-overlay-dialog')?.scrollTo({ top: 0, behavior: 'smooth' })
            if (res.status !== 204) context.commit('updateActionId', res.data.result)
          }).catch((e: any) => {
            context.commit('updateProgressing', false)
            ElMessage.error(e.toString())
          })
        } else {
          ElMessage.error('請檢查欄位是否有誤')
        }
      })
    },
    handleDelete (context, payload) {
      ElMessageBox.confirm('confirm to delete?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            // test
            if (store.state.testModel) done()
            // actual
            instance.confirmButtonLoading = true
            instance.confirmButtonText = 'Loading...'
            await payload.http.delete(`${payload.path}/${payload.row.id}`).then(() => {
              instance.confirmButtonLoading = false
              context.dispatch('getData', { http: payload.http, path: payload.path, data: payload.data })
              ElMessage.success('Delete Success')
              done()
            }).catch((e: any) => {
              instance.confirmButtonLoading = false
              ElMessage.error(e.toString())
            })
          } else {
            done()
          }
        }
      }).then(() => {
        // when MessageBox press OK
      }).catch(() => {
        // when MessageBox press Cancel
      })
    },
    handleSizeChange (context, payload) {
      const updatePageSize = payload.path === '/system/log/query' ? 'updatePageSizeQ' : 'updatePageSize'
      context.commit(updatePageSize, payload.val)
      context.dispatch('getData', { http: payload.http, path: payload.path, data: payload.data })
    },
    handleCurrentChange (context, payload) {
      const updatePage = payload.path === '/system/log/query' ? 'updatePageQ' : 'updatePage'
      context.commit(updatePage, payload.val)
      context.dispatch('getData', { http: payload.http, path: payload.path, data: payload.data })
    }
  },
  getters: {
    actionTitle: state => {
      const str = state.actionType === 'add' ? '新增' : state.actionType === 'edit' ? '編輯' : state.actionType === 'view' ? '瀏覽' : '權限設定'
      return str
    }
  }
})

// Define `useStore` composite function
export function useStore () {
  return baseUseStore(key)
}
