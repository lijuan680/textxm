<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

// 定义电影数据类型接口
interface Movie {
  id: number
  name: string
  director: string
  year: number
  rating: number
  genre: string
  status: '上映中' | '已下架'
}

// 电影数据 - 明确类型
const movieList = ref<Movie[]>([
  {
    id: 1,
    name: '泰坦尼克号',
    director: '詹姆斯·卡梅隆',
    year: 1997,
    rating: 9.4,
    genre: '爱情/灾难',
    status: '上映中',
  },
  {
    id: 2,
    name: '阿凡达',
    director: '詹姆斯·卡梅隆',
    year: 2009,
    rating: 8.7,
    genre: '科幻/冒险',
    status: '上映中',
  },
  {
    id: 3,
    name: '肖申克的救赎',
    director: '弗兰克·德拉邦特',
    year: 1994,
    rating: 9.7,
    genre: '剧情',
    status: '已下架',
  },
  {
    id: 4,
    name: '教父',
    director: '弗朗西斯·福特·科波拉',
    year: 1972,
    rating: 9.2,
    genre: '犯罪/剧情',
    status: '上映中',
  },
])

// 搜索条件 - 明确类型
const searchForm = reactive({
  name: '',
  director: '',
  genre: '',
})

// 新增/编辑电影表单 - 明确类型
const movieForm = reactive<Partial<Movie>>({
  id: null as unknown as number | undefined,
  name: '',
  director: '',
  year: 0,
  rating: 0,
  genre: '',
  status: '上映中',
})

// 对话框显示状态
const dialogVisible = ref(false)
const isEdit = ref(false)

// 搜索电影
const searchMovies = () => {
  console.log('搜索条件:', searchForm)
  // 实际应用中可以添加过滤逻辑
  // movieList.value = originalMovieList.filter(...)
}

// 重置搜索
const resetSearch = () => {
  searchForm.name = ''
  searchForm.director = ''
  searchForm.genre = ''
}

// 添加电影
const addMovie = () => {
  isEdit.value = false
  resetForm()
  dialogVisible.value = true
}

// 编辑电影 - 添加参数类型
const editMovie = (row: Movie) => {
  isEdit.value = true
  Object.assign(movieForm, row)
  dialogVisible.value = true
}

// 删除电影 - 添加参数类型
const deleteMovie = (row: Movie) => {
  ElMessageBox.confirm(`确定要删除电影"${row.name}"吗？`, '确认删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      const index = movieList.value.findIndex((item) => item.id === row.id)
      if (index > -1) {
        movieList.value.splice(index, 1)
        ElMessage.success('删除成功')
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

// 保存电影
const saveMovie = () => {
  // 类型转换和验证
  const year = Number(movieForm.year)
  const rating = Number(movieForm.rating)

  if (!movieForm.name || !movieForm.director || !year || !rating || !movieForm.genre) {
    ElMessage.warning('请填写完整信息')
    return
  }

  if (isEdit.value && movieForm.id) {
    // 编辑模式
    const index = movieList.value.findIndex((item) => item.id === movieForm.id)
    if (index > -1) {
      movieList.value[index] = {
        ...(movieForm as Movie),
        year,
        rating,
      }
      ElMessage.success('编辑成功')
    }
  } else {
    // 新增模式
    const newMovie: Movie = {
      ...(movieForm as Omit<Movie, 'id'>),
      id: Date.now(),
      year,
      rating,
    }
    movieList.value.push(newMovie)
    ElMessage.success('添加成功')
  }

  dialogVisible.value = false
  resetForm()
}

// 重置表单
const resetForm = () => {
  Object.assign(movieForm, {
    id: null,
    name: '',
    director: '',
    year: 0,
    rating: 0,
    genre: '',
    status: '上映中',
  })
}

// 状态标签颜色 - 添加参数类型
const getStatusType = (status: Movie['status']) => {
  return status === '上映中' ? 'success' : 'info'
}
</script>

<template>
  <div class="movie-management">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>电影管理系统</h2>
      <el-button type="primary" @click="addMovie">
        <el-icon><Plus /></el-icon>
        添加电影
      </el-button>
    </div>

    <!-- 搜索区域 -->
    <div class="search-section">
      <el-card>
        <template #header>
          <span>搜索条件</span>
        </template>
        <el-form :model="searchForm" inline>
          <el-form-item label="电影名称">
            <el-input v-model="searchForm.name" placeholder="请输入电影名称" clearable />
          </el-form-item>
          <el-form-item label="导演">
            <el-input v-model="searchForm.director" placeholder="请输入导演姓名" clearable />
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="searchForm.genre" placeholder="请输入电影类型" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchMovies">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- 电影列表 -->
    <div class="movie-list">
      <el-card>
        <template #header>
          <span>电影列表</span>
        </template>
        <el-table :data="movieList" stripe style="width: 100%">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="电影名称" width="200" />
          <el-table-column prop="director" label="导演" width="150" />
          <el-table-column prop="year" label="年份" width="100" />
          <el-table-column prop="rating" label="评分" width="100">
            <template #default="scope">
              <el-rate v-model="scope.row.rating" disabled show-score />
            </template>
          </el-table-column>
          <el-table-column prop="genre" label="类型" width="150" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="getStatusType(scope.row.status)">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button size="small" @click="editMovie(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="deleteMovie(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 添加/编辑电影对话框 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑电影' : '添加电影'" width="500px">
      <el-form :model="movieForm" label-width="80px">
        <el-form-item label="电影名称" required>
          <el-input v-model="movieForm.name" placeholder="请输入电影名称" />
        </el-form-item>
        <el-form-item label="导演" required>
          <el-input v-model="movieForm.director" placeholder="请输入导演姓名" />
        </el-form-item>
        <el-form-item label="年份" required>
          <el-input v-model.number="movieForm.year" type="number" placeholder="请输入年份" />
        </el-form-item>
        <el-form-item label="评分" required>
          <el-rate v-model="movieForm.rating" show-score max="10" />
        </el-form-item>
        <el-form-item label="类型" required>
          <el-input v-model="movieForm.genre" placeholder="请输入电影类型" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="movieForm.status" placeholder="请选择状态">
            <el-option label="上映中" value="上映中" />
            <el-option label="已下架" value="已下架" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveMovie">
            {{ isEdit ? '保存' : '添加' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.movie-management {
  padding: 20px;
  height: 100%;
  background: #f5f5f5;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0;
  color: #303133;
}

.search-section {
  margin-bottom: 20px;
}

.movie-list {
  margin-bottom: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

:deep(.el-card) {
  margin-bottom: 20px;
}

:deep(.el-table) {
  margin-top: 10px;
}

:deep(.el-rate) {
  display: inline-block;
}
</style>
