<template>
  <div class="pane-account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
    >
      <div class="f-inp">
        <input
          type="text"
          placeholder="Email Address"
          v-model="account.username"
          class="inputClass"
        />
      </div>
      <div class="f-inp">
        <input
          type="password"
          placeholder="Password"
          v-model="account.password"
          class="inputClass"
        />
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'username'
const CACHE_PASSWORD = 'password'

// 1.定义account数据
const account = reactive<IAccount>({
  username: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

// 2.定义校验规则
const accountRules: FormRules = {
  // username: [
  //   { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
  //   {
  //     pattern: /^[a-z0-9]{1,20}$/,
  //     message: '必须是6~20数字或字母组成~',
  //     trigger: 'blur'
  //   }
  // ],
  // password: [
  //   { required: true, message: '必须输入密码信息~', trigger: 'blur' },
  //   {
  //     pattern: /^[a-z0-9]{3,}$/,
  //     message: '必须是3位以上数字或字母组成',
  //     trigger: 'blur'
  //   }
  // ]
}

// 3.执行帐号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的帐号和密码
      const username = account.username
      const password = account.password

      // 2.向服务器发送网络请求(携带账号和密码)
      loginStore.loginAccountAction({ username, password }).then(() => {
        // 3.判断是否需要记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, username)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('Oops, 请您输入正确的格式后再操作~~.')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.inputClass {
  padding: 13px 25px;
  border: 2px solid #6e6d6d;
  line-height: 1;
  border-radius: 20px;
  margin-bottom: 15px;
  width: 100%;
  font-size: 18px;
  box-shadow: 0px 15px 40px #ade3eb;
  // border: none;
}

.f-inp input::placeholder {
  color: #b9b9b9;
}
</style>
