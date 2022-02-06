<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import typer from "@/utils/typer";
import router from "@/router";
import { validate } from "@/api/auth";
import { useStore } from "vuex";
import { key } from "@/store";

const store = useStore(key);
let welcome = ref("");

const isLoggedIn = computed(() => store.state.isLoggedIn);
const userName = computed(() => store.state.userName);

onMounted(() => {
  validate(false);
  // 打字效果
  typer(welcome);
  // 5秒后挂载点击监听
  setTimeout(() => {
    document.getElementById("start")!.addEventListener("click", () => {
      router.push({ name: "Home" });
    });
  }, 5000);
});
</script>

<template>
  <div class="flex justify-between items-center">
    <a
      class="btn m-20px hover:(mb-17px pb-3px border-solid border-black border-b-2)"
      href="https://blog.xav1er.com/"
      >Blog</a
    >
    <div v-if="!isLoggedIn" class="my-10px mx-20px flex w-auto items-center">
      <router-link class="btn login" to="./login">Sign in</router-link>
      <router-link class="btn" to="./register">Sign up</router-link>
    </div>
    <div v-if="isLoggedIn" class="my-10px mx-20px flex w-auto items-center">
      <router-link class="btn" to="./me"
        >欢迎您，<span>{{ userName }}</span>
      </router-link>
    </div>
  </div>
  <div id="main">
    <div class="whitespace-nowrap mb-20px text-40px">
      {{ welcome }}<span id="typer">_</span>
    </div>
    <hr />
    <div id="start">click to start</div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  @apply "mr-10px px-10px py-5px text-black border-solid border-black border-1 rounded-5px z-999";
  @apply "hover:(text-[#00000099] border-[#00000099] border-solid border-1 cursor-pointer)";
}

.btn {
  @apply "no-underline text-[#00000099] px-10px py-5px z-999";
  @apply "hover:(text-black cursor-pointer)";
}

#main {
  @apply "w-400px h-102px absolute left-1/2 top-1/2 text-center flex flex-col justify-center items-center";
  transform: translate(-50%, -50%);
}

#typer {
  @apply "opacity-0";
  animation: typerBlink 0.7s ease-in-out 1s infinite;
}

#start {
  @apply "text-20px mt-20px opacity-0";
  @apply "cursor-pointer";
  animation: blink 5s ease-in-out 5s infinite;
}

hr {
  @apply "p-0 m-auto";
  animation: stretchLine 1s ease-in-out forwards;
}

@keyframes stretchLine {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  25%,
  75% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

@keyframes typerBlink {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
