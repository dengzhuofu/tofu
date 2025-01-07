<template>
  <div class="user">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #image="scope">
        <div class="img-container">
          <el-image
            :src="scope.row[scope.prop]"
            style="width: 50px"
            :id="scope.row[scope.prop]"
          />
          <!-- <img :src="scope.row[scope.prop]" alt="" class="full-width" /> -->
        </div>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import { ref, computed } from 'vue'
import useMainStore from '@/store/main/main'

import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  const roles = mainStore.entireRoles.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'roleId') {
      item.options.push(...roles)
      console.log(roles)
    }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'departmentId') {
      item.options.push(...departments)
    }
  })

  return modalConfig
})

// setup相同的逻辑的抽取: hooks
// 点击search, content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 点击content, modal的操作
const { modalRef, handleNewClick, handleEditClick } = usePageModal()
</script>

<style scoped>
/* .user {
  border-radius: 8px;
  overflow: hidden;
} */
</style>
