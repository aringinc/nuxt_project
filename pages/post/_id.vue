<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>Post title</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time"></i>
          {{ new Date().toLocaleString() }}</small
        >
        <small>
          <i class="el-icon-view"></i>
          42
        </small>
      </div>
    </header>
    <div class="post-image">
      <img
        src="https://saveatrain-12e85.kxcdn.com/blog/wp-content/uploads/2019/11/4a.jpg"
        alt="post image"
      />
    </div>
    <main class="post-content">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore iure
        ullam pariatur quasi sit porro, dicta temporibus quas repellat deserunt
        quae. Esse ipsum alias odit. Accusantium possimus aspernatur recusandae
        odit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore iure
        ullam pariatur quasi sit porro, dicta temporibus quas repellat deserunt
        quae. Esse ipsum alias odit. Accusantium possimus aspernatur recusandae
        odit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore iure
        ullam pariatur quasi sit porro, dicta temporibus quas repellat deserunt
        quae. Esse ipsum alias odit. Accusantium possimus aspernatur recusandae
        odit.
      </p>
    </main>
    <footer>
      <app-comment-form v-if="canAddComment" @created="createCommentHandler" />
      <div class="comment" v-if="false">
        <app-comment v-for="comment in 4" :key="comment" :comment="comment" />
      </div>
      <div class="text-center" v-else>No comments</div>
    </footer>
  </article>
</template>

<script>
import AppComment from "@/components/main/Comment";
import AppCommentForm from "@/components/main/CommentForm";

export default {
  validate({ params }) {
    return Boolean(params.id);
  },
  data() {
    return {
      canAddComment: true
    };
  },
  methods: {
    createCommentHandler() {
      this.canAddComment = false;
    }
  },
  components: { AppComment, AppCommentForm }
};
</script>

<style lang="scss" scoped>
.post {
  max-width: 600px;
  margin: 0 auto;
}
.post-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: center;
}
.post-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  align-items: center;
}
.post-image img {
  width: 100%;
  height: auto;
}
.post-header {
  margin-bottom: 1.5rem;
}
.post-content {
  margin-bottom: 2rem;
}
</style>
