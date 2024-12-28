<template>
  <div class="curmb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { adminUserMenu, companyMenu } from '@/router/main/localRoutes'
import { localCache } from '@/utils/cache'
// const route = useRoute()
// const userMenus = useLoginStore().userMenus
const role = localCache.getCache('ROLE')
console.log('role:', role)

const userMenus = role === '管理员' ? adminUserMenu : companyMenu
const route = useRoute()
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>

<style lang="less" scoped></style>
