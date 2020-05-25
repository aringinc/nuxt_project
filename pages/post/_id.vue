<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>{{ post.title }}</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time"></i>
          {{ post.date | date }}</small
        >
        <small>
          <i class="el-icon-view"></i>
          {{ post.views }}
        </small>
      </div>
    </header>
    <div class="post-image mb">
      <img :src="post.imageUrl" alt="post image" />
    </div>
    <main class="post-content">
      <vue-markdown>{{ post.text }}</vue-markdown>
    </main>
    <footer>
      <app-comment-form
        v-if="canAddComment"
        @created="createCommentHandler"
        :postId="post._id"
      />
      <div class="comment" v-if="post.comments.length">
        <app-comment
          v-for="comment in post.comments"
          :key="comment._id"
          :comment="comment"
        />
      </div>
      <div class="text-center" v-else>No comments</div>
    </footer>
  </article>
</template>

<script>
import AppComment from '@/components/main/Comment';
import AppCommentForm from '@/components/main/CommentForm';

export default {
  validate({ params }) {
    return Boolean(params.id);
  },
  head() {
    return {
      title: `${this.post.title} | ${process.env.appName}`,
    };
  },
  async asyncData({ store, params }) {
    const post = await store.dispatch('post/fetchById', params.id);
    await store.dispatch('post/addView', post);
    return {
      post: {
        ...post,
        views: post.views + 1,
      },
    };
  },
  data() {
    return {
      canAddComment: true,
    };
  },
  methods: {
    createCommentHandler(newComment) {
      this.post.comments.unshift(newComment);
      this.canAddComment = false;
    },
  },
  components: { AppComment, AppCommentForm },
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
