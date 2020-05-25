<template>
  <el-card shadow="always" :style="{ width: '500px' }">
    <el-form
      ref="form"
      :model="controls"
      :rules="rules"
      @submit.native.prevent="onSubmit"
    >
      <h2>Admin validation</h2>
      <el-form-item label="Login" prop="login">
        <el-input v-model.trim="controls.login" />
      </el-form-item>
      <div class="mb2">
        <el-form-item label="Password" prop="password">
          <el-input v-model="controls.password" type="password" />
        </el-form-item>
      </div>

      <el-form-item>
        <el-button
          type="primary"
          round=""
          native-type="submit"
          :loading="loading"
          >Login
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  layout: 'empty',
  head: { title: `Log in as administrator | ${process.env.appName}` },
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
  mounted() {
    const { message } = this.$route.query;
    switch (message) {
      case 'login':
        this.$message.info('Please log in.');
        break;
      case 'logout':
        this.$message.success('You have successfully logged out.');
        break;
      case 'session':
        this.$message.warning('Session timeout, please log in.');
        break;
      default:
        break;
    }
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
            await this.$store.dispatch('auth/login', formData);
            this.controls.login = '';
            this.controls.password = '';
            this.$router.push('/admin');
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
