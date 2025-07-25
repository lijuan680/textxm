<template>
  <div class="role-container">
    <RoleEdit ref="dia"></RoleEdit>
    <!-- 搜索区域 -->
    <div class="search-area">
      <div class="search-item">
        <span class="label">角色名：</span>
        <el-input
          v-model="name"
          placeholder="请输入角色名"
          clearable
          class="search-input"
          @clear="OnTableDate"
          @keyup.enter="OnTableDate"
        />
      </div>
      <div class="search-buttons">
        <el-button type="primary" @click="OnTableDate">
          <el-icon><Search /></el-icon>搜索
        </el-button>
        <el-button @click="resetSearch">重置</el-button>
      </div>
    </div>

    <!-- 操作按钮区域 -->
    <div class="operation-area">
      <div class="left-buttons">
        <el-button type="danger" @click="handleBatchDelete">
          <el-icon><Delete /></el-icon>批量删除
        </el-button>
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>添加
        </el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="table-area">
      <el-table :data="arr" style="width: 100%" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="角色编号" prop="role_id" width="100" align="center" />
        <el-table-column label="角色名称" prop="role_name" width="150" align="center" />
        <el-table-column label="角色描述" prop="role_desc" min-width="200" align="center" />
        <el-table-column label="创建时间" prop="created_at" width="180" align="center" />
        <el-table-column label="更新时间" prop="updated_at" width="180" align="center" />
        <el-table-column label="操作" width="250" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="edit(row)">
              <el-icon><Edit /></el-icon>编辑
            </el-button>
            <el-button type="success" size="small" @click="handleAssignRights(row)">
              分配权限
            </el-button>
            <el-button type="danger" size="small" @click="remove(row.role_id)">
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
import { deleteRoleApi, getRoleResApi } from '@/api/role/role'
import type { getRoleResType, roleItem } from '@/api/role/type'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { Edit, Delete, Search, Plus } from '@element-plus/icons-vue'
import RoleEdit from './components/RoleEdit.vue'
import router from '@/router'

const selectedRows = ref<roleItem[]>([])
const dia = ref<InstanceType<typeof RoleEdit>>()
const data = reactive<Pick<getRoleResType, 'list' | 'total'>>({
  list: [],
  total: 0,
})
const name = ref('')
let arr = reactive<roleItem[]>([])

const params = reactive({
  pagenum: 1,
  pagesize: 10,
  role_name: '',
})

const OnTableDate = async () => {
  const { state, msg, list, total } = await getRoleResApi(params)
  if (state === 200) {
    data.list = list
    data.total = total
    ElMessage.success(msg)
    if (name.value === '') {
      Object.assign(arr, data.list)
    } else {
      arr = data.list.filter((item: roleItem) => {
        return item.role_name.includes(name.value) || item.role_desc.includes(name.value)
      })
    }
  } else {
    ElMessage.error(msg)
  }
}

const resetSearch = () => {
  params.role_name = ''
  OnTableDate()
}

const handleSelectionChange = (rows: roleItem[]) => {
  selectedRows.value = rows
}

const handleBatchDelete = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请选择要删除的角色')
    return
  }
  // 实现批量删除逻辑
}

const handleAdd = () => {
  router.push('/home/role/create')
}

const handleAssignRights = (row: roleItem) => {
  // 实现分配权限逻辑
}

onMounted(async () => {
  await OnTableDate()
})

const edit = (item: roleItem) => {
  dia.value!.flag = true
  dia.value!.role.role_name = item.role_name
  dia.value!.role.role_id = item.role_id
  dia.value!.role.role_desc = item.role_desc
}

const remove = async (id: number) => {
  const { state, msg } = await deleteRoleApi({ role_id: id })
  if (state === 200) {
    ElMessage.success(msg)
    OnTableDate()
  }
}

const handleSizeChange = (value: number) => {
  params.pagesize = value
  OnTableDate()
}

const handleCurrentChange = (value: number) => {
  params.pagenum = value
  OnTableDate()
}
</script>

<style scoped lang="scss">
.role-container {
  background: #fff;
  border-radius: 4px;
  padding: 20px;

  .search-area {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 20px;
    background: #f5f7fa;
    border-radius: 4px;

    .search-item {
      display: flex;
      align-items: center;
      margin-right: 20px;

      .label {
        margin-right: 8px;
        color: #606266;
      }

      .search-input {
        width: 200px;
      }
    }

    .search-buttons {
      .el-button {
        margin-left: 10px;
      }
    }
  }

  .operation-area {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;

    .left-buttons {
      .el-button {
        margin-right: 10px;
      }
    }
  }

  .table-area {
    margin-bottom: 20px;

    :deep(.el-table) {
      .el-table__header {
        th {
          background-color: #f5f7fa;
          color: #606266;
          font-weight: 500;
        }
      }

      .el-button {
        padding: 6px 12px;
        margin: 0 4px;
      }
    }
  }

  .pagination-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;

    .pagination-info {
      color: #606266;
      font-size: 14px;
    }

    :deep(.el-pagination) {
      .el-pagination__sizes {
        margin-right: 16px;
      }

      .el-pagination__jump {
        margin-left: 16px;
      }
    }
  }
}
</style>
