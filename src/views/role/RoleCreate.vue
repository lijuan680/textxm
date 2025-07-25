<template>
  <div class="create-container">
    <el-card class="create-card">
      <template #header>
        <div class="card-header">
          <h3>角色创建</h3>
          <el-button type="primary" @click="$router.go(-1)">
            <el-icon><ArrowLeft /></el-icon>返回
          </el-button>
        </div>
      </template>
      <el-form :model="role" :rules="rules" ref="formRef" label-width="100px" class="create-form">
        <el-form-item label="角色名称" prop="role_name">
          <el-input v-model="role.role_name" placeholder="请输入角色名称" clearable />
        </el-form-item>
        <el-form-item label="角色描述" prop="role_desc">
          <el-input
            v-model="role.role_desc"
            placeholder="请输入角色描述"
            type="textarea"
            :rows="4"
            clearable
          />
        </el-form-item>
        <el-form-item class="form-buttons">
          <el-button type="primary" @click="submitForm">
            <el-icon><Check /></el-icon>提交
          </el-button>
          <el-button @click="resetForm">
            <el-icon><Refresh /></el-icon>重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { ArrowLeft, Check, Refresh } from '@element-plus/icons-vue'
import { postRoleApi } from '@/api/role/role'

const formRef = ref<FormInstance>()

const role = reactive({
  role_name: '',
  role_desc: '',
})

const rules = reactive({
  role_name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符之间', trigger: 'blur' },
  ],
  role_desc: [
    { required: true, message: '请输入角色描述', trigger: 'blur' },
    { min: 2, max: 200, message: '长度在 2 到 200 个字符之间', trigger: 'blur' },
  ],
})

const submitForm = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (valid) {
      const { state, msg } = await postRoleApi(role)
      if (state === 201) {
        ElMessage.success(msg)
        role.role_desc = ''
        role.role_name = ''
      }else{
        ElMessage.error(msg)
      }
    }
  })
}

const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>

<style scoped lang="scss">
.create-container {
  padding: 20px;

  .create-card {
    max-width: 800px;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    :deep(.el-card__header) {
      padding: 16px 20px;
      border-bottom: 1px solid #ebeef5;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 500;
        color: #303133;
      }

      .el-button {
        padding: 8px 16px;

        .el-icon {
          margin-right: 4px;
        }
      }
    }

    .create-form {
      padding: 20px 40px;

      :deep(.el-form-item__label) {
        font-weight: 500;
        color: #606266;
      }

      :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 1px #dcdfe6;

        &:hover {
          box-shadow: 0 0 0 1px #c0c4cc;
        }

        &.is-focus {
          box-shadow: 0 0 0 1px #409eff;
        }
      }

      :deep(.el-textarea__inner) {
        box-shadow: 0 0 0 1px #dcdfe6;
        border-radius: 4px;

        &:hover {
          box-shadow: 0 0 0 1px #c0c4cc;
        }

        &:focus {
          box-shadow: 0 0 0 1px #409eff;
        }
      }

      .form-buttons {
        margin-top: 40px;
        margin-bottom: 0;
        text-align: center;

        .el-button {
          padding: 12px 24px;
          margin: 0 10px;

          .el-icon {
            margin-right: 4px;
          }
        }
      }
    }
  }
}
</style>
