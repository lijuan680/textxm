<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div class="layout-aside">
      <div class="logo">
        <h2>管理系统</h2>
      </div>
      <el-menu
        :default-active="route.path"
        class="layout-menu"
        background-color="#2a3b4c"
        text-color="rgba(255, 255, 255, 0.8)"
        active-text-color="#409eff"
        :unique-opened="true"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><House /></el-icon>
            <span>后台首页</span>
          </template>
          <el-menu-item index="/home/stage/analy" @click="go('/home/stage/analy', '数据分析')">
            <el-icon><DataLine /></el-icon>
            <span>数据分析</span>
          </el-menu-item>
          <el-menu-item index="/home/stage/visua" @click="go('/home/stage/visua', '大数据可视化')">
            <el-icon><Histogram /></el-icon>
            <span>大数据可视化</span>
          </el-menu-item>
        </el-sub-menu>
        
        <el-sub-menu index="2">
          <template #title>
            <el-icon><VideoCameraFilled /></el-icon>
            <span>锋神电影</span>
          </template>
          <el-menu-item index="/home/film/cinema" @click="go('/home/film/cinema', '影院管理')">
            <el-icon><CreditCard /></el-icon>
            <span>影院管理</span>
          </el-menu-item>
          <el-menu-item index="/home/film/movie" @click="go('/home/film/movie', '电影管理')">
            <el-icon><Film /></el-icon>
            <span>电影管理</span>
          </el-menu-item>
          <el-menu-item index="/home/film/music" @click="go('/home/film/music', '音乐管理')">
            <el-icon><Mic /></el-icon>
            <span>音乐管理</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><Eleme /></el-icon>
            <span>锋团外卖</span>
          </template>
          <el-menu-item index="/home/take/store" @click="go('/home/take/store', '门店管理')">
            <el-icon><Shop /></el-icon>
            <span>门店管理</span>
          </el-menu-item>
          <el-menu-item index="/home/take/com" @click="go('/home/take/com', '商品管理')">
            <el-icon><GoodsFilled /></el-icon>
            <span>商品管理</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><Van /></el-icon>
            <span>堵车么小程序</span>
          </template>
          <el-menu-item index="/home/car/vxuser" @click="go('/home/car/vxuser', '微信用户')">
            <el-icon><Grid /></el-icon>
            <span>微信用户</span>
          </el-menu-item>
          <el-menu-item index="/home/car/road" @click="go('/home/car/road', '路况详情')">
            <el-icon><Grid /></el-icon>
            <span>路况详情</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <el-icon><Ticket /></el-icon>
            <span>订单管理</span>
          </template>
          <el-menu-item index="/home/order/detail" @click="go('/home/order/detail', '订单详情')">
            <el-icon><Grid /></el-icon>
            <span>订单详情</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="6">
          <template #title>
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/home/user/index" @click="go('/home/user/index', '用户列表')">
            <el-icon><Tickets /></el-icon>
            <span>用户列表</span>
          </el-menu-item>
          <el-menu-item index="/home/user/create" @click="go('/home/user/create', '用户创建')">
            <el-icon><Plus /></el-icon>
            <span>用户创建</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="7">
          <template #title>
            <el-icon><Avatar /></el-icon>
            <span>角色管理</span>
          </template>
          <el-menu-item index="/home/role/index" @click="go('/home/role/index', '角色列表')">
            <el-icon><List /></el-icon>
            <span>角色列表</span>
          </el-menu-item>
          <el-menu-item index="/home/role/create" @click="go('/home/role/create', '角色创建')">
            <el-icon><Plus /></el-icon>
            <span>角色创建</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="8">
          <template #title>
            <el-icon><Briefcase /></el-icon>
            <span>权限管理</span>
          </template>
          <el-menu-item index="/home/auth/index" @click="go('/home/auth/index', '权限列表')">
            <el-icon><ChromeFilled /></el-icon>
            <span>权限列表</span>
          </el-menu-item>
          <el-menu-item index="/home/auth/create" @click="go('/home/auth/create', '权限创建')">
            <el-icon><Plus /></el-icon>
            <span>权限创建</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>

    <div class="layout-main">
      <!-- 顶部导航 -->
      <div class="layout-header">
        <div class="layout-header-one">头部</div>
        <div class="layout-header-two">
          <el-tabs v-model="curPath" closable type="card" @tab-remove="remove">
            <el-tab-pane v-for="item in arr" :key="item.path" :name="item.path" :label="item.label">
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <!-- 中间内容区 -->
      <div class="layout-content">
        <RouterView></RouterView>
      </div>
      <!-- 底部版权 -->
      <div class="layout-footer">
        <p>© 2024 管理系统 All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import {
  ChromeFilled,
  Briefcase,
  Avatar,
  Tickets,
  Ticket,
  Grid,
  Van,
  Eleme,
  Shop,
  GoodsFilled,
  User,
  List,
  Plus,
  House,
  Histogram,
  DataLine,
  VideoCameraFilled,
  CreditCard,
  Film,
  Mic,
} from '@element-plus/icons-vue'
import { uesTabsStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
const store = uesTabsStore()
const { arr, curPath } = storeToRefs(store)
const { addTab, removeTab } = store
const route = useRoute()

const go = (path: string, label: string) => {
  addTab({ path, label })
}

const remove = (path: string) => {
  removeTab(path)
}
</script>

<style scoped lang="scss">
.layout-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background: #f5f7fa;

  .layout-aside {
    width: 220px;
    height: 100%;
    background: #2a3b4c;
    transition: width 0.3s;
    overflow: hidden;

    .logo {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      h2 {
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        margin: 0;
      }
    }

    .layout-menu {
      border-right: none;

      :deep(.el-menu-item) {
        &.is-active {
          background: rgba(64, 158, 255, 0.1);
        }
      }

      .el-icon {
        margin-right: 8px;
      }
    }
  }

  .layout-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .layout-header {
      height: auto;
      background: #fff;
      border-bottom: 1px solid #ebeef5;
      padding: 0;
      display: flex;
      flex-direction: column;

      .layout-header-one {
        height: 50px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ebeef5;
        background: linear-gradient(to right, #1989fa, #5cadff);
        color: #fff;
        font-size: 16px;
      }

      .layout-header-two {
        padding: 6px 20px 0;
        background: #fff;

        :deep(.el-tabs) {
          .el-tabs__header {
            margin: 0;
            border: none;

            .el-tabs__nav-wrap {
              &::after {
                display: none;
              }
            }

            .el-tabs__nav {
              border: none;
              border-radius: 0;
            }

            .el-tabs__item {
              height: 40px;
              line-height: 40px;
              border: none;
              background: #fff;
              transition: all 0.3s;
              padding: 0 20px;
              color: #606266;
              position: relative;

              &.is-active {
                background: #fff;
                color: #409eff;
                font-weight: 500;

                &::after {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  height: 2px;
                  background: #409eff;
                }
              }

              &:not(.is-active):hover {
                color: #409eff;
              }

              .el-icon-close {
                font-size: 12px;
                margin-left: 6px;
                border-radius: 50%;
                transition: all 0.3s;
                vertical-align: middle;

                &:hover {
                  background-color: #f0f2f5;
                  color: #409eff;
                }
              }
            }
          }
        }
      }
    }

    .layout-content {
      flex: 1;
      padding: 20px;
      overflow: auto;
    }

    .layout-footer {
      height: 50px;
      background: #fff;
      border-top: 1px solid #ebeef5;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #909399;
      font-size: 14px;
    }
  }
}
</style>
