<script setup lang="ts">
import VerifyCode from '../components/verify/VerifyCode.vue'
import jwtDecode from 'jwt-decode'
import { ref } from 'vue'
import { injectStrict } from '../utils/injectTyped'
import { AxiosKey } from '../utils/symbols'
import { useStore } from '../store/store'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const http = injectStrict(AxiosKey)
const store = useStore()
const router = useRouter()

const progressing = ref(false)
const loginForm = ref({
  username: '',
  password: ''
})
const componentKey = ref(0)

const login = () => {
  // not complete
  if (loginForm.value.username === '' || loginForm.value.password === '') {
    ElMessage.error('Please enter account or password')
    return
  }
  progressing.value = true
  // just for portfolio
  if (store.state.testModel) {
    const user = { roles: 'admin', jti: '884e83b5-95ba-4c91-9482-046a66e9e502', iss: 'webApi', sub: 'admin', exp: 1678699511, nbf: 1678692311, iat: 1678692311, id: '1', name: 'Administrator', permission: { Block: [{ Name: 'Company', Code: 'company', Index: '1', Patten: [{ Name: 'Company Maintain', Code: 'info', Index: '1-1', Permission: ['create', 'read', 'delete', 'update', 'detail'] }] }, { Name: 'Department', Code: 'dept', Index: '2', Patten: [{ Name: 'Type Maintain', Code: 'type', Index: '2-1', Permission: ['create', 'read', 'delete', 'update', 'detail'] }, { Name: 'Department Maintain', Code: 'info', Index: '2-2', Permission: ['detail', 'create', 'read', 'delete', 'update'] }] }, { Name: 'Member', Code: 'personnel', Index: '3', Patten: [{ Name: 'Member Maintain', Code: 'info', Index: '3-1', Permission: ['detail', 'create', 'read', 'delete', 'update'] }] }, { Name: 'Role Manage', Code: 'role', Index: '4', Patten: [{ Name: 'Role Maintain', Code: 'info', Index: '4-1', Permission: ['create', 'read', 'delete', 'update', 'detail'] }] }, { Name: 'Permission Manage', Code: 'permission', Index: '5', Patten: [{ Name: 'Member Permission', Code: 'assign', Index: '5-1', Permission: ['read', 'update', 'roleDetail', 'detail', 'roleUpdate'] }, { Name: 'Role Permission', Code: 'assignRole', Index: '5-2', Permission: ['update', 'detail', 'read'] }] }, { Name: 'Customer Manage', Code: 'customer', Index: '6', Patten: [{ Name: 'Insurance Needs', Code: 'application', Index: '6-1', Permission: ['detail', 'read', 'assign', 'update'] }] }, { Name: 'System Manage', Code: 'system', Index: '7', Patten: [{ Name: 'Operation Record', Code: 'log', Index: '7-1', Permission: ['read', 'detail'] }] }] }, username: 'admin', companyId: '1', companyCode: 'TestCompany', companyName: 'TestCompany', superUser: true }
    if (loginForm.value.username === 'admin' && loginForm.value.password === '1234') {
      store.commit('updateUser', user)
      router.push('/')
    }
    if (loginForm.value.username !== 'admin') ElMessage.error('wrong account')
    if (loginForm.value.password !== '1234') ElMessage.error('wrong password')
    progressing.value = false
    return
  }
  // real situation
  http.post('/auth', {
    username: loginForm.value.username,
    password: loginForm.value.password
  }).then(async (response) => {
    progressing.value = false
    const authToken = response.data.auth_token
    http.defaults.headers.common.Authorization = `Bearer ${authToken}`
    await store.dispatch('login', {
      authToken,
      user: jwtDecode(authToken)
    })
    // console.log(jwtDecode(authToken))
    // console.log(store.state)
    if (response.data.needChangePWD) {
      await ElMessageBox.prompt('The password has been used for more than six months, please change it.', 'Reset Password', {
        type: 'warning',
        showClose: false,
        closeOnClickModal: false,
        showCancelButton: false,
        inputPlaceholder: 'Enter new password',
        inputPattern: /^[A-Za-z0-9_]{8,20}$/,
        inputErrorMessage: '8~20, only English, number, underscore',
        confirmButtonText: 'It is correct, confirm !',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            const res = await store.dispatch('changePassword', { http, data: { newPassword: instance.inputValue, oldPassword: loginForm.value.password } })
            if (res) {
              done()
              loginForm.value.password = ''
              componentKey.value++
              ElMessage({ type: 'warning', message: 'Login again🤟', duration: 5000 })
            } else {
              instance.confirmButtonLoading = false
            }
          }
        }
      })
    } else {
      router.push('/')
    }
  }).catch((e) => {
    progressing.value = false
    ElMessage.error(e.response.data)
    if (e.response.status === 400) {
      // re-render VerifyCode component
      componentKey.value += 1
    }
  })
}
</script>

<template>
  <main class="h-full flex flex-col justify-center items-center">
    <p class="flex items-center text-3xl mt-4 mb-10">
      <img src="../assets/logo.svg" width="48" class="mr-3"/> PARTNER SYSTEM
    </p>
    <el-form :model="loginForm" v-loading="progressing" size="large" class="login-form" ref="loginFormRef" @submit.prevent>
      <el-form-item prop="username" :rules="[{ required: true, message: 'Please enter account', trigger: 'blur' }]">
        <el-input
          type="text"
          v-model="loginForm.username"
          minlength="8"
          maxlength="50"
          placeholder="Account : admin"
          class="login-input"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" :rules="[{ required: true, message: 'Please enter password', trigger: 'blur' }]">
        <el-input
          type="password"
          v-model="loginForm.password"
          minlength="8"
          maxlength="50"
          placeholder="Password : 1234"
          class="login-input"
          clearable>
        </el-input>
      </el-form-item>
      <VerifyCode ref="verify" :key="componentKey" @success="login()" check-text="Login " :type="'1'" height="40px" />
    </el-form>
  </main>
</template>

<style>
  .login-form {
    width: 420px;
    max-width: 90%;
  }
</style>
