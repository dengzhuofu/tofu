import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'
type CallbackFnType = (data?: any) => void
type EditFnType = (data: any) => void

function usePageModal(newCallback?: CallbackFnType, editCallback?: EditFnType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }
  function handleEditClick(itemData: any) {
    // 1.让modal显示出来 用nextTick目的是弹窗只是弹出来 但是dialogvisible的值还没有被改变 因此没法设置属性
    modalRef.value?.setModalVisible(false, itemData)
    console.log('itemData', itemData)

    // 2.编辑的回调
    if (editCallback) editCallback(itemData)
  }

  return { modalRef, handleNewClick, handleEditClick }
}

export default usePageModal
