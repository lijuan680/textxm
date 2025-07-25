<template>
  <div>
    <el-dialog v-model="flag" :close-on-click-modal="false" width="500px" destroy-on-close>
      <template #header>
        <div class="dialog-header">
          <h3>修改角色信息</h3>
        </div>
      </template>
      <el-form :model="user" :rules="rules" ref="dialogForm" label-width="100px" class="edit-form">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="user.username" placeholder="请输入用户名称" clearable />
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="user.password" placeholder="请输入用户密码" clearable />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="user.mobile" placeholder="请输入手机号码" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="close">
            <el-icon><Close /></el-icon>取消
          </el-button>
          <el-button type="primary" @click="sure">
            <el-icon><Check /></el-icon>确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { putUserPayloadApi } from '@/api/user/user'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
const flag = ref(false)
const user = reactive({
  username: '',
  password: '',
  mobile: '',
  user_id: 0,
})

const close = () => {
  flag.value = false
}
const sure = async () => {
  const { state, msg } = await putUserPayloadApi(user)
  if (state === 200) {
    ElMessage.success(msg)
    close()
  } else {
    ElMessage.error(msg)
  }
}
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符之间', trigger: 'blur' },
  ],
})
defineExpose({
  flag,
  user,
})
</script>

<style scoped></style>
