<script setup lang="ts">
const { t } = useI18n()
const { $firebaseService } = useNuxtApp()

const router = useRouter()

const authStore = useAuthStore()
const { user, isLoggedIn } = storeToRefs(authStore)

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

const validateInputs = () => {
  if (!email.value) {
    errorMessage.value = t('signInPage.error_required.email')
    return false
  }

  if (!password.value) {
    errorMessage.value = t('signInPage.error_required.password')
    return false
  }

  if (!validateEmail(email.value)) {
    errorMessage.value = t('signInPage.error_invalid.email')
    return false
  }

  errorMessage.value = ''
  return true
}

const signIn = async () => {
  if (!validateInputs()) {
    return
  }

  loading.value = true

  try {
    const userResponsive = await $firebaseService.auth.signIn(email.value, password.value)

    if (userResponsive) {
      user.value = userResponsive
      isLoggedIn.value = true
      router.push('/')
    }
    else {
      errorMessage.value = t('signInPage.error_invalid.credentials')
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="sign-in">
    <shared-header-content :title="t('signInPage.title')" />
    <el-form
      label-position="top"
      class="w-100 mx-auto border border-primary-600 p-5 rounded-lg"
      @submit.prevent="signIn"
    >
      <transition name="el-fade-in">
        <el-form-item v-show="errorMessage" class="text-error-600">
          {{ errorMessage }}
        </el-form-item>
      </transition>
      <el-form-item :label="t('signInPage.email')">
        <el-input v-model="email" :placeholder="t('signInPage.plhd_email')" />
      </el-form-item>
      <el-form-item :label="t('signInPage.password')">
        <el-input v-model="password" :placeholder="t('signInPage.plhd_password')" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" size="large" class="w-full mx-auto">
          <app-loading-spinner v-if="loading" :size="23" class="text-white mr-2" />
          <span v-else>
            {{ t('signInPage.btn_signIn') }}
          </span>
        </el-button>
      </el-form-item>
      <el-form-item>
        <router-link to="/signup" class="text-primary-900 underline underline-offset-3">
          {{ t('signInPage.link_signUp') }}
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/sass/base/variables.scss' as *;

.sign-in {
  @apply p-5 flex flex-col gap-5;

  form {
    box-shadow: $input-box-shadow;
  }
}
</style>
