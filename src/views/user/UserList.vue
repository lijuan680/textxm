<template>
  <div>
    <UserEdit ref="child"></UserEdit>
    <!-- 搜索区域 -->
    <div class="search-area">
      <el-form :inline="true" :model="params" class="search-form">
        <el-form-item label="用户名">
          <el-input v-model="params.username" placeholder="请输入用户名" clearable />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="params.mobile" placeholder="请输入手机号" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>搜索
          </el-button>
          <el-button @click="handleReset">
            <el-icon><RefreshRight /></el-icon>重置
          </el-button>
          <el-button type="primary" text @click="isExpand = !isExpand">
            {{ isExpand ? '收起' : '展开'
            }}<el-icon class="el-icon--right">
              <component :is="isExpand ? 'ArrowUp' : 'ArrowDown'" />
            </el-icon>
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="operation-area">
      <div class="left-buttons">
        <el-button type="danger">
          <el-icon><Delete /></el-icon>批量删除
        </el-button>
        <el-button type="primary">
          <el-icon><Plus /></el-icon>添加
        </el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="table-area">
      <el-table :data="data.list" style="width: 100%" border>
        <el-table-column type="selection" width="55" align="center" fixed />
        <el-table-column label="编号" prop="user_id" width="100" align="center" />
        <el-table-column label="所属角色" prop="role_name" width="100" align="center" />
        <el-table-column label="头像" width="150" align="center">
          <template #default="{ row }">
            <el-image
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
              fit="cover"
              style="width: 50px; height: 50px; border-radius: 50%"
            >
              <template #error>
                <div class="image-slot">
                  <el-icon><Picture /></el-icon>
                </div>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="用户名" prop="username" min-width="200" align="center" />
        <el-table-column label="手机号" prop="mobile" width="180" align="center" />
        <el-table-column label="登录" prop="" width="180" align="center" />
        <el-table-column label="创建于" prop="created_at" width="180" align="center" />
        <el-table-column label="更新于" prop="updated_at" width="180" align="center" />
        <el-table-column label="操作" width="250" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="change(row)">
              <el-icon><Edit /></el-icon>编辑
            </el-button>
            <el-button type="success" size="small"> 分配权限 </el-button>
            <el-button type="danger" size="small" @click="remove(row.user_id)">
              <el-icon><Delete /></el-icon>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页区域 -->
    <div class="pagination-area">
      <div class="pagination-info">共 {{ data.total }} 条</div>
      <el-pagination
        v-model:current-page="params.pagenum"
        v-model:page-size="params.pagesize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="sizes, prev, pager, next, jumper"
        :total="data.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserType, CreateUser } from '@/api/user/type'
import { delUserResApi, getUserResApi } from '@/api/user/user'
import { ElMessage } from 'element-plus'
import { onMounted, ref, reactive } from 'vue'
import {
  Edit,
  Delete,
  Plus,
  Search,
  RefreshRight,
  ArrowUp,
  ArrowDown,
} from '@element-plus/icons-vue'
import UserEdit from './components/UserEdit.vue'
const isExpand = ref(false)
const data = ref<Pick<UserType, 'list' | 'total'>>({
  list: [],
  total: 0,
})
const child = ref<InstanceType<typeof UserEdit>>()
interface SearchParams {
  pagenum: number
  pagesize: number
  role_name: string
  username: string
  mobile: string
}

const params = reactive<SearchParams>({
  pagenum: 1,
  pagesize: 10,
  role_name: '',
  username: '',
  mobile: '',
})

const handleSearch = async () => {
  // TODO: 调用搜索接口
  const { msg, list, total, state } = await getUserResApi()
  if (state === 200) {
    data.value.list = list
    data.value.total = total
    ElMessage.success(msg)
  } else {
    ElMessage.error(msg)
  }
}
const change = (item: CreateUser) => {
  child.value!.flag = true
  child.value!.user.username = item.username
  child.value!.user.password = item.password
  child.value!.user.mobile = item.mobile ?? ''
  child.value!.user.user_id = item.user_id
}
const remove = async (id: number) => {
  const { state, msg } = await delUserResApi({ user_id: id })
  if (state === 200) {
    ElMessage.success(msg)
  } else {
    ElMessage.error(msg)
  }
}
const handleReset = () => {
  params.username = ''
  params.mobile = ''
  handleSearch()
}

const handleSizeChange = (val: number) => {
  params.pagesize = val
  handleSearch()
}

const handleCurrentChange = (val: number) => {
  params.pagenum = val
  handleSearch()
}

onMounted(async () => {
  await handleSearch()
})
</script>

<style scoped>
.operation-area {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.left-buttons {
  display: flex;
  gap: 10px;
}

.table-area {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.pagination-area {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.pagination-info {
  color: #606266;
  font-size: 14px;
}

:deep(.el-table) {
  --el-table-border-color: #ebeef5;
  --el-table-header-bg-color: #f5f7fa;
}

:deep(.el-table th) {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: 600;
}

:deep(.el-button) {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

:deep(.el-pagination) {
  --el-pagination-button-bg-color: #fff;
  --el-pagination-hover-color: #409eff;
}
</style>
