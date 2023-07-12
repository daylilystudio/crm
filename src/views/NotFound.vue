<template>
  <div class="w-full h-full flex flex-col items-center justify-center gap-4">
    <el-empty description="- Not Found -">
      <el-button @click="router.push('/')" type="danger">Back to Home</el-button>
    </el-empty>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
