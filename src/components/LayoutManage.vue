<template>
  <nav class="fixed w-full top-0 left-0 z-50" style="background-image: radial-gradient(transparent 1px,var(--el-bg-color) 1px);background-size: 4px 4px;backdrop-filter: saturate(50%) blur(4px);">
    <el-menu
      class="items-center h-14"
      mode="horizontal"
      background-color="rgba(0,0,0,.08)"
      :router="true"
      :ellipsis="false"
    >
      <el-button @click="isCollapse=!isCollapse" :icon="Menu" class="mx-2 !px-2 sm:!px-3" title="Menu" type="info" plain round />
      <router-link to="/" class="flex items-center text-sm sm:text-base">Partner CRM</router-link>
      <div class="flex-grow" />
      <el-button-group class="mr-16">
        <el-button @click="router.push('/profile/' + store.state.user.id);isMobile()" :icon="Avatar" title="view profile" plain round>{{ store.state.user.username }}</el-button>
        <el-button @click="logout()" plain round>Logout</el-button>
      </el-button-group>
    </el-menu>
  </nav>
  <el-scrollbar
    :class="(isCollapse?'-translate-x-full':'translate-x-0')"
    class="sidebar !fixed top-14 bottom-0 left-0 !overflow-y-auto z-20 duration-300"
    style="background-color: var(--el-bg-color);height: auto;"
  >
    <el-menu
      size="large"
      default-active="2"
      class="el-menu-vertical w-64"
    >
      <el-sub-menu :index="item.Index" v-for="item in routeList" :key="item.Code">
        <template #title><component :is="icon[item.Code]" class="w-4 mr-1 !text-gray-400"/>{{ item.Name }}</template>
        <el-menu-item @click="router.push(`/${item.Code}/${subItem.Code}`);isMobile()" :index="subItem.Index" v-for="subItem in item.Patten" :key="'children_' + subItem.Code">
          <a>{{ subItem.Name }}</a>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
  <!-- mobile-mask -->
  <div @click="isCollapse=true" class="el-loading-mask !fixed !z-10 sm:hidden" :class="{'hidden':isCollapse}" />
  <!-- mobile-mask end -->
  <main class="pb-8 pt-14 w-full h-full duration-300" :class="{'sm:pl-64':!isCollapse}">
    <el-breadcrumb separator="/" class="mt-3 mb-6 px-4">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <template v-if="path!=='/' && breadcrumb">
        <el-breadcrumb-item>{{ breadcrumb.Name }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="breadcrumbChild">{{ breadcrumbChild.Name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <router-view />
    <el-empty v-if="route.path==='/'" description="⇠ click the function you want to use" />
  </main>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeMount } from 'vue'
import { block, useStore } from '../store/store'
import { injectStrict } from '../utils/injectTyped'
import { AxiosKey } from '../utils/symbols'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { Menu, Avatar, OfficeBuilding, Suitcase, User, Medal, Unlock, Document, Setting } from '@element-plus/icons-vue'
const router = useRouter()
const route = useRoute()
const http = injectStrict(AxiosKey)

const store = useStore()
const isCollapse = ref(false)
const breadcrumb = ref<block>()
const breadcrumbChild = ref()
const path = ref('')
onBeforeMount(() => {
  if (routeList.value.length === 0) return
  path.value = route.path
  getBreadcrumb(path.value)
})
onBeforeRouteUpdate((to) => {
  path.value = to.path
  getBreadcrumb(path.value)
  // reset
  store.commit('updatePage', 1)
  store.commit('updatePageSize', 10)
  store.commit('updateTable', [])
  store.commit('updatePageQ', 1)
  store.commit('updatePageSizeQ', 10)
  store.commit('updateTableQ', [])
})
const getBreadcrumb = (routeStr: string) => {
  const pathArr = routeStr.split('/')
  pathArr.shift()
  if (pathArr.length > 1) {
    if (pathArr[0] === 'profile') {
      breadcrumb.value = { Name: 'Personal Information', Code: '', Index: '', Patten: [] }
      breadcrumbChild.value = ''
    } else {
      breadcrumb.value = routeList.value.filter((item:block):boolean => item.Code === pathArr[0])[0]
      breadcrumbChild.value = breadcrumb.value.Patten.filter((item) => item.Code === pathArr[1])[0]
    }
    permission()
  }
}
const permission = () => {
  const toshow:any = {
    create: false,
    read: false,
    delete: false,
    update: false,
    detail: false,
    roleUpdate: false,
    roleDetail: false,
    assign: false
  }
  if (breadcrumbChild.value !== '') {
    breadcrumbChild.value.Permission.forEach((item:string) => {
      toshow[item] = true
    })
  }
  store.commit('updateShow', toshow)
}

const routeList = computed(() => {
  // account permissions's menu
  const pms = store.state.user.permission.Block
  return pms
})
const logout = () => {
  http.defaults.headers.common.Authorization = ''
  store.dispatch('login', {
    authToken: '',
    user: {
      permission: {
        Block: []
      }
    }
  })
  router.push('/login')
}
const isMobile = () => {
  if (window.innerWidth < 640) {
    isCollapse.value = true
  }
}
// change page loading
router.beforeEach(() => {
  store.commit('updateProgressing', true)
})
router.afterEach(() => {
  store.commit('updateProgressing', false)
})
// menu icon
const icon: any = {
  company: OfficeBuilding,
  dept: Suitcase,
  personnel: User,
  role: Medal,
  permission: Unlock,
  customer: Document,
  system: Setting
}
</script>

<style lang="scss" scoped>
.open {
  --el-menu-icon-width:0;
  --el-menu-base-level-padding:0
}
.sidebar :deep(.el-scrollbar__wrap) {
  border-right: solid 1px var(--el-menu-border-color);
  .el-menu {
    border-right: 0;
  }
}
</style>
