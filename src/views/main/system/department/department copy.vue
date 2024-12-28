<template>
  <div class="department">
    <page-search
      ref="searchRef"
      :search-config="searchConfigRef"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #leader="scope">
        <!-- 通过作用域插槽v-bind实现将在插槽中的数据传给父组件 [scope.prop]是插槽slot中通过:prop传过来的 -->
        <span class="leader">哈哈哈: {{ scope.row[scope.prop] }}</span>
      </template>
      <template #parent="scope">
        <span class="parent">呵呵呵: {{ scope.row[scope.prop] }}</span>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
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

// 对searchConfig进行操作
/**
 *
 * 1. 获得列表的选择数据 只需要把prop对应上 不需要什么数据库对应有的id值 不过prop还是要有对应的数据库字段 不然搜索不了
 * 然后通过map映射 将要展示的数据对应上就行了 这一步要跟数据库的字段匹配上
 */
const searchConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  const leaders = mainStore.entireDepartments.map((item) => {
    return { label: item.leader, value: item.id }
  })
  searchConfig.formItems.forEach((item) => {
    if (item.prop === 'departmentId') {
      item.options?.push(...departments)
    }
  })
  searchConfig.formItems.forEach((item) => {
    if (item.prop === 'leader') {
      item.options?.push(...leaders)
    }
  })

  return searchConfig
})

// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })

  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
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
.leader {
  color: red;
}

.parent {
  color: blue;
}
</style>
