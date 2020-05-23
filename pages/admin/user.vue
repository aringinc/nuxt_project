<template>
  <el-form
    ref="form"
    :model="controls"
    :rules="rules"
    @submit.native.prevent="onSubmit"
  >
    <h2>Creating a user</h2>
    <el-form-item label="Login" prop="login">
      <el-input v-model.trim="controls.login" />
    </el-form-item>
    <div class="mb2">
      <el-form-item label="Password" prop="password">
        <el-input v-model="controls.password" type="password" />
      </el-form-item>
    </div>

    <el-form-item>
      <el-button type="primary" round="" native-type="submit" :loading="loading"
        >Create
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  data() {
    return {
      loading: false,
      controls: {
        login: '',
        password: '',
      },
      rules: {
        login: [
          { required: true, message: 'Login is required', trigger: 'blur' },
        ],
        password: [
          {
            required: true,
            message: "Password can't be empty",
            trigger: 'blur',
          },
          {
            min: 6,
            message: 'The password must be more than 6 symbols',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const formData = {
              login: this.controls.login,
              password: this.controls.password,
            };
            await this.$store.dispatch('auth/createUser', formData);
            this.controls.login = '';
            this.controls.password = '';
            this.$message.success('The user was created.');
          } catch (e) {
            console.error(e);
          } finally {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  max-width: 500px;
}
</style>
