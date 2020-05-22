<template>
  <div class="page-wrap">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/list">Posts</el-breadcrumb-item>
      <el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      ref="form"
      :model="controls"
      :rules="rules"
      @submit.native.prevent="onSubmit"
    >
      <h2>Post editing</h2>
      <el-form-item label="Text (also .md or .html)" prop="text">
        <el-input
          type="textarea"
          v-model="controls.text"
          resize="none"
          :rows="10"
        />
      </el-form-item>

      <div class="mb">
        <small class="mr">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">
            {{ new Date(post.date).toLocaleString() }}
          </span>
        </small>
        <small>
          <i class="el-icon-view"></i>
          <span style="margin-left: 10px">{{ post.views }}</span>
        </small>
      </div>

      <el-form-item>
        <el-button
          type="primary"
          round=""
          native-type="submit"
          :loading="loading"
          >Save
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middeware: ["admin-auth"],
  head() {
    return {
      title: `Post | ${this.post.title}`
    };
  },
  validate({ params }) {
    return Boolean(params.id);
  },
  async asyncData({ store, params }) {
    const post = await store.dispatch("post/fetchAdminById", params.id);
    return { post };
  },
  data() {
    return {
      loading: false,
      controls: {
        text: ""
      },
      rules: {
        text: [{ required: true, message: "Text is required", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;
          const formData = {
            text: this.controls.text,
            id: this.post._id
          };
          try {
            await this.$store.dispatch("post/update", formData);
            this.$message.success("Post was updated.");
          } catch (e) {
            console.log(e);
          } finally {
            this.loading = false;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-wrap {
  max-width: 600px;
}
.mr {
  margin-right: 2rem;
}
</style>
