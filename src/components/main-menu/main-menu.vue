<template>
  <div class="main-menu">
    <!-- 1.logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">cms</h2>
    </div>

    <!-- 2.menu -->
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="red"
        background-color="#001529"
      >
        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <template v-if="item.children">
            <el-sub-menu :index="item.id + ''">
              <template #title>
                <!-- 字符串: el-icon-monitor => 组件 component动态组件 -->
                <el-icon>
                  <component :is="item.icon.split('-icon-')[1]" />
                </el-icon>
                <span>{{ item.name }}</span>
              </template>

              <template v-for="subitem in item.children" :key="subitem.id">
                <el-menu-item
                  :index="subitem.id + ''"
                  @click="handleItemClick(subitem)"
                >
                  {{ subitem.name }}
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="item.id + ''" @click="handleItemClick(item)">
              <template #title>
                <!-- 字符串: el-icon-monitor => 组件 component动态组件 -->
                <el-icon>
                  <component :is="item.icon.split('-icon-')[1]" />
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import useLoginStore from '@/store/login/login'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'
import { adminUserMenu, companyMenu } from '@/router/main/localRoutes'
import { localCache } from '@/utils/cache'

// 0.定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 1.获取动态的菜单
const role = localCache.getCache('ROLE')
console.log('role:', role)

const userMenus = role === '管理员' ? adminUserMenu : companyMenu

// 2.监听item的点击
const router = useRouter()
function handleItemClick(item: any) {
  const url = item.url
  router.push(url)
}

// 3.ElMenu的默认菜单
const route = useRoute()
const defaultActive = computed(() => {
  if (route.path === '/main') {
    return '101'
  }
  const pathMenu = mapPathToMenu(route.path, userMenus)
  console.log('pathMenu:', pathMenu)

  return pathMenu.id.toString()
})
</script>
<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
    text-align: center;
    justify-content: center;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
