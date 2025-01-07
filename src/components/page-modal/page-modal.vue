<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle
      "
      :width="modalConfig.pageName === 'goods' ? '50%' : '30%'"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'upload'">
                <el-upload
                  class="avatar-uploader"
                  action="http://121.37.196.89:8880/goods/photo"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="fileUrl" :src="fileUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                  </el-icon>
                </el-upload>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick()">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useSystemStore from '@/store/main/system/system'
import { ElMessage } from 'element-plus'
// import type { IModalProps } from './type'

// interface IModalConfig

interface IModalProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}

// 0.定义props
const props = defineProps<IModalProps>()

// 1.定义内部的属性
const dialogVisible = ref(false)
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialData)
const isNewRef = ref(true)
const editData = ref()

// 2.获取roles/departments数据
const systemStore = useSystemStore()

// 2.定义设置dialogVisible方法
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建数据
    for (const key in formData) {
      const item = props.modalConfig.formItems.find((item) => item.prop === key)
      formData[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}

// 3.点击了确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false

  // 在新建或者编辑的时候，先看看props有没有额外传来的otherInfo 有就合并
  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  if (editData.value && editData.value.id) {
    infoData.id = editData.value.id
  }
  console.log('---infoData', infoData)

  if (!isNewRef.value && editData.value) {
    // 编辑用户的数据
    systemStore.editPageDataAction(
      props.modalConfig.pageName,

      infoData
    )
    if (systemStore.sucCode == 1) {
      ElMessage.success('修改成功')
    } else if (systemStore.sucCode == 0) {
      ElMessage.error('修改失败')
    }
  } else {
    // 创建新的部门
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)

    if (systemStore.sucCode == 1) {
      ElMessage.success('添加成功')
    } else if (systemStore.sucCode == 0) {
      ElMessage.error('添加失败')
    }
  }
}

const fileUrl = ref('')
//上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload = (rawFile: any) => {
  //钩子是在图片上传成功之前触发,上传文件之前可以约束文件类型与大小
  //要求:上传文件格式png|jpg|gif 4M
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小小于4M'
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG|JPG|GIF'
    })
    return false
  }
}
//图片上传成功钩子
const handleAvatarSuccess = (response: any) => {
  //response:即为当前这次上传图片post请求服务器返回的数据
  //收集上传图片的地址,添加一个新的品牌的时候带给服务器
  const imgUrl = response.data.imgUrl
  fileUrl.value = imgUrl
  //图片上传成功,清除掉对应图片校验结果
  // formRef.value.clearValidate('logoUrl')
}

// 暴露的属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
