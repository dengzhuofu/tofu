<template>
  <div class="shell">
    <div id="img-box">
      <img src="../../../base-ui/bg.png" alt="" />
    </div>
    <form action="" method="post">
      <div id="form-body">
        <div id="welcome-lines">
          <div id="w-line-1">HI,GOAT</div>
          <div id="w-line-2">Welcome Back</div>
        </div>
        <div id="input-area">
          <pane-account ref="accountRef" />
        </div>
        <div id="submit-button-cvr">
          <el-button
            @click="handleLoginBtnClick"
            id="submit-button"
            size="large"
            >LOGIN</el-button
          >
        </div>
        <div id="forgot-pass">
          <a href="#">Forgot password?</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'

const activeName = ref('account')
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})
const accountRef = ref<InstanceType<typeof PaneAccount>>()

function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('用户在进行手机登录')
  }
}
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  outline: none;
}

.shell,
form {
  position: relative;
}

.shell {
  display: flex;
  justify-content: center;
}

form {
  width: 562px;
  height: 520px;
  background-color: #fff;
  box-shadow: 0px 15px 40px #8fe7f3;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#img-box {
  width: 330px;
  height: 520px;
}

#img-box img {
  height: 100%;
}

#form-body {
  width: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#welcome-lines {
  width: 100%;
  text-align: center;
  line-height: 1;
}

#w-line-1 {
  color: #7f7f7f;
  font-size: 50px;
}

#w-line-2 {
  color: #9c9c9c;
  font-size: 30px;
  margin-top: 17px;
}

#input-area {
  width: 100%;
  margin-top: 40px;
}

#submit-button-cvr {
  margin-top: 20px;
}

#submit-button {
  display: block;
  width: 100%;
  color: #fff;
  font-size: 14px;
  margin: 0;
  padding: 14px 40px;
  border: 0;
  // background-color: #50f0f5;
  background: linear-gradient(45deg, #50f0f5, #06eeb4, #06ec79);

  border-radius: 25px;
  line-height: 1;
  cursor: pointer;
}

#forgot-pass {
  text-align: center;
  margin-top: 10px;
}

#forgot-pass a {
  color: #868686;
  font-size: 12px;
  text-decoration: none;
}
</style>
