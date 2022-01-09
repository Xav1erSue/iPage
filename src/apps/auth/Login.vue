<script lang="ts" setup>
import {computed, onMounted, reactive} from "vue";
import router from "@/router";
import {login, logOut, validate} from "@/api/auth";
import {useStore} from "vuex";
import {key} from "@/store";

const store = useStore(key)
const form = reactive({
  name: '',
  password: '',
})
const rules = {
  name: [{
    required: true,
    message: '用户名不能为空！'
  }],
  pwd: [{
    required: true,
    message: '密码不能为空！'
  }]
}

const loadingStatus = computed(() => store.state.loadingStatus);
const isLoggedIn = computed(() => store.state.isLoggedIn);

const handleSubmit = async ({errors}: any) => {
  if (!errors) {
    await login(form);
  }
}
onMounted(() => {
  validate(false);
})
</script>

<template>
  <div class="right">
    <div class="wrapper">
      <a-page-header id="header" title="登录" @back="router.back()">
        <template #subtitle>
          <span>没有账号？立即</span>
          <a-link href="/register">注册</a-link>
        </template>
      </a-page-header>
      <a-divider class="mt-0 mb-30px"/>
      <!-- 加载时显示 -->
      <a-spin :loading="loadingStatus===1" class="block" tip="正在处理……">
        <!-- 登录前显示 -->
        <a-form v-show="!isLoggedIn" ref="formRef" :model="form" :size="'large'" @submit="handleSubmit">
          <a-form-item
              :rules="rules.name"
              field="name"
              label="用户名"
          >
            <a-input v-model="form.name" placeholder="请输入用户名/手机号/邮箱"/>
          </a-form-item>
          <a-form-item
              :rules="rules.pwd"
              field="password"
              label="密码"
          >
            <a-input-password v-model="form.password" allow-clear placeholder="请输入密码"
            />
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" type="primary">登录</a-button>
            <a-typography-text class="ml-20px" type="secondary">
              忘记密码?
            </a-typography-text>
            <a-link href="/reset">立即找回</a-link>
          </a-form-item>
        </a-form>
      </a-spin>
      <!-- 登录完毕显示 -->
      <a-result v-show="isLoggedIn && loadingStatus===2" status="success" title="登录成功！">
        <template #subtitle>
          正在为您跳转到主页...
        </template>
        <template #extra>
          <a-space>
            <a-button type='primary' @click="router.push({name:'Home'})">进入主页</a-button>
          </a-space>
        </template>
      </a-result>
      <!-- 已登录时显示 -->
      <a-result v-show="isLoggedIn && loadingStatus===0" status="success" title="您已登录！">
        <template #subtitle>
          您已登录，无需重复登录！
        </template>
        <template #extra>
          <a-space>
            <a-button type='primary' @click="logOut">退出登录</a-button>
          </a-space>
        </template>
      </a-result>
    </div>
  </div>
  <div class="left">
    <img alt="爱丽丝" src="@/assets/imgs/main.jpg">
  </div>
</template>

<style lang="scss" scoped>
.right {
  @apply "";
  // @media (min-width: 768px)
  @apply "md:()";
  // @media (min-width: 1024px)
  @apply "lg:(absolute h-full w-1/2 left-1/2 transform )";
  .wrapper {
    @apply "w-500px ml-50px p-50px absolute top-1/2 transform -translate-y-1/2 shadow-lg z-999 rounded"
  }
}

.left {
  @apply "hidden";
  // @media (min-width: 768px)
  @apply "md:(hidden)";
  // @media (min-width: 1024px)
  @apply "lg:(block overflow-hidden absolute right-1/2 h-full -z-999)";
  img {
    @apply "lg:(max-w-none h-full)";
  }
}
</style>
