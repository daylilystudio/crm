<template>
  <el-space :size="20" :fill="true" class="w-full px-4">
    <el-card class="box-card" v-loading="store.state.progressing">
      <template #header>
        <div class="card-header">Information</div>
      </template>
      <el-descriptions class="hidden sm:block" :column="2" border>
        <el-descriptions-item v-for="item in profile" :key="item" :label="item.title">{{ item.val }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="block sm:hidden" :column="1" border direction="vertical">
        <el-descriptions-item v-for="item in profile" :key="item" :label="item.title">{{ item.val }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="box-card" v-loading="store.state.progressing">
      <template #header>
        <div class="card-header">Change Password</div>
      </template>
      <el-form @keyup.enter="saveData(passwordFormRef)" :model="passwordForm" ref="passwordFormRef" class="flex flex-col sm:flex-row sm:gap-4" @submit.prevent>
        <el-form-item prop="old" class="flex-1">
          <el-input
            type="password"
            v-model="passwordForm.old"
            maxlength="20"
            placeholder="Old Password"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" :rules="[{ required: true, min: 8, max: 20, message: 'length between 8-12', trigger: 'blur' },{ validator: onlyAllowLettersAndDigits, trigger: 'blur' }]" class="flex-1">
          <el-input
            type="password"
            v-model="passwordForm.password"
            maxlength="20"
            placeholder="New Password"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="passwordAgain" :rules="[{ required: true, min: 8, max: 20, message: 'length between 8-12', trigger: 'blur' },{ validator: sameAsPassword, trigger: 'blur' }]" class="flex-1">
          <el-input
            type="password"
            v-model="passwordForm.passwordAgain"
            maxlength="20"
            placeholder="New Password Again"
            clearable>
          </el-input>
        </el-form-item>
        <el-button @click="saveData(passwordFormRef)" type="primary" class="!block ml-auto">Save</el-button>
      </el-form>
    </el-card>
  </el-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../store/store'
import { useRoute } from 'vue-router'
import { FormInstance } from 'element-plus'
import { formatDateYMD, onlyAllowLettersAndDigits } from '../utils/mixin'

import { injectStrict } from '../utils/injectTyped'
import { AxiosKey } from '../utils/symbols'
const http = injectStrict(AxiosKey)

const store = useStore()
const route = useRoute()
const profile: any = ref([])

// getData
store.commit('updateProgressing', true)
http.get('/profile').then((res) => {
  store.commit('updateProgressing', false)
  profile.value.push({
    title: 'Number', val: res.data.username
  }, {
    title: 'Name', val: res.data.name
  }, {
    title: 'Company', val: res.data.company.name
  }, {
    title: 'Department', val: res.data.dept.name
  }, {
    title: 'Entry Date', val: formatDateYMD(res.data.applyDate)
  })
}).catch(() => {
  store.commit('updateProgressing', false)
  // test
  profile.value = [{ title: 'Number', val: '1111' }, { title: 'Name', val: 'Test' }, { title: 'Company', val: 'Test Company' }, { title: 'Department', val: 'Marketing' }]
})

// password
const passwordFormRef = ref<FormInstance>()
const passwordForm = ref({
  id: route.params.id,
  old: '',
  password: '',
  passwordAgain: ''
})
const sameAsPassword = (rule:string, value:string, callback:any) => {
  if (value === passwordForm.value.password) {
    callback()
  } else {
    callback(new Error('Password must be the same'))
  }
}
const saveData = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      const data = {
        newPassword: passwordForm.value.password,
        oldPassword: passwordForm.value.old
      }
      store.dispatch('changePassword', { http, data })
    }
  })
}
</script>
