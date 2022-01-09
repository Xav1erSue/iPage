<script lang="ts" setup>
import {computed, onMounted, reactive} from "vue";
import * as Rules from "@/utils/rules";
import router from "@/router";
import {Message} from "@arco-design/web-vue";
import {logOut, register, validate} from "@/api/auth";
import {useStore} from "vuex";
import {key} from "@/store";

const store = useStore(key)
const form = reactive({
  name: '',
  password: '',
  phoneNumber: '',
  code: '',
  email: '',
  isRead: false
})

const loadingStatus = computed(() => store.state.loadingStatus);
const isLoggedIn = computed(() => store.state.isLoggedIn);

const handleSubmit = async ({errors}: any) => {
  if (!errors && form.isRead) {
    await register(form);
  } else if (!errors && !form.isRead) {
    Message.error('您必须同意隐私条例才能注册！')
  }
}

onMounted(() => {
  validate(false);
})

</script>

<template>
  <div class="bg"/>
  <div class="container">
    <a-page-header subtitle="点击左侧按钮返回" title="注册" @back="router.back()"/>
    <a-divider class="mt-0 mb-30px"/>
    <!-- 加载时显示 -->
    <a-spin :loading="loadingStatus===1" tip="正在处理……">
      <!-- 注册前显示 -->
      <a-form v-if="!isLoggedIn && loadingStatus!==2" ref="formRef" :model="form" :size="'large'"
              @submit="handleSubmit">
        <a-form-item
            :rules="Rules.nameRule"
            :validate-trigger="['blur']"
            field="name"
            label="用户名"
        >
          <a-input v-model="form.name" placeholder="请输入用户名"/>
        </a-form-item>
        <a-form-item
            :rules="Rules.pwdRule"
            :validate-trigger="['change','input']"
            field="password"
            label="密码"
        >
          <a-input-password v-model="form.password" allow-clear placeholder="请输入密码"/>
        </a-form-item>
        <a-form-item
            :rules="Rules.phoneNumRule"
            :validate-trigger="['change','input']"
            field="phoneNumber"
            label="手机号"
        >
          <a-input v-model="form.phoneNumber" class="mr-20px" placeholder="请输入手机号"/>
          <a-button type="primary">获取验证码</a-button>
        </a-form-item>
        <a-form-item
            :rules="Rules.codeRule"
            :validate-trigger="['change','input']"
            field="code"
            label="验证码"
        >
          <a-input v-model="form.code" placeholder="请输入6位手机验证码"/>
        </a-form-item>
        <a-form-item
            :rules="Rules.emailRule"
            :validate-trigger="['blur']"
            field="email"
            label="邮箱"
        >
          <a-input v-model="form.email" placeholder="请输入邮箱地址"/>
        </a-form-item>
        <a-form-item :required="true" field="isRead">
          <a-checkbox v-model="form.isRead">
            我已阅读并同意
            <a-link href="/login">免责声明</a-link>
            中的所有条款
          </a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" type="primary">注册</a-button>
          <a-typography-text class="ml-20px" type="secondary">
            已有账号？
          </a-typography-text>
          <a-link href="/login">立即登录</a-link>
        </a-form-item>
      </a-form>
    </a-spin>
    <!-- 注册完毕显示 -->
    <a-result v-if="loadingStatus===2" status="success" title="注册成功！">
      <template #subtitle>
        欢迎您，{{ store.state.userName }}！正在为您自动进入主页
      </template>
      <template #extra>
        <a-space>
          <a-button type='primary' @click="router.push({name:'Home'})">进入主页</a-button>
        </a-space>
      </template>
    </a-result>
    <!-- 已登录时显示 -->
    <a-result v-if="isLoggedIn" status="success" title="您已登录！">
      <template #subtitle>
        请先退出账号，然后重新注册！
      </template>
      <template #extra>
        <a-space>
          <a-button type='primary' @click="logOut">退出登录</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  @apply "absolute w-full h-full";
  background-color: #f5ce62;
  background-image: radial-gradient(closest-side, rgba(#03a9f4, 1), rgba(#03a9f4, 0)),
  radial-gradient(closest-side, rgba(243, 11, 164, 1), rgba(243, 11, 164, 0)),
  radial-gradient(closest-side, rgba(254, 234, 131, 1), rgba(254, 234, 131, 0)),
  radial-gradient(closest-side, rgba(170, 142, 245, 1), rgba(170, 142, 245, 0)),
  radial-gradient(closest-side, rgba(248, 192, 147, 1), rgba(248, 192, 147, 0));
  background-size: 130vmax 130vmax,
  80vmax 80vmax,
  90vmax 90vmax,
  110vmax 110vmax,
  90vmax 90vmax;
  background-position: -80vmax -80vmax,
  60vmax -30vmax,
  10vmax 10vmax,
  -30vmax -10vmax,
  50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 10s movement linear infinite;
}

.container {
  @apply "bg-white w-600px p-50px absolute left-1/2 top-1/2 text-center shadow-xl rounded";
  transform: translate(-50%, -50%);
}

.shown {
  display: none;
}

@keyframes movement {
  0%, 100% {
    background-size: 130vmax 130vmax,
    80vmax 80vmax,
    90vmax 90vmax,
    110vmax 110vmax,
    90vmax 90vmax;
    background-position: -80vmax -80vmax,
    60vmax -30vmax,
    10vmax 10vmax,
    -30vmax -10vmax,
    50vmax 50vmax;
  }
  25% {
    background-size: 100vmax 100vmax,
    90vmax 90vmax,
    100vmax 100vmax,
    90vmax 90vmax,
    60vmax 60vmax;
    background-position: -60vmax -90vmax,
    50vmax -40vmax,
    0vmax -20vmax,
    -40vmax -20vmax,
    40vmax 60vmax;
  }
  50% {
    background-size: 80vmax 80vmax,
    110vmax 110vmax,
    80vmax 80vmax,
    60vmax 60vmax,
    80vmax 80vmax;
    background-position: -50vmax -70vmax,
    40vmax -30vmax,
    10vmax 0vmax,
    20vmax 10vmax,
    30vmax 70vmax;
  }
  75% {
    background-size: 90vmax 90vmax,
    90vmax 90vmax,
    100vmax 100vmax,
    90vmax 90vmax,
    70vmax 70vmax;
    background-position: -50vmax -40vmax,
    50vmax -30vmax,
    20vmax 0vmax,
    -10vmax 10vmax,
    40vmax 60vmax;
  }
}
</style>
