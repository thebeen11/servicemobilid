<template>
  <div class="w-full flex justify-center py-28">
    <div
      class="w-full px-10 md:px-0 md:w-80 flex flex-col space-y-6 justify-center"
    >
      <p class="font-semibold text-center">
        Masuk <span class="font-bold">ServiceMobil.id</span>
      </p>

      <div class="w-full flex flex-col space-y-4">
        <input
          
          ref="email"
          type="email"
          name="email"
          class="py-2 px-4 rounded-xl font-semibold border-main-red border-2"
          placeholder="Email"
          v-model="data.email"
        />

        <input
          ref="password"
          type="password"
          name="password"
          class="py-2 px-4 rounded-xl font-semibold border-main-red border-2"
          placeholder="Password"
          v-model="data.password"
        />
      </div>
      <button
        @click="signIn()"
        class="py-2 px-4 rounded-xl font-semibold bg-main-red text-white hover:bg-main-gold flex justify-center"
      >
        Sign In
      </button>
      <NuxtLink to="/resetpassword">
        <p class="text-main-red hover:text-main-gold text-center cursor-pointer">
        Reset Password
      </p>
      </NuxtLink>
    </div>
   
  </div>
</template>

<script setup lang="ts">
import { onStartTyping } from "@vueuse/core";

definePageMeta({
  layout: false,
});

const email = ref<HTMLInputElement | null>(null);

const data = reactive({
  email: "",
  password: "",
  reset: false,
});

onStartTyping(() => {
  if (email.value) {
    email.value.focus();
  }
});

const router = useRouter();

const signIn = async () => {
  try {
    await signInUser(data.email, data.password);
  router.push({ path: "/admin" });
  } catch (error: any) {
    console.log(error);
  }
};
</script>
