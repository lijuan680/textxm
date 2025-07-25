<template>
  <div class="edit-dialog">
    <el-dialog v-model="flag" :close-on-click-modal="false" width="500px" destroy-on-close>
      <template #header>
        <div class="dialog-header">
          <h3>修改角色信息</h3>
        </div>
      </template>
      <el-form :model="role" :rules="rules" ref="dialogForm" label-width="100px" class="edit-form">
        <el-form-item label="角色名称" prop="role_name">
          <el-input v-model="role.role_name" placeholder="请输入角色名称" clearable />
        </el-form-item>
        <el-form-item label="角色描述" prop="role_desc">
          <el-input
            v-model="role.role_desc"
            type="textarea"
            :rows="4"
            placeholder="请输入角色描述"
            clearable
          />
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
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Check, Close } from '@element-plus/icons-vue'
import {  putRoleApi } from '@/api/role/role'

const dialogForm = ref()
const flag = ref(false)
const role = reactive({
  role_name: '',
  role_desc: '',
  role_id: 0,
})
const sure = async () => {
  const { state, msg } = await putRoleApi(role)
  if (state === 200) {
    ElMessage.success(msg)
    flag.value = false
  } else {
    ElMessage.error(msg)
  }
}

const close = () => {
  flag.value = false
}

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
defineExpose({
  flag,
  role,
})
</script>

<style scoped lang="scss">
.edit-dialog {
  :deep(.el-dialog) {
    border-radius: 8px;

    .el-dialog__header {
      margin: 0;
      padding: 20px 20px 0;

      .dialog-header {
        h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 500;
          color: #303133;
        }
      }
    }

    .el-dialog__body {
      padding: 30px 20px;
    }

    .edit-form {
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
    }

    .dialog-footer {
      text-align: right;
      margin-top: 10px;

      .el-button {
        padding: 9px 20px;

        .el-icon {
          margin-right: 4px;
        }
      }

      .el-button + .el-button {
        margin-left: 12px;
      }
    }
  }
}
</style>
