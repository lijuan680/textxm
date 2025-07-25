<template>
  <div class="login">
    <div class="login-container">
      <el-form :model="user" size="large" ref="formRef" :rules="formRules">
        <el-form-item label="用户名" prop="username" label-width="80">
          <el-input placeholder="用户名" v-model="user.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="80">
          <el-input placeholder="密码" type="password" v-model="user.password" show-password />
        </el-form-item>
        <el-form-item class="btnalign">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { postLoginApi } from '@/api/login/login'
import router from '@/router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
const formRef = ref<FormInstance>()
const user = reactive({
  username: '',
  password: '',
})
const reset = () => {
  formRef.value?.resetFields()
}
const submit = () => {
  formRef.value?.validate(async (value) => {
    if (value) {
      const { state, msg, data } = await postLoginApi(user)
      if (state === 200) {
        localStorage.setItem('userinfo', JSON.stringify(data))
        ElMessage.success(msg)
        router.push('/home')
      } else {
        ElMessage.success(msg)
      }
    }
  })
}
const formRules: FormRules = {
  username: [
    {
      required: true,
      message: '用户名必须填写',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 10,
      message: '用户名长度必须在3到10之间',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码必须填写',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 10,
      message: '密码长度必须在3到10之间',
      trigger: 'blur',
    },
  ],
}
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  display: flex;
  justify-content: center;
  align-items: center;

  .login-container {
    background: rgba(255, 255, 255, 0.9);
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    width: 380px;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
  }

  .el-form {
    width: 100%;

    :deep(.el-form-item__label) {
      font-weight: 500;
      color: #606266;
    }

    :deep(.el-input__wrapper) {
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      transition: all 0.3s ease;
      padding: 0 15px;

      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      &.is-focus {
        box-shadow: 0 0 0 1px #409eff;
      }
    }

    :deep(.el-button) {
      padding: 12px 30px;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.3s ease;
      margin: 0 10px;

      &.el-button--primary {
        background: linear-gradient(45deg, #409eff, #36a2ff);
        border: none;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(64, 158, 255, 0.4);
        }
      }

      &.el-button--default {
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
      }
    }

    .btnalign {
      margin-top: 30px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
