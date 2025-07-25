<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <h3>用户创建</h3>
          <el-button type="primary" @click="$router.go(-1)">
            <el-icon><ArrowLeft /></el-icon>返回
          </el-button>
        </div>
      </template>
      <el-form :model="user" :rules="rules" ref="formRef" label-width="100px" class="create-form">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="user.username" placeholder="请输入用户名称" clearable />
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="user.password" placeholder="请输入用户密码" clearable />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="user.mobile" placeholder="请输入手机号码" clearable />
        </el-form-item>
        <el-form-item class="form-buttons">
          <el-button type="primary" @click="submit">
            <el-icon><Check /></el-icon>提交
          </el-button>
          <el-button>
            <el-icon><Refresh /></el-icon>重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ArrowLeft, Check, Refresh } from '@element-plus/icons-vue'
import { postCreatePayloadApi } from '@/api/user/user'
import { ElMessage } from 'element-plus'
const user = reactive({
  username: '',
  password: '',
  mobile: '',
})

const submit = async () => {
  const { state, msg } = await postCreatePayloadApi(user)

  if (state === 201) {
    ElMessage.success(msg)
  } else {
    ElMessage.error(msg)
  }
}
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符之间', trigger: 'blur' },
  ],
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -10px 0;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  color: #303133;
}

.create-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #606266;
}

:deep(.el-input) {
  .el-input__wrapper {
    box-shadow: 0 0 0 1px #dcdfe6 inset;
    &:hover {
      box-shadow: 0 0 0 1px #c0c4cc inset;
    }
    &.is-focus {
      box-shadow: 0 0 0 1px #409eff inset;
    }
  }
}

.form-buttons {
  margin-top: 30px;
  text-align: center;
  :deep(.el-form-item__content) {
    justify-content: center;
    gap: 20px;
  }
}

:deep(.el-button) {
  padding: 12px 20px;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  .el-icon {
    font-size: 16px;
  }
}

:deep(.el-card) {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

  .el-card__header {
    border-bottom: 1px solid #ebeef5;
    background-color: #fafafa;
  }
}
</style>
