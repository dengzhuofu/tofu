<template>
  <div class="user">
    <department-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <department-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <department-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import departmentSearch from './c-cpns/department-search.vue'
import departmentContent from './c-cpns/department-content.vue'
import departmentModal from './c-cpns/department-modal.vue'

// 点击search, content的操作
const contentRef = ref<InstanceType<typeof departmentContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

// 点击content, modal的操作
const modalRef = ref<InstanceType<typeof departmentModal>>()
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
