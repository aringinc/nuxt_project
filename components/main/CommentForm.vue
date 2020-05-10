<template>
  <el-form
    ref="form"
    :model="controls"
    :rules="rules"
    @submit.native.prevent="onSubmit"
  >
    <h1>Add comment</h1>
    <el-form-item label="Your name" prop="name">
      <el-input v-model.trim="controls.name" />
    </el-form-item>
    <el-form-item label="Text" prop="text">
      <el-input
        type="textarea"
        v-model="controls.text"
        resize="none"
        :rows="3"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" round="" native-type="submit" :loading="loading"
        >Add comment
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      controls: {
        name: "",
        text: ""
      },
      rules: {
        name: [
          { required: true, message: "Name is required", trigger: "blur" }
        ],
        text: [
          { required: true, message: "Text can't be empty", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          const formData = {
            name: this.controls.name,
            text: this.controls.text,
            postId: ""
          };
          try {
            setTimeout(() => {
              this.$emit("created");
              this.$message.success("Comments was added.");
              this.loading = false;
            }, 2000);
          } catch (e) {
            error(e);
            this.loading = false;
          }
        } else {
          console.log("error submit");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
