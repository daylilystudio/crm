<template>
  <section class="flex">
    <el-form-item class="flex-1 mr-4">
      <el-input v-model="inputValue" @keydown.enter="checkCode" placeholder="verify code" clearable />
    </el-form-item>
    <div class="flex items-center justify-center rounded"
      :style="{
      'width': width,
      'height': height,
      'font-size': fontSize,
      'background-color': containerBackgroundColor,
      'color': containerColor}">
      <!-- Display String -->
      <span :style="code.style" v-for="(code, index) in codeShow" :key="index">
        {{code.char || code}}
      </span>
    </div>
    <el-button @click="setCode" class="cursor-pointer" :icon="Refresh" />
  </section>
  <div class="mt-4 text-right">
    <el-button @click="checkCode" :icon="ArrowRight" class="self-items-end">{{ checkText }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { codeChars, codeColor1, codeColor2 } from '../verify/lib/util'
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh, ArrowRight } from '@element-plus/icons-vue'

interface codeModel {
  style: string,
  char: string
}
const emit = defineEmits(['success'])
const props = defineProps({
  type: {
    type: String,
    default: '1'
  }, // 位数，仅在type=2时生效
  figure: {
    type: Number,
    default: 100
  }, // 算法，支持加减乘，0为随机，仅在type=2时生效
  arith: {
    type: Number,
    default: 0
  },
  width: {
    type: String,
    default: '150px'
  },
  height: {
    type: String,
    default: '100%'
  },
  fontSize: {
    type: String,
    default: '20px'
  },
  codeLength: {
    type: Number,
    default: 6
  },
  checkText: {
    type: String,
    default: '驗證'
  }
})
const isEnd = ref(false)
const inputValue = ref('')
const containerBackgroundColor = ref('#fff')
const containerColor = ref('#fff')
const codeChose = ref('')
const codeShow = ref([] as Array<codeModel>)

// 設置驗證碼
const setCode = () => {
  if (isEnd.value === false) {
    containerBackgroundColor.value = codeColor1[Math.floor(Math.random() * 3)]
    containerColor.value = codeColor2[Math.floor(Math.random() * 5)]
    inputValue.value = ''
    codeShow.value = [] as Array<codeModel>
    codeChose.value = ''
    if (props.type === '1') {
      // 普通验证码 图片选择
      for (let i = 0; i < props.codeLength; i++) {
        const charNum = Math.floor(Math.random() * 52)
        // var tmpStyle = (charNum % 2 === 0) ? 'font-style:italic;margin-right: 10px' : 'font-weight:bolder'
        let tmpStyle = (charNum % 2 === 0) ? 'font-style:italic;' : 'font-weight:bolder'
        tmpStyle += (Math.floor(Math.random() * 2) === 1) ? 'font-weight:bolder' : ''
        codeChose.value += codeChars[charNum]
        codeShow.value.push({
          style: tmpStyle,
          char: codeChars[charNum] + ''
        })
      }
    } else if (props.type === '2') {
      // 算法验证码
      let num1 = Math.floor(Math.random() * props.figure)
      let num2 = Math.floor(Math.random() * props.figure)
      let codeShowString = ''
      if (props.arith === 0) {
        const tmparith = Math.floor(Math.random() * 3)
        switch (tmparith) {
          case 1 :
            codeChose.value = codeChars[num1 + num2] + ''
            codeShowString = num1 + ' + ' + num2 + ' = ?'
            break
          case 2 :
            if (num1 < num2) {
              const tmpnum = num1
              num1 = num2
              num2 = tmpnum
            }
            codeChose.value = codeChars[num1 - num2] + ''
            codeShowString = num1 + ' - ' + num2 + ' = ?'
            break
          default :
            codeChose.value = codeChars[num1 - num2] + ''
            codeShowString = num1 + ' × ' + num2 + ' = ?'
            break
        }
      }
      const codelist = codeShowString.split('') // 转数组
      codelist.forEach((e) => {
        codeShow.value.push({
          char: e,
          style: ''
        })
      })
    }
  }
}
// 驗證驗證碼
const checkCode = () => {
  let inputValueCheck
  let codeChoseCheck
  if (props.type === '1') {
    // 普通驗證碼
    inputValueCheck = inputValue.value.toUpperCase()
    codeChoseCheck = codeChose.value.toUpperCase()
  } else {
    inputValueCheck = inputValue.value
    codeChoseCheck = codeChose.value
  }
  if (inputValueCheck === codeChoseCheck) {
    isEnd.value = true
    emit('success', this)
  } else if (inputValue.value === '') {
    ElMessage.error('未輸入驗證碼')
    setCode()
  } else {
    ElMessage.error('驗證碼錯誤')
    setCode()
  }
}
// 刷新
// const refresh = () => {
//   isEnd.value = false
//   inputValue.value = ''
//   setCode()
// }
watch(
  () => props.type,
  () => { setCode() },
  { immediate: true }
)
</script>
