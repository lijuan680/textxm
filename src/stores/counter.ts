import { defineStore } from 'pinia'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'

export const uesTabsStore = defineStore(
  'tabsStore',
  () => {
    const arr = ref([
      {
        path: '/home/stage/analy',
        label: '数据分析',
      },
    ])
    const curPath = ref(arr.value[0].path)
    watch(curPath, (v) => {
      router.push(v)
    })
    const addTab = (item: Api.Tabs) => {
      const index = arr.value.findIndex((it) => it.path === item.path)
      if (index === -1) {
        arr.value.push(item)
      }
      curPath.value = item.path
    }

    const removeTab = (path: string) => {
      if (arr.value.length === 1) {
        ElMessage.error('至少保留一个')
        return
      }
      arr.value = arr.value.filter((item: Api.Tabs) => item.path != path)
      curPath.value = arr.value[arr.value.length - 1].path
    }
    return {
      arr,
      curPath,
      addTab,
      removeTab,
    }
  },
  {
    persist: true,
  },
)
