<script setup lang="ts">
const { t } = useI18n()
const { $firebaseService } = useNuxtApp()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const loading = ref(false)

const validateInputs = () => {
  if (!email.value) {
    errorMessage.value = t('signUpPage.error_required.email')
    return false
  }

  if (!password.value) {
    errorMessage.value = t('signUpPage.error_required.password')
    return false
  }

  if (!confirmPassword.value) {
    errorMessage.value = t('signUpPage.error_required.confirm')
    return false
  }

  if (!validateEmail(email.value)) {
    errorMessage.value = t('signUpPage.error_invalid.email')
    return false
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = t('signUpPage.error_invalid.confirm')
    return false
  }

  errorMessage.value = ''
  return true
}

const signUp = async () => {
  if (!validateInputs()) {
    return
  }

  loading.value = true

  try {
    const userResponsive = await $firebaseService.auth.signUp(email.value, password.value)
    console.log(userResponsive)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="sign-up">
    <shared-header-content :title="t('signUpPage.title')" />
    <el-form
      label-position="top"
      class="w-100 mx-auto border border-primary-600 p-5 rounded-lg"
      @submit.prevent="signUp"
    >
      <transition name="el-fade-in">
        <el-form-item v-show="errorMessage" class="text-error-600">
          {{ errorMessage }}
        </el-form-item>
      </transition>
      <el-form-item :label="t('signUpPage.email')">
        <el-input v-model="email" :placeholder="t('signUpPage.plhd_email')" />
      </el-form-item>
      <el-form-item :label="t('signUpPage.password')">
        <el-input v-model="password" :placeholder="t('signUpPage.plhd_password')" type="password" />
      </el-form-item>
      <el-form-item :label="t('signUpPage.confirm')">
        <el-input v-model="confirmPassword" :placeholder="t('signUpPage.plhd_confirm')" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" size="large" class="w-full mx-auto">
          <app-loading-spinner v-if="loading" :size="23" class="text-white mr-2" />
          <span v-else>
            {{ t('signUpPage.btn_signUp') }}
          </span>
        </el-button>
      </el-form-item>
      <el-form-item>
        <router-link to="/sign" class="text-primary-900 underline underline-offset-3">
          {{ t('signUpPage.link_signIn') }}
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/sass/base/variables.scss' as *;

.sign-up {
  @apply p-5 flex flex-col gap-5;

  form {
    box-shadow: $input-box-shadow;
  }
}
</style>
