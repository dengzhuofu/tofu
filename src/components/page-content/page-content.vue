<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handleNewUserClick">
        {{ contentConfig?.header?.btnTitle ?? '新建数据' }}
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'status'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  size="small"
                  :type="
                    scope.row.enableStatus === '启用' ? 'primary' : 'danger'
                  "
                  plain
                >
                  {{ scope.row.enableStatus === '启用' ? '启用' : '禁用' }}
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  size="small"
                  icon="Edit"
                  type="primary"
                  text
                  @click="handleEditBtnClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  size="small"
                  icon="Delete"
                  type="danger"
                  text
                  @click="handleDeleteBtnClick(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                  hName="why"
                ></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="size"
        :page-sizes="[10, 20, 30]"
        layout="prev, pager, next,total, sizes, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import usePermissions from '@/hooks/usePermissions'
import { ElMessageBox } from 'element-plus'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}

const props = defineProps<IProps>()

// 定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 0.获取是否有对应的增删改查的权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const size = ref(10)

// store.$onction() 来监测 action 和它们的结果。传递给它的回调函数会在 action 本身之前执行。 after 表示在 promise 解决之后，
// 允许你在 action 解决后执行一个一个回调函数。同样地，onErroI 允许你在 action 抛出错误或 reject 时执行一个回调函数。
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})
console.log('---------------', props.contentConfig.pageName)
onMounted(() => {
  fetchPageListData()
})

// 2.获取usersList数据,进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3.页码相关的逻辑
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 4.定义函数, 用于发送网络请求
function fetchPageListData(formData: any = {}) {
  // if (!isQuery) return

  // 1.获取offset/size
  const pageSize = size.value
  const current = currentPage.value
  const pageInfo = { pageSize, current }
  console.log('------sss---------', props.contentConfig.pageName)

  // 2.发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 5.删除/新建/编辑的操作
function handleDeleteBtnClick(id: string) {
  if (id === '88888888') {
    ElMessageBox.alert('不能删除管理员账户', '提示', {
      confirmButtonText: '确定',
      type: 'warning'
    })
    return
  }

  ElMessageBox.confirm('确定要删除该项吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
    })
    .catch(() => {
      ElMessage.info('已取消删除操作')
    })
}
function handleNewUserClick() {
  emit('newClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

// 6.监听systemStore中的actions被执行
defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0px 7px 6px rgba(0, 0, 0, 0.2);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    // padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  // justify-content: flex-end;
  margin-top: 25px;
  justify-content: flex-end;
}
</style>
