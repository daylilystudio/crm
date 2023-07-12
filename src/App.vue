<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'vue-router'
import { useStore } from './store/store'
import { injectStrict } from './utils/injectTyped'
import { AxiosKey } from './utils/symbols'
import { ElMessage } from 'element-plus'
import { Moon, Sunny } from '@element-plus/icons-vue'

const store = useStore()
const router = useRouter()
const http = injectStrict(AxiosKey)
const dark = ref(false)
watch(dark, () => {
  document.querySelector('html')?.classList.toggle('dark')
})

onBeforeMount(() => {
  const authToken = sessionStorage.getItem('authToken')
  if (authToken && authToken !== null) {
    let user
    try {
      user = jwtDecode(authToken)
    } catch (error) {
      router.push('/login')
      return
    }
    store.dispatch('login', {
      authToken,
      user
    })
    http.defaults.headers.common.Authorization = `Bearer ${authToken}`
  } else {
    router.push('/login')
  }
  http.interceptors.request.use(function (config) {
    return config
  }, function (error) {
    return Promise.reject(error)
  })
  http.interceptors.response.use((response) => {
    return response
  }, (error) => {
    switch (error.response.status) {
      case 401:
        if (sessionStorage.getItem('authToken')) {
          ElMessage.error('金鑰過期，請重新登入。')
        } else {
          ElMessage.error('尚未登入，請先登入。')
        }
        sessionStorage.removeItem('authToken')
        router.push('/login')
        return
      default:
        return Promise.reject(error)
    }
  })
})
</script>

<template>
  <router-view/>
  <el-switch
    v-model="dark"
    class="!fixed right-2 top-3 z-50"
    style="--el-switch-on-color: #2C2C2C;--el-switch-off-color: #ccc;"
    inline-prompt
    :active-icon="Moon"
    :inactive-icon="Sunny"
  />
</template>
