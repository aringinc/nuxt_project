<template>
  <div class="page-wrap">
    <el-form
      ref="form"
      :model="controls"
      :rules="rules"
      @submit.native.prevent="onSubmit"
    >
      <h2 class="mb">Post creating</h2>
      <el-form-item label="Title" prop="title">
        <el-input v-model="controls.title" />
      </el-form-item>
      <el-form-item label="Text (also .md or .html)" prop="text">
        <el-input
          type="textarea"
          v-model="controls.text"
          resize="none"
          :rows="10"
        />
      </el-form-item>

      <el-button class="mb" type="success" plain @click="previewDialog = true"
        >Preview
      </el-button>

      <el-dialog title="Preview" :visible.sync="previewDialog">
        <div :key="controls.text">
          <vue-markdown>{{ controls.text }}</vue-markdown>
        </div>
      </el-dialog>

      <el-upload
        class="mb"
        drag
        ref="upload"
        :auto-upload="false"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="imageChangeHandle"
        :on-remove="imageRemoveHandle"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          jpg/png files with a size less than 500kb
        </div>
      </el-upload>

      <el-form-item>
        <el-button type="primary" round native-type="submit" :loading="loading"
          >Create
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  head: { title: `New post | ${process.env.appName}` },
  data() {
    return {
      image: '',
      previewDialog: false,
      loading: false,
      controls: {
        title: '',
        text: '',
      },
      rules: {
        title: [
          { required: true, message: 'Title is required', trigger: 'blur' },
        ],
        text: [
          { required: true, message: 'Text is required', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid && this.image) {
          this.loading = true;
          const formData = {
            title: this.controls.title,
            text: this.controls.text,
            image: this.image,
          };
          try {
            await this.$store.dispatch('post/create', formData);
            this.controls.text = '';
            this.controls.title = '';
            this.image = '';
            this.$refs.upload.clearFiles();
            this.$message.success('Post was created.');
          } catch (e) {
            console.log(e);
          } finally {
            this.loading = false;
          }
        } else {
          this.$message.warning('Form is not valid.');
        }
      });
    },
    imageChangeHandle(file, fileList) {
      this.image = file.raw;
    },
    imageRemoveHandle(file, fileList) {
      this.image = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.page-wrap {
  max-width: 600px;
}
</style>
