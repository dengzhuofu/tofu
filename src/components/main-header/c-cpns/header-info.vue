<template>
  <div class="header-info">
    <!-- 1.操作小图标 -->
    <div class="operation">
      <span @click="handleFullClick">
        <el-icon>
          <component :is="isFullScreen ? 'Close' : 'FullScreen'" />
        </el-icon>
      </span>
      <span>
        <el-popover
          placement="bottom"
          title="主题设置"
          :width="300"
          trigger="hover"
        >
          <el-form>
            <el-form-item label="主题颜色"
              ><el-color-picker
                v-model="color"
                show-alpha
                @change="setColor"
                :predefine="predefineColors"
            /></el-form-item>
            <el-form-item label="暗黑模式">
              <el-switch
                v-model="dark"
                class="mt-2"
                style="margin-left: 24px"
                inline-prompt
                :active-icon="MoonNight"
                :inactive-icon="Sunny"
                @change="changeDark"
              /> </el-form-item
          ></el-form>

          <template #reference>
            <el-icon><Setting></Setting></el-icon>
            ></template
          >
        </el-popover>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>

    <!-- 2.个人信息 -->
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="30" src="../../../base-ui/bg.jpg" />
          <span class="name">{{ userName }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>
                <a href="https://www.bilibili.com/" target="_blank">个人信息</a>
              </span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span @click="editPassword">修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'
import useLoginStore from '@/store/login/login'
import { MoonNight, Sunny, type Setting } from '@element-plus/icons-vue'

const loginStore = useLoginStore()
const userName = loginStore.name

const router = useRouter()

function handleExitClick() {
  localCache.removeCache(LOGIN_TOKEN)
  localCache.removeCache('ROLE')
  localCache.removeCache('navList')
  router.push('/login')
}

const editPassword = () => {
  console.log('改密码')
}

const isFullScreen = ref(false)
const handleFullClick = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}

// 监听全屏状态的变化
onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on('change', () => {
      isFullScreen.value = screenfull.isFullscreen
    })
  }
})

onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off('change')
  }
})

//暗黑模式切换
let dark = ref<boolean>(false)
const changeDark = () => {
  //获取html根节点
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}

//设置主题颜色
const color = ref('rgba(30, 144, 255, 1)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])
const setColor = () => {
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}

.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 5px;
    }
  }
}

.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
