<template>
  <div class="search">
    <!-- 1.输入搜索关键字的表单 -->
    <el-form
      :model="searchForm"
      ref="formRef"
      :label-width="searchConfig.labelWidth ?? '80px'"
      size="large"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="6">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 2.重置和搜索的按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import usePermissions from '@/hooks/usePermissions'

// 定义自定义事件/接收的属性
interface IProps {
  searchConfig: {
    pageName: string
    labelWidth?: string
    formItems: any[]
  }
}
const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<IProps>()

// 获取权限
const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)

// 定义form的数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)

// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  // 1.form中的数据全部重置
  formRef.value?.resetFields()

  // 2.将事件出去, content内部重新发送网络请求
  emit('resetClick')
}

function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.inputClass {
  width: 180px;
  height: 35px;
  border-radius: 30px;
  // box-shadow: 0 0 5px rgba(90, 88, 88, 0.3);
  border-color: #dcdfe6 #dcdfe6 #dcdfe6 #dcdfe6;
  text-align: center;
}
.search {
  position: relative;
  background-color: #fff;
  border-radius: 20px 20px;
  box-shadow: -10px 10px 20px rgba(0, 0, 0, 0.2),
    10px 10px 20px rgba(0, 0, 0, 0.2);
  padding: 15px;

  // .el-form-item {
  //   padding: 20px 30px;
  //   margin-bottom: 0;
  // }
  // .el-input-border-radius {
  //   border-radius: 30px;
  // }

  .btns {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
}
</style>
